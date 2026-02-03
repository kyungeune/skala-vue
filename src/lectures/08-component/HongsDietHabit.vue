<template>
  <div class="box">
    <section class="section">
      <h3 class="h3">🍔 음식 먹기</h3>
      <div class="btns">
        <button @click="emitChange(+1)">햄버거 (+1kg)</button>
        <button @click="emitChange(+2)">피자 (+2kg)</button>
      </div>
    </section>

    <section class="section">
      <h3 class="h3">🏃‍♂️ 기술 연습</h3>
      <div class="btns">
        <button @click="emitChange(-1)">걷기 (-1kg)</button>
        <button @click="emitChange(-2)">달리기 (-2kg)</button>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * 부모 컴포넌트로 이벤트를 보내기 위한 emit 선언
 * change-weight 이벤트 사용
 */
const emit = defineEmits(["change-weight"]);

/**
 * 체중 변화 이벤트 발생 함수
 * 부모에게 delta 값을 전달함
 */
function emitChange(delta) {
  emit("change-weight", delta);
}
</script>

<style scoped>
.box {
  margin-top: 16px;
}

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
