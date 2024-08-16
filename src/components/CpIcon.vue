<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
<template>
  <svg aria-hidden="true" class="cp-icon">
    <!-- #icon-文件夹名称-图片名称 -->
    <use :href="`#icon-${name}`" />
  </svg>
</template>
<style scoped lang="scss">
.cp-icon {
  width: 1rem;
  height: 1em;
}
</style>
