<script setup lang="ts">
import { LiverFunction, KidneyFunction, FertilityStatus, AllergicHistory } from '../../enums'
import type { MedicineIllness, Image } from '@/types/consult'
import { computed, ref } from 'vue'
import { showToast, UploaderFileListItem } from 'vant'
import { useConsult } from '@/stores'
import { useRouter } from 'vue-router'
const store = useConsult()
const router = useRouter()
const form = ref<MedicineIllness>({
  illnessDesc: '',
  liverFunction: undefined,
  renalFunction: undefined,
  allergicHistory: undefined,
  fertilityStatus: undefined,
  pictures: []
})
const liverFunctionOptions = [
  { label: '正常', value: LiverFunction.Normal },
  { label: '异常', value: LiverFunction.Abnormal },
  { label: '不清楚', value: LiverFunction.Unclear }
]
const renalFunctionOptions = [
  { label: '正常', value: KidneyFunction.Normal },
  { label: '异常', value: KidneyFunction.Abnormal },
  { label: '不清楚', value: KidneyFunction.Unclear }
]
//
const allergicHistoryOptions = [
  { label: '正常', value: AllergicHistory.Normal },
  { label: '异常', value: AllergicHistory.Abnormal },
  { label: '不清楚', value: AllergicHistory.Unclear }
]
const fertilityStatusOptions = [
  { label: '无', value: FertilityStatus.Normal },
  { label: '备孕中', value: FertilityStatus.TryingToConceive },
  { label: '已怀孕', value: FertilityStatus.AlreadyPregnant },
  { label: '哺乳期中', value: FertilityStatus.Breastfeeding }
]
const cpUploadRef = ref()
const onUploadSuccess = (image: Image) => {
  form.value.pictures?.push(image)
}
const onDeleteSuccess = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}
const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.liverFunction === undefined ||
    form.value.renalFunction === undefined ||
    form.value.allergicHistory === undefined ||
    form.value.fertilityStatus === undefined
)
const nextStep = () => {
  if (!form.value.illnessDesc) return showToast('请填写症状描述')
  if (form.value.liverFunction === undefined) return showToast('请选择肝功能情况')
  if (form.value.renalFunction === undefined) return showToast('请选择肾功能情况')
  if (form.value.allergicHistory === undefined) return showToast('请选择过敏史情况')
  if (form.value.fertilityStatus === undefined) return showToast('请选择生育状态及计划')
  store.setMedicineInllness(form.value)
  router.push('/user/patient?isChange=1&from=medicineConsult')
}
</script>
<template>
  <div class="consult-medicine-page">
    <cp-nav-bar
      title="开药门诊"
      right-text="问诊记录"
      @click-right="$router.push('/user/consult')"
    />
    <van-notice-bar text="请如实填写资料以便医生了解您的病情和用药需求" />
    <div class="illness-form">
      <div class="ad-list-header">症状描述</div>
      <van-field
        type="textarea"
        rows="3"
        placeholder="请输入所患疾病名称"
        v-model="form.illnessDesc"
      />
      <div class="ad-list-header">用药人身体情况</div>
      <div class="item">
        <p>肝功能</p>
        <cp-radio-btn :options="liverFunctionOptions" v-model="form.liverFunction"></cp-radio-btn>
      </div>
      <div class="item">
        <p>肾功能</p>
        <cp-radio-btn :options="renalFunctionOptions" v-model="form.renalFunction"></cp-radio-btn>
      </div>
      <div class="item">
        <p>过敏史</p>
        <cp-radio-btn
          :options="allergicHistoryOptions"
          v-model="form.allergicHistory"
        ></cp-radio-btn>
      </div>
      <div class="item">
        <p>生育状态及计划</p>
        <cp-radio-btn
          :options="fertilityStatusOptions"
          v-model="form.fertilityStatus"
        ></cp-radio-btn>
      </div>

      <div class="adm-list-header">补充病例信息</div>
      <!-- 上传组件 -->
      <div class="illness-img">
        <cp-upload
          ref="cpUploadRef"
          @upload-success="onUploadSuccess"
          @delete-success="onDeleteSuccess"
        ></cp-upload>
      </div>
      <van-button @click="nextStep" type="primary" round block :class="{ disabled }">
        下一步
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.consult-medicine-page {
  padding-top: 46px;
  .van-button {
    font-size: 16px;
    margin-bottom: 30px;
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
  .illness-form {
    padding: 0 15px 15px 15px;
    .adm-list-header {
      padding-bottom: 5px;
      font-size: 16px;
      font-weight: 500;
      color: #121826;
      border-bottom: none;
      margin-top: 30px;
    }
    .van-field {
      padding: 0;
      &::after {
        border-bottom: none;
      }
    }
    .item {
      > p {
        color: var(--cp-text3);
        padding: 15px 0;
      }
    }
  }
}
</style>
