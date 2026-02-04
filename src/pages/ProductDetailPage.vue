<template>
  <div class="container py-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h1 class="h4 mb-0">상품 상세</h1>

      <button class="btn btn-outline-secondary" type="button" @click="goBackToList">
        <i class="bi bi-arrow-left me-2"></i>
        목록으로
      </button>
    </div>

    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="card shadow-sm">
          <img :src="product.detailImageUrl" class="card-img-top" :alt="product.name" />
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <span class="badge text-bg-secondary mb-2">{{ product.type }}</span>
            <h2 class="h5">{{ product.name }}</h2>
            <p class="text-secondary mb-4">{{ product.description }}</p>

            <div class="mb-3">
              <label for="qty" class="form-label">상품 개수</label>
              <input id="qty" v-model.number="quantity" type="number" min="1" class="form-control" />
            </div>

            <div class="d-grid gap-2">
              <button class="btn btn-success" type="button" @click="addToCart">
                <i class="bi bi-cart-plus me-2"></i>
                카트에 담기
              </button>

              <button class="btn btn-outline-dark" type="button" @click="goCart">
                <i class="bi bi-cart3 me-2"></i>
                카트로 이동
              </button>
            </div>

            <div class="mt-3">
              <small class="text-secondary">※ 화면 설계용: 담기 동작은 실제 저장 로직 없이 구성</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const quantity = ref(1)

/**
 * 화면 설계용 더미 데이터
 * (실제로는 id로 API 호출하거나 store에서 가져오게 됩니다.)
 */
const products = [
  {
    id: 1,
    thumbnailUrl: 'https://picsum.photos/seed/p1/640/360',
    type: '전자기기',
    name: '무선 이어폰',
    description: '가벼운 착용감과 선명한 사운드가 특징입니다.',
    detailImageUrl: 'https://picsum.photos/seed/p1-detail/900/600',
  },
  {
    id: 2,
    thumbnailUrl: 'https://picsum.photos/seed/p2/640/360',
    type: '생활용품',
    name: '텀블러',
    description: '보온/보냉이 오래가는 데일리 텀블러입니다.',
    detailImageUrl: 'https://picsum.photos/seed/p2-detail/900/600',
  },
  {
    id: 3,
    thumbnailUrl: 'https://picsum.photos/seed/p3/640/360',
    type: '패션',
    name: '데일리 백팩',
    description: '수납 공간이 넉넉한 심플 디자인 백팩입니다.',
    detailImageUrl: 'https://picsum.photos/seed/p3-detail/900/600',
  },
]

const product = computed(() => {
  const id = Number(route.params.id)
  return products.find((p) => p.id === id) || products[0]
})

function addToCart() {
  // 화면 설계용: 실제로는 pinia/store/localStorage/API 등으로 저장
  router.push({ name: 'cart' })
}

function goBackToList() {
  router.push({ name: 'products' })
}

function goCart() {
  router.push({ name: 'cart' })
}
</script>
