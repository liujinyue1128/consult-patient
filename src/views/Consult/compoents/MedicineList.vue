<script setup lang="ts">
import { ref, watch } from 'vue'
import MedecineCard from './MedicineCard.vue'
import { getMedicinePage } from '@/services/consult'
import type { MedicineList, MedicineParams } from '@/types/consult'
const loading = ref(false)
const finished = ref(false)
const props = defineProps<{
  keyword: string
}>()
console.log(props.keyword)
const params = ref<MedicineParams>({
  keyword: props.keyword || '',
  pageSize: 10,
  current: 1
})
watch(
  () => props.keyword,
  (val) => {
    list.value = []
    params.value.current = 1
    params.value.keyword = val
    onLoad()
  }
)
const list = ref<number[]>([])
const onLoad = async () => {
  const { data } = await getMedicinePage(params.value)
  list.value.push(...data.rows)
  loading.value = false
  if (params.value.current >= data.pageTotal) {
    finished.value = true
  } else {
    finished.value = false
    params.value.current++
  }
}
</script>
<template>
  <div class="medicine-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <MedecineCard v-for="item in list" :key="item.id" :item="item"></MedecineCard>
    </van-list>
  </div>
</template>

<style scoped lang="scss">
.medicine-list {
  background-color: #fff;
  padding: 0 15px 45px;
}
</style>
