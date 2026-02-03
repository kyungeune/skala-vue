<template>
  <div class="card">
    <h2 class="title">홍길동의 BMI 상태</h2>

    <p>현재 체중: <b>{{ weight }}</b>kg</p>
    <p>현재 키: <b>{{ height }}</b>cm</p>
    <p>
      BMI: <b>{{ bmi }}</b>
      <span>({{ bmiStatus }})</span>
    </p>

    <!--  자식 컴포넌트 2개 구현 + props 전달 -->
    <HongsDietHabit :title="foodTitle" :items="foodItems" @change-weight="changeWeight" />

    <HongsDietHabit :title="exerciseTitle" :items="exerciseItems" @change-weight="changeWeight" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import HongsDietHabit from "./HongsDietHabit.vue";

/** 초기 설정 */
const height = 170;       // cm
const weight = ref(60);   // kg (반응형)

/**  부모 → 자식으로 전달할 데이터(타이틀/버튼목록/증감량) */
const foodTitle = "🍔 음식 먹기";
const foodItems = [
  { label: "햄버거 (+1kg)", delta: 1 },
  { label: "피자 (+2kg)", delta: 2 },
];

const exerciseTitle = "🏃‍♂️ 운동하기";
const exerciseItems = [
  { label: "걷기 (-1kg)", delta: -1 },
  { label: "달리기 (-2kg)", delta: -2 },
];

/**
 * BMI 계산
 * BMI = 체중(kg) / (키(m)^2)
 */
const bmi = computed(() => {
  const h = height / 100;
  return (weight.value / (h * h)).toFixed(1);
});

/**
 * BMI 상태 분류 (한국에서 흔히 쓰는 기준 예시)
 */
const bmiStatus = computed(() => {
  const v = Number(bmi.value);
  if (v < 18.5) return "저체중";
  if (v < 23) return "정상";
  if (v < 25) return "과체중";
  if (v < 30) return "비만";
  return "고도비만";
});

/**
 * 자식에서 전달받은 delta 값으로 체중 변경
 */
function changeWeight(delta) {
  weight.value = Math.max(0, weight.value + delta);
}
</script>

<style scoped>
.card {
  width: 380px;
  border: 2px solid #222;
  padding: 18px;
  background: white;
}

.title {
  font-size: 28px;
  margin: 0 0 14px;
}
</style>
