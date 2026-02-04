<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand fw-semibold" to="/products">
        <i class="bi bi-shop me-2"></i>
        My Shop
      </RouterLink>

      <div class="d-flex gap-2 align-items-center">
        <RouterLink class="btn btn-outline-secondary" to="/products">
          <i class="bi bi-grid me-2"></i>
          상품
        </RouterLink>

        <RouterLink class="btn btn-outline-dark position-relative" to="/cart">
          <i class="bi bi-cart3 me-2"></i>
          카트
          <span v-if="cartCount > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">
            {{ cartCount }}
          </span>
        </RouterLink>

        <RouterLink class="btn btn-outline-primary" to="/login">
          <i class="bi bi-box-arrow-in-right me-2"></i>
          로그인
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getCartCount } from '@/store/cartStorage.js'

const cartCount = ref(0)

function refreshCount() {
  cartCount.value = getCartCount()
}

function onCartUpdated() {
  refreshCount()
}

onMounted(() => {
  refreshCount()
  window.addEventListener('cart-updated', onCartUpdated)
})

onBeforeUnmount(() => {
  window.removeEventListener('cart-updated', onCartUpdated)
})
</script>
