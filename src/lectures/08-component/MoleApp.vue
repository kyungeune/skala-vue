<template>
  <main class="app">
    <header class="header">
      <h1>🐹 두더지 잡기 (UI 제공 / 로직 실습)</h1>
      <p class="sub">props + emit 흐름을 연습해보세요.</p>
    </header>

    <section class="panel">
      <div class="stats">
        <div class="stat">
          <span class="label">상태</span>
          <span class="value">{{ phase }}</span>
        </div>
        <div class="stat">
          <span class="label">점수</span>
          <span class="value">{{ score }}</span>
        </div>
        <div class="stat">
          <span class="label">남은 시간</span>
          <span class="value">{{ timeLeft }}s</span>
        </div>
        <div class="stat">
          <span class="label">라운드</span>
          <span class="value">{{ round }}</span>
        </div>
      </div>

      <div class="controls">
        <button class="btn primary" :disabled="phase === 'playing'" @click="onStart">
          시작
        </button>
        <button class="btn" :disabled="phase !== 'playing'" @click="onStop">
          일시정지
        </button>
        <button class="btn danger" @click="onReset">
          리셋
        </button>

        <div class="settings">
          <label class="field">
            <span>보드 크기</span>
            <select v-model.number="gridSize" :disabled="phase === 'playing'">
              <option :value="3">3 x 3</option>
              <option :value="4">4 x 4</option>
              <option :value="5">5 x 5</option>
            </select>
          </label>

          <label class="field">
            <span>게임 시간(초)</span>
            <input v-model.number="duration" type="number" min="5" max="120" step="1" :disabled="phase === 'playing'" />
          </label>

          <label class="field">
            <span>이동 간격(ms)</span>
            <input v-model.number="moveInterval" type="number" min="200" max="2000" step="50"
              :disabled="phase === 'playing'" />
          </label>
        </div>
      </div>

      <div class="tips">
        <strong>실습 과제</strong>
        <ul>
          <li>타이머(setInterval)로 <code>timeLeft</code> 감소 + 0이면 게임 종료</li>
          <li>두더지 위치를 무작위로 이동시키는 로직 구현</li>
          <li>칸 클릭 시 정답이면 점수 증가, 오답이면 감점(선택)</li>
          <li>일시정지/재시작 시 interval 정리(clearInterval) 처리</li>
        </ul>
      </div>
    </section>

    <section class="board-wrap">
      <WhackBoard :grid-size="gridSize" :active-index="activeIndex" :phase="phase" :time-left="timeLeft" :score="score"
        @hit="onHit" />
    </section>
  </main>
</template>

<script setup>
/**
 * MoleApp.vue = 부모(최상위)
 * - 게임의 "상태"를 전부 소유: phase, score, timeLeft, activeIndex...
 * - 두더지 이동 타이머, 카운트다운 타이머를 관리
 * - 보드에서 올라오는 hit 이벤트를 받아 점수 처리
 */
import { ref, watch, onBeforeUnmount } from "vue";
import WhackBoard from "./WhackBoard.vue";

/**
 * =========================
 * 상태(부모가 관리)
 * =========================
 */
const phase = ref("idle"); // 'idle' | 'playing' | 'paused' | 'ended'
const score = ref(0);
const round = ref(1);

const gridSize = ref(3);
const duration = ref(20); // seconds
const timeLeft = ref(duration.value);

/** setInterval id를 저장할 곳(멈출 때 clearInterval 하기 위함) */
const moveInterval = ref(600); // 두더지 이동 주기(ms)
const activeIndex = ref(-1); // 현재 두더지가 있는 칸(0~N-1), -1이면 숨김

/**
 * =========================
 * interval 핸들러 보관
 * =========================
 */
const moveTimerId = ref(null);      // 두더지 이동 타이머
const countdownTimerId = ref(null); // 1초 카운트다운 타이머

/** 현재 총 칸 수 = gridSize^2 */
function totalCells() {
  return gridSize.value * gridSize.value;
}

/**
 * 타이머(인터벌) 정리 함수
 * - playing/paused/ended 전환 시, 언마운트 시 등에서 재사용
 */
function clearTimers() {
  if (moveTimerId.value !== null) {
    clearInterval(moveTimerId.value);
    moveTimerId.value = null;
  }
  if (countdownTimerId.value !== null) {
    clearInterval(countdownTimerId.value);
    countdownTimerId.value = null;
  }
}

/**
 * 랜덤 칸 뽑기
 * - exclude를 주면 "바로 직전 칸"과 같은 칸이 뽑히지 않게 할 수 있음
 */
function getRandomIndex(exclude = -1) {
  const n = totalCells();
  if (n <= 1) return 0;

  let r = Math.floor(Math.random() * n);
  while (r === exclude) {
    r = Math.floor(Math.random() * n);
  }
  return r;
}

/** 두더지 이동 타이머 시작: moveInterval마다 activeIndex 변경 */
function startMoveTimer() {
  // moveInterval마다 두더지 위치 변경
  moveTimerId.value = setInterval(() => {
    activeIndex.value = getRandomIndex(activeIndex.value);
  }, moveInterval.value);
}

/** 카운트다운 타이머 시작: 1초마다 timeLeft 감소 */
function startCountdownTimer() {
  // 1초마다 timeLeft 감소
  countdownTimerId.value = setInterval(() => {
    timeLeft.value -= 1;
  }, 1000);
}

/**
 * 시작 버튼 동작
 * - idle/ended 상태에서 새 게임 시작
 * - paused 상태에서는 재개(resume)
 */
function onStart() {
  // 일시정지 상태에서 시작 누르면 "재개"
  if (phase.value === "paused") {
    phase.value = "playing";
    // 재개 시, 멈췄던 타이머들을 다시 시작
    clearTimers();
    startMoveTimer();
    startCountdownTimer();
    return;
  }

  // ended에서 다시 시작하면 라운드 증가(선택 사항)
  if (phase.value === "ended") {
    round.value += 1;
  }

  // idle 또는 ended에서 "새 게임 시작"
  phase.value = "playing";
  score.value = 0; // 시작 시 점수 초기화
  timeLeft.value = duration.value;

  //두더지를 즉시 한 번 랜덤 위치에 띄움
  activeIndex.value = getRandomIndex(-1);

  // 안전하게 기존 타이머를 지우고 새로 시작
  clearTimers();
  startMoveTimer();
  startCountdownTimer();
}

/** 일시정지 버튼: playing -> paused로 바꾸고 타이머 멈춤 */
function onStop() {
  // 일시정지
  phase.value = "paused";
  clearTimers();
}

/** 리셋 버튼: 모든 값을 초기 상태로 */
function onReset() {
  phase.value = "idle";
  clearTimers();

  score.value = 0;
  round.value = 1;
  timeLeft.value = duration.value;
  activeIndex.value = -1;
}

/**
 * 보드(자식)에서 칸 클릭 시 올라오는 이벤트
 * payload: { index: number, isCorrect: boolean, at: number }
 */
function onHit(payload) {
  // 게임 중이 아닐 때 클릭은 무시
  if (phase.value !== "playing") return;

  if (payload.isCorrect) {
    score.value += 1;

    // (선택) 맞추면 즉시 다른 위치로 이동시키기
    activeIndex.value = getRandomIndex(activeIndex.value);
  } else {
    // (선택) 오답 감점: 0 아래로 내려가지 않도록 처리
    score.value = Math.max(0, score.value - 1);
  }
}

/**
 * timeLeft가 0 이하가 되면 게임 종료(endGame) 실행
 * - watch는 "값이 바뀔 때마다" 실행됨
 */
watch(timeLeft, (v) => {
  if (phase.value === "playing" && v <= 0) {
    endGame();
  }
});

/** 게임 종료 처리 */
function endGame() {
  phase.value = "ended";
  clearTimers();
  activeIndex.value = -1; // 두더지 숨김
}

/** 컴포넌트가 사라질 때(화면에서 제거될 때) 타이머 정리 */
onBeforeUnmount(() => {
  clearTimers();
});
</script>

<style scoped>
/* (기존 스타일 그대로) */
.app {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR", sans-serif;
}

.header {
  margin-bottom: 14px;
}

.sub {
  margin: 6px 0 0;
  color: #666;
  font-size: 14px;
}

.panel {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.stat {
  padding: 10px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

.label {
  display: block;
  font-size: 12px;
  color: #777;
}

.value {
  display: block;
  font-size: 18px;
  font-weight: 800;
  margin-top: 4px;
}

.controls {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 14px;
  align-items: start;
}

.btn {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  margin-bottom: 8px;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.primary {
  border-color: #1f7ae0;
  background: #1f7ae0;
  color: #fff;
}

.danger {
  border-color: #e04b4b;
  background: #ffecec;
  color: #b40000;
}

.settings {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.field {
  display: grid;
  gap: 6px;
  font-size: 13px;
}

.field input,
.field select {
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.tips {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7fbff;
  border: 1px solid #dbeeff;
  font-size: 13px;
}

.board-wrap {
  margin-top: 14px;
}

code {
  background: #f2f2f2;
  padding: 2px 6px;
  border-radius: 8px;
}

@media (max-width: 860px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .controls {
    grid-template-columns: 1fr;
  }

  .settings {
    grid-template-columns: 1fr;
  }
}
</style>
