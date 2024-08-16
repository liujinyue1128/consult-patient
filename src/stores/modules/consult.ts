import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Medical } from './room.d'

import type { PartialConsult, ConsultIllness, MedicineIllness } from '@/types/consult.d.ts'
export const useConsult = defineStore(
  'cp-consult',

  () => {
    // 1. 问诊信息
    const consult = ref<PartialConsult>({})

    // 2. 记录问诊类型
    const setType = (type: PartialConsult) => {
      consult.value.type = type
    }

    // 3. 记录问诊级别
    const setIllenseType = (type: 0 | 1) => {
      consult.value.illnessType = type
      // consult.value.illenseType = type
    }

    // 4. 记录科室
    const setDep = (depId: string) => {
      consult.value.dep = depId
    }

    // 5. 记录病情
    const setIllness = (ill: ConsultIllness) => {
      consult.value.illnessDesc = ill.illnessDesc
      consult.value.illnessTime = ill.illnessTime
      consult.value.consultFlag = ill.consultFlag
      consult.value.pictures = ill.pictures
    }

    // 6. 设置患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 7. 设置优惠卷
    const setCoupon = (id?: string) => (consult.value.couponId = id)

    // 8.清空记录
    const clear = () => (consult.value = {})

    // 9. 记录问药门诊病情
    const setMedicineInllness = (illness: MedicineIllness) => {
      consult.value.illenseType = illness.illenseType
      consult.value.liverFunction = illness.liverFunction
      consult.value.renalFunction = illness.renalFunction
      consult.value.allergicHistory = illness.allergicHistory
      consult.value.fertilityStatus = illness.fertilityStatus
      consult.value.pictures = illness.pictures
    }
    const setMedicines = (val: Medical[]) => {
      consult.value.medicines = val
    }
    return {
      consult,
      setType,
      setIllenseType,
      setDep,
      setIllness,
      setPatient,
      setCoupon,
      clear,
      setMedicineInllness,
      setMedicines
    }
  },
  { persist: true }
)
