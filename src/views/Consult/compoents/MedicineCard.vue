<script setup lang="ts">
import { ref, watch } from 'vue'
import { useConsult } from '@/stores'
import type { Medical } from '@/types/room.d.ts'

const props = defineProps<{
  item: Medical
}>()
const step = ref(0)
const consultStore = useConsult()
const onChange = (value: string, detail: { name: string }) => {
  console.log('value', value, 'detial', detail)
  const medicines = consultStore.consult.medicines || []
  const medicine = medicines?.find((item) => item.id === detail.name)
  if (medicine) {
    medicine.quantity = value
  } else {
    medicines.push({
      ...props.item,
      quantity: value
    })
  }
  console.log(medicines)
  consultStore.setMedicines(medicines.filter((item) => +item.quantity > 0))
}
watch(
  () => consultStore.consult.medicines?.find((item) => item.id === props.item.id),
  (val) => {
    if (val) {
      step.value = +val.quantity
    } else {
      step.value = 0
    }
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <div class="item van-hairline--top" @click="$router.push(`/consult/medicineDetail/${item.id}`)">
    <img class="img" :src="item.avatar" alt="" />
    <div class="info">
      <p class="name">
        <span>{{ item.name }}</span>
        <span>
          <van-stepper
            v-model="step"
            min="0"
            :class="{ hide: step === 0 }"
            :name="item.id"
            @change="onChange"
          />
        </span>
      </p>
      <p class="size">
        <van-tag v-if="item.prescriptionFlag">处方药</van-tag>
        <span>{{ item.specs }}</span>
      </p>
      <p class="price">￥{{ item.amount }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  padding: 15px 0;
  .img {
    width: 80px;
    height: 70px;
    border-radius: 2px;
    overflow: hidden;
  }
  .info {
    padding-left: 15px;
    width: 250px;
    .name {
      display: flex;
      font-size: 15px;
      margin-bottom: 5px;
      > span:first-child {
        // width: 200px;
        // width: 300px;
        width: 40vw;
      }
      > span:last-child {
        // width: 50px;
        text-align: right;
      }
    }
    .size {
      margin-bottom: 5px;
      .van-tag {
        background-color: var(--cp-primary);
        vertical-align: middle;
      }
      span:not(.van-tag) {
        margin-left: 10px;
        color: var(--cp-tag);
        vertical-align: middle;
      }
    }
    .price {
      font-size: 16px;
      color: #eb5757;
    }
  }
  .desc {
    width: 100%;
    background-color: var(--cp-bg);
    border-radius: 4px;
    margin-top: 10px;
    padding: 4px 10px;
    color: var(--cp-tip);
  }
}

.van-stepper {
  position: absolute;
  right: 0;
  bottom: 15px;
  :deep() {
    .van-stepper__input {
      background: none;
    }
    .van-stepper__minus {
      background-color: #fff;
      border: 0.5px solid #16c2a3;
    }
    .van-stepper__plus {
      background-color: #eaf8f6;
    }
    .van-stepper__minus,
    .van-stepper__plus {
      width: 20px;
      height: 20px;
    }
  }
  &.hide {
    :deep() {
      .van-stepper__minus,
      .van-stepper__input {
        visibility: hidden;
      }
    }
  }
}
</style>
