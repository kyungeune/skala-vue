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
import { ref, computed } from "vue";
import HongsDietHabit from "./HongsDietHabit.vue";

const height = 170;
const weight = ref(60);

const bmi = computed(() => {
  const h = height / 100;
  return (weight.value / (h * h)).toFixed(1); // 20.8 형태
});

// (예시) 한국에서 자주 쓰는 구간
const bmiStatus = computed(() => {
  const v = Number(bmi.value);
  if (v < 18.5) return "저체중";
  if (v < 23) return "정상";
  if (v < 25) return "과체중";
  if (v < 30) return "비만";
  return "고도비만";
});

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
