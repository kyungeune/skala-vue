<template>
  <div class="container py-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h1 class="h4 mb-1">상품 목록</h1>
        <div class="text-secondary small">이미지 또는 카드 클릭 시 상품 상세로 이동합니다.</div>
      </div>

      <button class="btn btn-outline-dark" type="button" @click="goCart">
        <i class="bi bi-cart3 me-2"></i>
        카트
      </button>
    </div>

    <div class="row g-3">
      <div v-for="p in products" :key="p.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm" role="button" @click="goDetail(p.id)">
          <img :src="p.thumbnailUrl" class="card-img-top" :alt="p.name" style="object-fit: cover; height: 180px;" />

          <div class="card-body">
            <span class="badge text-bg-secondary mb-2">{{ p.type }}</span>
            <h2 class="h6 mb-2">{{ p.name }}</h2>
            <p class="text-secondary mb-0 small">{{ p.description }}</p>
          </div>

          <div class="card-footer bg-white border-0 pt-0">
            <button class="btn btn-sm btn-primary w-100" type="button" @click.stop="goDetail(p.id)">
              <i class="bi bi-search me-2"></i>
              상세 보기
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <button class="btn btn-outline-secondary" type="button" @click="goLogin">
        <i class="bi bi-arrow-left me-2"></i>
        로그인으로
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = ref([
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
])

function goDetail(id) {
  router.push({ name: 'productDetail', params: { id } })
}

function goCart() {
  router.push({ name: 'cart' })
}

function goLogin() {
  router.push({ name: 'login' })
}
</script>
