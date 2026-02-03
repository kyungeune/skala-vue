<template>
  <section class="section">
    <h3 class="h3">{{ title }}</h3>

    <div class="btns">
      <button v-for="(item, idx) in items" :key="idx" @click="emitChange(item.delta)">
        {{ item.label }}
      </button>
    </div>
  </section>
</template>

<script setup>
/**
 * 부모로부터 전달받는 값
 * - title: 섹션 제목(예: 🍔 음식 먹기, 🏃‍♂️ 운동하기)
 * - items: 버튼 목록 [{ label: '햄버거 (+1kg)', delta: 1 }, ...]
 */
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
    // items 내부 요소 형태를 명확히 하고 싶으면 아래처럼 validator도 가능
    // validator: (arr) => arr.every(v => typeof v.label === 'string' && typeof v.delta === 'number')
  },
});

/**
 * 부모 컴포넌트로 이벤트를 보내기 위한 emit 선언
 * - change-weight 이벤트로 delta를 전달
 */
const emit = defineEmits(["change-weight"]);

/** 버튼 클릭 시 부모에게 delta 전달 */
function emitChange(delta) {
  emit("change-weight", delta);
}
</script>

<style scoped>
.section {
  border-top: 2px dashed #999;
  padding-top: 12px;
  margin-top: 12px;
}

.h3 {
  margin: 0 0 10px;
  font-size: 22px;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  padding: 8px 10px;
  border: 1px solid #555;
  background: #f5f5f5;
  cursor: pointer;
}

button:hover {
  background: #e9e9e9;
}
</style>
