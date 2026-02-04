<template>
  <div class="container py-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h1 class="h4 mb-1">카트</h1>
        <div class="text-secondary small">담겨진 상품명, 상품 개수, 구매 버튼</div>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-outline-danger" type="button" @click="clearAll" :disabled="cartItems.length === 0">
          <i class="bi bi-trash3 me-2"></i>
          비우기
        </button>

        <button class="btn btn-outline-secondary" type="button" @click="goProducts">
          <i class="bi bi-arrow-left me-2"></i>
          상품 목록
        </button>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <div v-if="cartItems.length === 0" class="text-secondary">
          담긴 상품이 없습니다.
        </div>

        <div v-else class="table-responsive">
          <table class="table align-middle mb-0">
            <thead>
              <tr>
                <th>상품명</th>
                <th style="width: 220px;">개수</th>
                <th class="text-end" style="width: 260px;">동작</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in cartItems" :key="item.id">
                <td>
                  <div class="fw-semibold">{{ item.name }}</div>
                  <div class="small text-secondary">{{ item.type }}</div>
                </td>

                <!-- 수량 +/- -->
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-outline-secondary btn-sm" type="button" @click="decrease(item.id)">
                      <i class="bi bi-dash"></i>
                    </button>

                    <input class="form-control form-control-sm" style="width: 90px;" type="number" min="1"
                      :value="item.quantity" @change="onQtyInput(item.id, $event)" />

                    <button class="btn btn-outline-secondary btn-sm" type="button" @click="increase(item.id)">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </td>

                <td class="text-end">
                  <div class="d-inline-flex gap-2">
                    <button class="btn btn-primary btn-sm" type="button" @click="purchase(item.id)">
                      <i class="bi bi-bag-check me-2"></i>
                      구매
                    </button>

                    <button class="btn btn-outline-danger btn-sm" type="button" @click="remove(item.id)">
                      <i class="bi bi-x-lg me-2"></i>
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-3 small text-secondary">
          ※ 화면 설계용: 결제 연동 없이 localStorage 기반으로만 동작합니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getCartItems,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from '@/store/cartStorage.js'

const router = useRouter()
const cartItems = ref([])

function refresh() {
  cartItems.value = getCartItems()
}

onMounted(() => {
  refresh()
})

function increase(productId) {
  const item = cartItems.value.find((x) => x.id === productId)
  if (!item) return
  updateCartQuantity(productId, item.quantity + 1)
  refresh()
}

function decrease(productId) {
  const item = cartItems.value.find((x) => x.id === productId)
  if (!item) return
  updateCartQuantity(productId, Math.max(1, item.quantity - 1))
  refresh()
}

function onQtyInput(productId, event) {
  const v = Math.max(1, Math.floor(Number(event.target.value) || 1))
  updateCartQuantity(productId, v)
  refresh()
}

function remove(productId) {
  removeFromCart(productId)
  refresh()
}

function clearAll() {
  clearCart()
  refresh()
}

function purchase(productId) {
  // 화면 설계용: 구매 처리(결제) 대신 "구매 완료" UX만 제공
  alert('구매가 완료되었습니다! (화면 설계용)')
  // 구매 후 카트 비우기(원하시면 해당 상품만 삭제로 변경 가능)
  clearAll()
}

function goProducts() {
  router.push({ name: 'products' })
}
</script>
