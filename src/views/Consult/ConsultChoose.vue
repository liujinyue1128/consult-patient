<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import MedicineList from './compoents/MedicineList.vue'
import { useConsult } from '@/stores'
import MedicineCard from './compoents/MedicineCard.vue'
const consultStore = useConsult()
const totalPrice = computed(() => {
  return consultStore.consult.medicines
    ?.reduce((sum, item) => {
      return (sum += item.amount * +item.quantity)
    }, 0)
    .toFixed(2)
})
const cartLength = computed(() => consultStore.consult.medicines?.length) || 0
const searchValue = ref('')
const show = ref(false)
const step = ref(0)
const onSearch = (value: string) => {
  showToast(value)
  showToast('搜索中....')
}
const onCancel = (value: string) => {
  searchValue.value = ''
  showToast('取消')
}
const openCart = () => {
  if (!cartLength) return showToast('购物车为空,请选择药品')
  show.value = true
}
const clear = () => {
  consultStore.setMedicines([])
  show.value = false
}
</script>

<template>
  <div class="consult-choose-page">
    <cp-nav-bar title="选择药品"></cp-nav-bar>
    <van-search
      v-model="searchValue"
      show-action
      placeholder="搜一搜: 药品名称"
      @search="onSearch"
      @cancel="onCancel"
    />
    <MedicineList :keyword="searchValue" />
    <!-- 药品列表 -->
    <!-- <div class="medicine-list">
      <div class="item van-hairline--top" v-for="i in 20" :key="i">
        <img class="img" src="@/assets/ad.png" alt="" />
        <div class="info">
          <p class="name">
            <span>优赛明 维生素E乳 {{ i }}</span>
            <span>
              <van-stepper v-model="step" min="0" :class="{ hide: step == 0 }" />
            </span>
          </p>
          <p class="size">
            <van-tag>处方药</van-tag>
            <span>80ml</span>
          </p>
          <p class="price">￥25.00</p>
        </div>
      </div>
    </div> -->
    <van-action-bar>
      <van-action-bar-icon
        icon="cart-o"
        :badge="cartLength || ''"
        :color="cartLength ? '#323233' : '#eee'"
        @click="openCart"
      />
      <div class="total-price">￥ {{ totalPrice }}</div>
      <van-action-bar-button type="primary" text="申请开方" />
    </van-action-bar>
    <van-action-sheet v-model:show="show">
      <div class="content">
        <div class="content-header">
          <div class="content-header-left">
            <span>药品清单</span><span>共{{ cartLength }}件商品</span>
          </div>

          <div class="content-header-right" @click="clear">
            <van-icon name="delete-o" />
            <span>清空</span>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="medicine-list">
        <medicine-card
          v-for="item in consultStore.consult.medicines"
          :key="item.id"
          :item="item"
        ></medicine-card>
      </div>
      <van-action-bar>
        <van-action-bar-icon
          icon="cart-o"
          :color="cartLength > 0 ? '#323233' : '#eee'"
          :badge="cartLength === 0 ? '' : cartLength"
        />
        <div class="total-price">￥ {{ totalPrice }}</div>
        <van-action-bar-button type="primary" text="申请开方" />
      </van-action-bar>
    </van-action-sheet>
  </div>
</template>

<style scoped lang="scss">
.consult-choose-page {
  padding-top: 46px;
  .van-search {
    position: sticky;
    top: 46px;
    z-index: 10;
    background-color: #fff;
  }
  .van-action-bar {
    border-top: 1px solid rgba(237, 237, 237, 0.9);
    .total-price {
      width: 200px;
      font-size: 24px;
      line-height: 18px;
      font-weight: 700;
      color: #121826;
    }
  }
  .medicine-list {
    background-color: #fff;
    padding: 0 15px 45px;
    .item {
      display: flex;
      flex-wrap: wrap;
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
  .content {
    --content-height: 400px;
    --content-header-height: 25px;
    padding: 16px;
    height: var(--content-height);
    .content-header {
      position: sticky;
      top: 0px;
      z-index: 10;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--content-header-height);
      padding-bottom: 10px;
      &-left {
        span {
          font-size: 16px;
          color: #000000;
          margin-right: 10px;
        }
        span + span {
          font-size: 13px;
          color: var(--cp-primary);
        }
      }
      &-right {
        span {
          margin-left: 5px;
        }
      }
    }
    .medicine-list {
      padding-bottom: 45px;
    }
  }
}
</style>
