<template>
  <div class="parent">
    <h2>연흥부네 자식들</h2>

    <section class="children">
      <HongsChild v-for="child in children" :key="child.name" :name="child.name" :assets="child.assets"
        @money="takeMoney" />
    </section>

    <section class="result">
      <h3>자녀가 보내준 용돈 합계 : {{ totalAllowance.toLocaleString() }}원</h3>
      <h4>받은 내역</h4>
      <ul>
        <li v-for="(item, idx) in logs" :key="idx">
          {{ item.from }} → {{ item.amount.toLocaleString() }}원
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import HongsChild from "./HongsChild.vue";

// 자식 10명 데이터
const children = [
  { name: "첫째", assets: ["이불", "양말"] },
  { name: "둘째", assets: ["책", "연필"] },
  { name: "셋째", assets: ["자전거"] },
  { name: "넷째", assets: ["장난감"] },
  { name: "다섯째", assets: ["공"] },
  { name: "여섯째", assets: ["가방"] },
  { name: "일곱째", assets: ["신발"] },
  { name: "여덟째", assets: ["모자"] },
  { name: "아홉째", assets: ["시계"] },
  { name: "열째", assets: ["노트북"] },
];

const assets = {
  forSon: ["칼", "창"],
  forDaughter: ["기와집", "전답"],
};

const logs = ref([]); // { from: string, amount: number }[]

function takeMoney(from, amount) {
  logs.value.push({ from, amount }); // { from: from, amount: amount }와 동일
}

const totalAllowance = computed(() =>
  logs.value.reduce((sum, x) => sum + x.amount, 0)
);
</script>

<style scoped>
.parent {
  padding: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  max-width: 720px;
}

.assets,
.children,
.result {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.children>*+* {
  margin-top: 12px;
}
</style>