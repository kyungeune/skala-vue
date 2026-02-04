<template>
  <div class="p-3">
    <h3 class="mb-3">CommonRadio를 이용해 성별, 학교를 선택할 수 있는 화면 만들기</h3>

    <!-- ===== 제어 패널(사이즈/disabled 변경) ===== -->
    <div class="mb-4">
      <div class="d-flex gap-3 align-items-center flex-wrap">
        <div>
          <label class="form-label mb-1">라디오 사이즈</label>
          <select class="form-select" style="width: 160px" v-model="radioSize">
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </div>

        <div class="form-check mt-4">
          <input class="form-check-input" type="checkbox" id="disGender" v-model="disableGender" />
          <label class="form-check-label" for="disGender">성별 disabled</label>
        </div>

        <div class="form-check mt-4">
          <input class="form-check-input" type="checkbox" id="disSchool" v-model="disableSchool" />
          <label class="form-check-label" for="disSchool">학교 disabled</label>
        </div>
      </div>
    </div>

    <!-- ===== 성별 ===== -->
    <section class="mb-4">
      <h5 class="mb-2">성별 선택</h5>

      <CommonRadio name="gender" :options="genderOptions" v-model="selectedGender" :size="radioSize"
        :disabled="disableGender" @changed="handleChanged" />

      <div class="mt-2">
        <b>현재 선택(성별):</b> {{ selectedGender }} / {{ genderLabel }}
      </div>
    </section>

    <!-- ===== 학교 ===== -->
    <section>
      <h5 class="mb-2">학교 선택</h5>

      <CommonRadio name="school" :options="schoolOptions" v-model="selectedSchool" :size="radioSize"
        :disabled="disableSchool" @changed="handleChanged" />

      <div class="mt-2">
        <b>현재 선택(학교):</b> {{ selectedSchool }} / {{ schoolLabel }}
      </div>
    </section>

    <hr class="my-4" />

    <!-- "내가 무언가를 선택한 상태에서 라디오선택이 이뤄졌다면 그 사실을 내가 알아야 함" -->
    <div class="alert alert-info mb-0">
      <div><b>마지막 변경 이벤트:</b></div>
      <div v-if="lastChanged">
        group(name): {{ lastChanged.name }}<br />
        label: {{ lastChanged.label }}<br />
        value: {{ lastChanged.value }}
      </div>
      <div v-else>아직 변경 이벤트가 없습니다.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import CommonRadio from "./CommonRadio.vue"

const genderOptions = ref([
  { label: "남", value: "m" },
  { label: "여", value: "f" },
])

const schoolOptions = ref([
  { label: "초등학교", value: "01" },
  { label: "중학교", value: "02" },
  { label: "고등학교", value: "03" },
  { label: "대학교", value: "04" },
])

/* v-model defaultValue(초기 체크) */
const selectedGender = ref("m")
const selectedSchool = ref("03")

/* 사이즈/disabled 변경 */
const radioSize = ref("md")
const disableGender = ref(false)
const disableSchool = ref(false)

/* "지금 뭐가 선택됐는지" 이벤트로 확인 */
const lastChanged = ref(null)
function handleChanged(payload) {
  lastChanged.value = payload
}

/* 선택된 label도 바로 알 수 있게 */
const genderLabel = computed(() => {
  return genderOptions.value.find((o) => o.value === selectedGender.value)?.label ?? ""
})

const schoolLabel = computed(() => {
  return schoolOptions.value.find((o) => o.value === selectedSchool.value)?.label ?? ""
})
</script>
