<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h1 class="h4 mb-3">로그인</h1>
            <p class="text-secondary mb-4">이메일과 패스워드를 입력해 주세요.</p>

            <div class="mb-3">
              <label for="email" class="form-label">이메일</label>
              <input id="email" v-model="email" type="email" class="form-control" placeholder="example@domain.com" />
            </div>

            <div class="mb-4">
              <label for="password" class="form-label">패스워드</label>
              <input id="password" v-model="password" type="password" class="form-control" placeholder="••••••••" />
            </div>

            <button class="btn btn-primary w-100" type="button" @click="goProductList">
              <i class="bi bi-box-arrow-in-right me-2"></i>
              로그인
            </button>

            <div class="text-center mt-3">
              <small class="text-secondary">※ 화면 설계용: 버튼 클릭 시 상품 목록으로 이동</small>
            </div>
          </div>
        </div>

        <div class="alert alert-light border mt-3 mb-0">
          <div class="d-flex align-items-center">
            <i class="bi bi-info-circle me-2"></i>
            <div class="small text-secondary">
              실제 인증 로직은 구현하지 않고, 화면 이동만 구성했습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

function goProductList() {
  router.push({ name: 'products' })
}
</script>
