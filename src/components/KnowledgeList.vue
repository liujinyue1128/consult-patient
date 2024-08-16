<script setup lang="ts">
import { ref, onMounted } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'
import { KnowledgeType, KnowledgeParams, KnowledgeList } from '@/types/consult.d.ts'
import { getKnowledgePage } from '@/services/consult.ts'
const props = defineProps<{
  type: KnowledgeType
}>()

const list = ref<KnowledgeList>([])
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  loading.value = true
  const res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)
  let list1 = res.data.rows
  console.log(list.value)
  console.log(list1)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}

const loading = ref(false)
const finished = ref(false)
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
