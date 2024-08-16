<template>
  <div class="illness-img">
    <van-uploader
      v-model="fileList"
      max-count="9"
      upload-icon="photo-o"
      upload-text="上传图片"
      :max-size="5 * 1024 * 1024"
      :after-read="afterRead"
      @delete="onDelete"
    >
      <p class="tip" v-if="!(fileList.length >= 9)">上传内容仅医生可见,最多9张图,最大5MB</p>
    </van-uploader>
  </div>
</template>
<script lang="ts" setup>
import { uploadImage } from '@/services/consult'
import type { UploaderFileListItem } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { ref } from 'vue'
import type { Image } from '@/types/consult'
const emit = defineEmits<{
  (e: 'uploadSuccess', img: Image): void
  (e: 'deleteSuccess', img: UploaderFileListItem): void
}>()
const onDelete = (item: UploaderFileListItem) => {
  emit('deleteSuccess', item)
}
const afterRead: UploaderAfterRead = (file) => {
  if (Array.isArray(file)) return
  if (!file.file) return
  file.status = 'uploading'
  file.message = '上传中...'
  uploadImage(file.file)
    .then((result) => {
      file.status = 'done'
      file.message = undefined
      file.url = result.data.url
      emit('uploadSuccess', result.data)
    })
    .catch((err) => {
      file.status = 'failed'
      file.message = '上传失败'
    })
}
const setFileList = (val: Image[]) => {
  fileList.value = val
}
defineExpose({
  setFileList
})
// 图片列表
const fileList = ref<Image[]>([])
// 上传图片
</script>
<style scoped lang="scss">
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
