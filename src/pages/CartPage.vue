<template>
  <div class="container py-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h1 class="h4 mb-1">카트</h1>
        <div class="text-secondary small">담겨진 상품명, 상품 개수, 구매 버튼</div>
      </div>

      <button class="btn btn-outline-secondary" type="button" @click="goProducts">
        <i class="bi bi-arrow-left me-2"></i>
        상품 목록
      </button>
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
                <th style="width: 140px;">개수</th>
                <th class="text-end" style="width: 160px;">구매</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item.id">
                <td>
                  <div class="fw-semibold">{{ item.name }}</div>
                  <div class="small text-secondary">{{ item.type }}</div>
                </td>
                <td>
                  <span class="badge text-bg-light border">{{ item.quantity }}개</span>
                </td>
                <td class="text-end">
                  <button class="btn btn-primary btn-sm" type="button" @click="purchase(item.id)">
                    <i class="bi bi-bag-check me-2"></i>
                    구매
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-3 small text-secondary">
          ※ 화면 설계용: 구매 처리 로직은 구현하지 않았습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartItems = ref([
  { id: 1, type: '전자기기', name: '무선 이어폰', quantity: 1 },
  { id: 2, type: '생활용품', name: '텀블러', quantity: 2 },
])

function purchase(productId) {
  // 화면 설계용: 실제 결제/주문 로직 없음
}

function goProducts() {
  router.push({ name: 'products' })
}
</script>
