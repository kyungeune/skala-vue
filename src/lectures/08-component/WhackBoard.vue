<template>
  <section class="board">
    <header class="board-head">
      <h2>보드</h2>
      <div class="badge">
        <span>칸 수: {{ totalCells }}</span>
        <span v-if="phase !== 'playing'" class="muted">({{ phase }})</span>
      </div>
    </header>

    <div class="grid" :style="gridStyle">
      <MoleCell v-for="cell in cells" :key="cell.index" :index="cell.index"
        :is-active="cell.index === activeIndex && phase === 'playing'" :disabled="phase !== 'playing'"
        @click-cell="handleClickCell" />
    </div>

    <footer class="board-foot">
      <p class="hint">
        ✅ 활성 칸을 누르면 <b>정답</b>입니다. (정답 여부 판정은 부모가 할 수도 있어요)
      </p>
    </footer>
  </section>
</template>

<script setup>
/**
 * WhackBoard.vue = 보드(중간 컴포넌트)
 * - 부모(MoleApp)에게서 게임 상태를 props로 받음
 * - MoleCell(칸)들을 gridSize^2만큼 만들어 뿌림
 * - 사용자가 어떤 칸을 클릭했는지 받아서
 *   정답 여부(isCorrect)를 판단하고 부모로 emit('hit', payload) 올림
 */
import { computed } from "vue";
import MoleCell from "./MoleCell.vue";

/** 부모(MoleApp)에서 내려주는 값들 */
const props = defineProps({
  gridSize: { type: Number, required: true },    // 3/4/5
  activeIndex: { type: Number, required: true }, // 현재 두더지 칸 인덱스
  phase: { type: String, required: true },       // idle/playing/paused/ended
  timeLeft: { type: Number, required: true },    // (표시용) 남은 시간
  score: { type: Number, required: true },       // (표시용) 점수
});

/** 부모(MoleApp)로 올릴 이벤트 */
const emit = defineEmits(["hit"]);

/** 총 칸 수 = gridSize^2 */
const totalCells = computed(() => props.gridSize * props.gridSize);

/**
 * v-for로 반복 렌더링할 칸 배열 생성
 * 예: totalCells=9면 [{index:0}, {index:1}, ... {index:8}]
 */
const cells = computed(() =>
  Array.from({ length: totalCells.value }, (_, i) => ({ index: i }))
);

/** gridSize에 맞게 CSS grid의 column 수를 동적으로 조절 */
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.gridSize}, 1fr)`,
}));

/**
 * MoleCell에서 click-cell(index) 이벤트가 올라오면 실행
 * 여기서 "정답 여부"를 판단한 뒤,
 * 부모에게 hit 이벤트로 payload를 올림
 */
function handleClickCell(index) {
  // UI는 여기까지. 로직은 부모에서 점수 처리.
  const isCorrect = index === props.activeIndex;

  // 부모로 올림: index, isCorrect, 클릭 시각(로그/디버깅용)
  emit("hit", {
    index,
    isCorrect,
    at: Date.now(),
  });
}
</script>

<style scoped>
.board {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
}

.board-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.badge {
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: #333;
}

.muted {
  color: #888;
}

.grid {
  display: grid;
  gap: 10px;
}

.board-foot {
  margin-top: 10px;
}

.hint {
  font-size: 13px;
  color: #666;
  margin: 0;
}
</style>
