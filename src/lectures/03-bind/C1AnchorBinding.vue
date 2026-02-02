<template>
  <div>
    <input v-model="url" placeholder="Enter URL" /><br />
    <!-- <a v-bind:href="url">Visit Vue.js(v-bind:href)</a><br /> -->
    <a :href="url">Visit Vue.js(:href)</a><br>
    <img :src="url" alt="Image" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const url = ref("https://vuejs.org");
</script>