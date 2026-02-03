<template>
  <button class="cell" :class="{ active: isActive }" :disabled="disabled" @click="onClick"
    :aria-label="isActive ? '두더지 있음' : '빈 칸'">
    <span class="emoji" v-if="isActive">🐀</span>
    <span class="emoji ghost" v-else>🕳️</span>
  </button>
</template>

<script setup>
/**
 * MoleCell.vue = 가장 작은 단위(칸 하나)
 * - 받은 props로 UI만 표시
 * - 클릭하면 "내 index"를 부모(보드)에게 emit으로 전달
 * 이 컴포넌트(MoleCell)는
 * 부모로부터 index, isActive, disabled라는 값을 받아서 사용할 거야
 * ⭐ 부모가 내려준 값들이 한 덩어리 객체로 들어옴!
 */
const props = defineProps({
  index: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  disabled: { type: Boolean, default: false },
});

/**
 * click-cell 이벤트를 부모(WhackBoard)로 올림
 * payload는 index 하나만 보내도 충분
 */
const emit = defineEmits(["click-cell"]);

function onClick() {
  // 내가 눌렸다는 정보(내 index)를 부모에게 전달
  emit("click-cell", props.index);
}
</script>

<style scoped>
.cell {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  background: #fafafa;
  cursor: pointer;
  font-size: 30px;
  display: grid;
  place-items: center;
  transition: transform 0.08s ease;
}

.cell:hover {
  transform: translateY(-1px);
}

.cell:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.active {
  background: #fff6dd;
  border-color: #ffd271;
}

.emoji {
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.12));
}

.ghost {
  opacity: 0.65;
}
</style>
