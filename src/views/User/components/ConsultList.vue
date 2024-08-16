<script setup lang="ts">
import ConsultItem from './ConsultItem.vue'
import type { ConsultOrderListParams } from '@/types/consult'
import { getConsultOrderList } from '@/services/consult'
import { ConsultType } from '@/enums'
import { ref } from 'vue'
const props = defineProps<{ type: ConsultType }>()
const params = ref<ConsultOrderListParams>({
  //   type: props.type,
  type: 1,
  current: 1,
  pageSize: 5
})
const loading = ref(false)
const list = ref()
const finished = ref(false)
const onLoad = async () => {
  try {
    const res = await getConsultOrderList(params.value)
    console.log(res, 'resss')
    if (res.code == 10000) {
      list.value.push(...res.data.rows)
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" /> </van-list
    ><consult-item />
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
