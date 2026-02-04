<template>
  <div class="mb-3">
    <label :for="inputId" class="form-label">{{ label }}</label>

    <input :id="inputId" class="form-control" :class="sizeClass" :type="type" :placeholder="placeholder"
      :value="modelValue" :disabled="disabled" :readonly="readonly" @input="handleInput" @keyup.enter="handleEnter"
      @blur="handleBlur" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 컴포넌트마다 고유 id
let __seq = 0
const inputId = `common-input-${++__seq}`

const props = defineProps({
  label: { type: String, required: true },

  modelValue: { type: [String, Number], default: '' }, // v-model
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },

  // '' | 'sm' | 'lg'
  size: { type: String, default: '' },

  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'enter', 'blur'])

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'form-control-sm'
  if (props.size === 'lg') return 'form-control-lg'
  return ''
})

function handleInput(e) {
  emit('update:modelValue', e.target.value)
}

function handleEnter() {
  emit('enter', props.modelValue)
}

function handleBlur() {
  emit('blur', props.modelValue)
}
</script>
