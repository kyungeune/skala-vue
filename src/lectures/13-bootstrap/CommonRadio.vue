<template>
  <div>
    <div v-for="(opt, idx) in options" :key="opt.value" class="form-check" :style="sizeStyle">
      <input class="form-check-input" type="radio" :name="name" :id="makeId(idx)" :value="opt.value" v-model="model"
        :disabled="disabled" @change="onChanged(opt)" />

      <label class="form-check-label" :for="makeId(idx)">
        {{ opt.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  options: { type: Array, required: true, default: () => [] },
  name: { type: String, required: true },

  modelValue: { type: [String, Number], default: "" },
  size: { type: String, default: "md" }, // "sm" | "md" | "lg"
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(["update:modelValue", "changed"])

const model = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit("update:modelValue", v)
  },
})

const uid = Math.random().toString(36).slice(2, 9)
const makeId = (idx) => `${props.name}-${uid}-${idx}`

function onChanged(opt) {
  emit("changed", { name: props.name, label: opt.label, value: opt.value })
}

/**
 * Bootstrap 5.3는 라디오 "size class"가 없어서
 * CSS 변수(--bs-form-check-*)로 크기를 제어해야 실제로 먹습니다.
 */
const sizeStyle = computed(() => {
  if (props.size === "sm") {
    return {
      "--bs-form-check-min-height": "1rem",
      "--bs-form-check-padding-start": "1.25em",
      "--bs-form-check-margin-bottom": "0.25rem",
      "--bs-form-check-input-width": "0.95em",
      "--bs-form-check-input-height": "0.95em",
      fontSize: "0.9rem",
    }
  }

  if (props.size === "lg") {
    return {
      "--bs-form-check-min-height": "1.5rem",
      "--bs-form-check-padding-start": "1.75em",
      "--bs-form-check-margin-bottom": "0.5rem",
      "--bs-form-check-input-width": "1.35em",
      "--bs-form-check-input-height": "1.35em",
      fontSize: "1.05rem",
    }
  }

  // md (default)
  return {
    "--bs-form-check-min-height": "1.25rem",
    "--bs-form-check-padding-start": "1.5em",
    "--bs-form-check-margin-bottom": "0.375rem",
    "--bs-form-check-input-width": "1.15em",
    "--bs-form-check-input-height": "1.15em",
    fontSize: "1rem",
  }
})
</script>
