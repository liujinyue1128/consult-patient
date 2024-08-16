<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { getDoctorPage } from '@/services/consult'
import type { DoctorList } from '@/types/consult'
const width = ref(0)
const setWidth = () => (width.value = window.innerwidth)
const list = ref<DoctorList>()
onMounted(() => {
  getList()
  setWidth()
  window.addEventListener('resize', setWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', setWidth)
})
const getList = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  list.value = res.data?.rows
}
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe width="150" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
