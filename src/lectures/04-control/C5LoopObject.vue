<template>
  <h2>객체 렌더링</h2>
  <ul>
    <li v-for="(value, key, index) in userInfo" :key="index">
      {{ value }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  name: '홍길동',
  age: 30,
  job: '의적'
})
</script>
