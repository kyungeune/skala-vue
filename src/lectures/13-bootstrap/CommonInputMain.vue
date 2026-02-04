<template>
  <div>
    <!-- 이메일 -->
    <CommonInput label="이메일" type="email" placeholder="id@naver.com 형태로 입력하세요" v-model="email" :readonly="emailReadonly"
      @blur="verifyEmail" @enter="verifyEmail" />

    <!-- 이름 + 이름 크기 조절 버튼 + 비활성화 버튼 -->
    <div class="d-flex gap-2 mb-2">
      <button class="btn btn-outline-secondary btn-sm" @click="nameSize = 'sm'">
        이름 작게
      </button>
      <button class="btn btn-outline-secondary btn-sm" @click="nameSize = 'lg'">
        이름 크게
      </button>

      <button class="btn btn-outline-danger btn-sm" :disabled="nameDisabled" @click="lockName">
        이름 저장
      </button>
    </div>

    <CommonInput label="이름" placeholder="이름을 입력하세요" v-model="name" :size="nameSize" :disabled="nameDisabled" />

    <!-- 비밀번호 -->
    <CommonInput label="비밀번호" type="password" placeholder="8자 이상 + 영어/숫자 혼합" v-model="password" />

    <div class="mt-2">
      <small class="text-muted">
        비밀번호 조건:
        <b>8자 이상</b> + <b>영문/숫자 혼합</b>
      </small>
      <div>
        <small :class="passwordValid ? 'text-success' : 'text-danger'">
          {{ passwordValid ? '✅ 조건 만족' : '❌ 조건 불만족' }}
        </small>
      </div>
    </div>

    <!-- 로그인 버튼 (readonly처럼: 조건 불만족이면 클릭 불가) -->
    <button class="btn btn-primary mt-3" :disabled="loginButtonDisabled"
      :class="{ 'btn-readonly': loginButtonDisabled }" @click="handleLogin">
      로그인
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CommonInput from './CommonInput.vue'

const email = ref('')
const name = ref('')
const password = ref('')

// 이메일 인증 후 readonly
const emailReadonly = ref(false)

// 이름 크기 조절
const nameSize = ref('') // '' | 'sm' | 'lg'

// 이름 비활성화 (한 번 alert 뜨면 더 이상 입력 못하게)
const nameDisabled = ref(false)

function isValidNaverEmail(value) {
  // 아주 기본적인 naver.com 메일 형식 체크
  // - 앞부분: 영문/숫자/._%+- 허용
  // - 도메인: naver.com 고정
  const re = /^[A-Za-z0-9._%+-]+@naver\.com$/
  return re.test(String(value).trim())
}

function verifyEmail() {
  if (emailReadonly.value) return

  if (isValidNaverEmail(email.value)) {
    alert('이메일이 잘 인증되었습니다')
    emailReadonly.value = true
  }
}

function lockName() {
  const v = String(name.value).trim()
  if (!v) {
    alert('이름을 먼저 입력해 주세요')
    return
  }

  alert('이름이 저장되었습니다')
  nameDisabled.value = true
}

// 비밀번호 조건: 8자 이상 + 영어/숫자 혼합
const passwordValid = computed(() => {
  const v = String(password.value)
  const hasMinLen = v.length >= 8
  const hasLetter = /[A-Za-z]/.test(v)
  const hasNumber = /[0-9]/.test(v)
  return hasMinLen && hasLetter && hasNumber
})

// “비밀번호 조건 불만족이면 로그인 버튼 readonly처럼”
const loginButtonDisabled = computed(() => {
  return !passwordValid.value
})

function handleLogin() {
  // 버튼이 disabled면 클릭 자체가 안 되지만, 안전하게 한 번 더 방어
  if (!passwordValid.value) return

  const n = String(name.value).trim()
  const p = String(password.value).trim()

  if (n && p && passwordValid.value) {
    alert('로그인 되었습니다')
  } else {
    alert('이름과 비밀번호를 정확히 입력해 주세요')
  }
}
</script>

<style scoped>
/* 버튼은 readonly 속성이 없어서 "readonly처럼" 보이게 처리 */
.btn-readonly {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
