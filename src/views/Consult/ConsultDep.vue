<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllDep } from '@/services/consult.ts'
import type { TopDep } from '@/types/consult'
import { useConsult } from '@/stores'
onMounted(() => {
  getData()
})
// 二级科室，注意：组件初始化没有数据 child 可能拿不到
const subDep = computed(() => depAll.value[active.value]?.child)
const depAll = ref<TopDep[]>([])
const active = ref(0)

const store = useConsult()

const getData = async () => {
  const res = await getAllDep()
  console.log(res.data)
  depAll.value = res.data
}
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="top in depAll" :key="top.id" :title="top.name" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="item in subDep"
          :key="item.id"
          @click="store.setDep(item.id)"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
