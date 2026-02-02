<template>

  <div>
    <input v-model.trim="message" placeholder="Type something">
    <p>Message: "{{ message }}"</p>
    <p>Trimmed Message: "{{ outputMessage }}"</p>
    <button @click="trimMessage">눌러주세요.</button>
  </div>

  <div>
    <input v-model.number="age" type="number" placeholder="Enter your age">
    <p>Your age plus 5 is: {{ agePlusFive }}</p>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue';

const message = ref("");
const outputMessage = ref("");

function trimMessage() {
  outputMessage.value = message.value.trim();
}

const age = ref(null);

const agePlusFive = computed(() => {
  return age.value + 5;
});
</script>