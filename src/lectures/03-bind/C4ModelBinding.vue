<template>
  <div>
    <input v-model="message" placeholder="Type something">
    <p>Message: {{ message }}</p>
  </div>

  <!--텍스트 입력 바인딩-->
  <div>
    <input v-model="textMessage" placeholder="Type something">
    <p>Message: {{ textMessage }}</p>
  </div>

  <!--체크박스 바인딩-->
  <div>
    <input type="checkbox" v-model="checkboxMessage">
    <p>checked: {{ checkboxMessage }}</p>
  </div>

  <!--라디오 버튼 바인딩-->
  <div>
    <input type="radio" value="Option 1" v-model="radioMessage"> Option 1
    <input type="radio" value="Option 2" v-model="radioMessage"> Option 2
    <p>Selected: {{ radioMessage }}</p>
  </div>

  <!--셀렉트 박스 바인딩-->
  <div>
    <select v-model="selectMessage">
      <option value="A">Option A</option>
      <option value="B">Option B</option>
      <option value="C">Option C</option>
    </select>
    <p>selectMessage: {{ selectMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref("밸류에 넣은 값");
const textMessage = ref("");
const checkboxMessage = ref("");
const radioMessage = ref("");
const selectMessage = ref("");
</script>

<style>
div {
  margin-bottom: 12px;
}
</style>
