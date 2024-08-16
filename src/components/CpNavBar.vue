<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const router = useRouter()
const onClickLeft = () => {
  if (props.back) return props.back()
  // 判断history.state是否存在上级路由
  if (history.state.back) {
    router.back() // 如果存在，则返回上一级菜单
  } else {
    router.push('/') // 否则，直接返回根目录
  }
}
const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <van-nav-bar
    fixed
    :title="title"
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      color: var(--cp-text);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>
