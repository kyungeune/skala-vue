<template>
  <div class="card">
    <h2 class="title">홍길동의 BMI 상태</h2>

    <p>현재 체중: <b>{{ weight }}</b>kg</p>
    <p>현재 키: <b>{{ height }}</b>cm</p>
    <p>
      BMI: <b>{{ bmi }}</b>
      <span>({{ bmiStatus }})</span>
    </p>

    <!-- 자식 컴포넌트: 이벤트 받기 -->
    <HongsDietHabit @change-weight="changeWeight" />
  </div>
</template>

<script setup>
// Vue의 반응형 API
import { ref, computed } from "vue";
// 자식 컴포넌트 import
import HongsDietHabit from "./HongsDietHabit.vue";

const height = 170;
const weight = ref(60);  // ref로 선언 (반응형)

/**
 * BMI 계산
 * BMI = 체중(kg) / (키(m) * 키(m))
 * computed를 사용하면 weight가 바뀔 때 자동 재계산됨
 */
const bmi = computed(() => {
  const h = height / 100;
  return (weight.value / (h * h)).toFixed(1); // 20.8 형태
});

/**
 * BMI 상태 분류
 * bmi 값이 바뀔 때마다 자동으로 다시 계산됨
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
 * 자식 컴포넌트에서 전달받은 delta 값으로 체중 변경
 * delta: +1, +2, -1, -2
 */
function changeWeight(delta) {
  // 체중은 0 아래로 내려가지 않게 안전장치
  weight.value = Math.max(0, weight.value + delta);
}
</script>

<style scoped>
.card {
  width: 360px;
  border: 2px solid #222;
  padding: 18px;
  background: white;
}

.title {
  font-size: 28px;
  margin: 0 0 14px;
}
</style>
