<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { PatientList, Patient } from '@/types/user.d.ts'
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/user.ts'
import { nameRules, idCardRules } from '@/utils/rules.ts'
import { type FormInstance } from 'vant'
import { showConfirmDialog, showSuccessToast, showToast } from 'vant'
import { useConsult } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = useConsult()
const patientId = ref<string>()
console.log(route.query, '路由')
const isChange = computed(() => route.query.isChange === '1')
const options = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
]
const gender = ref(1)
const list = ref<PatientList>([])
const showRight = ref(false)
const form = ref<FormInstance>() // 创建表单实例
const initPatient: Patient = {
  name: '',
  defaultFlag: 0,
  idCard: '',
  gender: 1
}
const patient = ref<Patient>({ ...initPatient })
onMounted(() => {
  patientList()
})
const patientList = async () => {
  try {
    const res = await getPatientList()
    if (res.data) {
      list.value = res.data
    }
    if (isChange.value && list.value.length) {
      const defPatient = list.value.find((item) => item.defaultFlag == 1)
      if (defPatient) patientId.value = defPatient.id
      else patientId.value = list.value[0].id
    }
    console.log(res, '我是健康档案')
  } catch (e) {
    console.log(e)
  }
}
const defaultFlag = computed({
  get: () => (patient.value.defaultFlag === 1 ? true : false),
  set: (value) => (patient.value.defaultFlag = value ? 1 : 0)
})

const goBack = () => {
  showRight.value = false
  //   重置表单项
  patient.value = { ...initPatient }
}

const onsubmit = async () => {
  await form.value?.validate() // 对表单整体校验
  const gender = +patient.value.idCard.slice(-2, -1) % 2
  if (gender !== patient.value.gender) {
    await showConfirmDialog({
      title: '温馨提示',
      message: '填写的性别和身份证号中的不一致\n您确认提交吗？'
    })
  }
  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)

  showRight.value = false
  patientList()
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}

const showPop = (item?: Patient) => {
  if (item) {
    // 如果点的是编辑，结构出后台需要的数据
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }
  showRight.value = true
}

const delePatient = async () => {
  if (patient.value.id) {
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`
    })
    await delPatient(patient.value.id)
    showRight.value = false
    patientList()
    showSuccessToast('删除成功')
  }
}

const selectedPatient = (item: Patient) => {
  if (isChange.value) {
    patientId.value = item.id
  }
}
const fromMedicineConsultFlag = computed(() => route.query.from === 'medicineConsult')
const next = () => {
  if (!patientId.value) return showToast('请选就诊择患者')
  store.setPatient(patientId.value)
  if (fromMedicineConsultFlag.value) {
    router.push('/consult/choose')
  } else {
    router.push({ path: '/consult/pay' })
  }
}
</script>

<template>
  <div class="patient-page">
    <!-- 头部提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in list"
        :key="item.id"
        @click="selectedPatient(item)"
        :class="{ selected: patientId === item.id }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon">
          <cp-icon name="user-edit" @click="showPop(item)" />
        </div>
        <div class="tag" v-if="item.defaultFlag">默认</div>
      </div>

      <div class="patient-add" v-if="list.length < 6" @click="showPop">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
      <!-- 底部按钮 -->
      <div class="patient-next" v-if="isChange">
        <van-button type="primary" round block @click="next">下一步</van-button>
      </div>
    </div>

    <van-popup v-model:show="showRight" position="right">
      <cp-nav-bar
        :title="patient.id ? '添加患者' : '添加患者'"
        right-text="保存"
        :back="goBack"
        @click-right="onsubmit"
      />
      <van-form autocomplete="off" ref="form" class="patient-page">
        <van-field
          label="真实姓名"
          placeholder="请输入真实姓名"
          v-model="patient.name"
          :rules="nameRules"
        />
        <van-field
          label="身份证号"
          placeholder="请输入身份证号"
          v-model="patient.idCard"
          :rules="idCardRules"
        />
        <van-field label="性别" class="pb4" v-model="patient.gender">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn :options="options" v-model="gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" :icon-size="18" round />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="delePatient">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
    <!-- <cp-radio-btn :options="options" v-model="gender"></cp-radio-btn> -->
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
    }
  }
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
</style>
