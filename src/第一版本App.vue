<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useUserStore } from './stores'
const userUserStrore = useUserStore()
import { request } from './utils/request.ts'
const getUser = () => {
  request('patient/myUser', 'get', { test: 1 })
  // axios.request({
  //   url: 'patient/myUser',
  //   method: 'get'
  // })
}
const login = () => {
  try {
    request('login/password', 'post', {
      mobile: '13211112222',
      password: 'abc12345'
    })
    // axios.request({
    //   url: 'login/password',
    //   method: 'post',
    //   data: {
    //     mobile: '13211112222',
    //     password: 'abc12345'
    //   }
    // })
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <van-button type="primary">案例1：试用vant按钮</van-button>
  <div class="main">设置全局样式</div>
  <!-- 案例2 -->
  <h1>用户信息： {{ userUserStrore.user }}</h1>
  <van-button
    @click="
      userUserStrore.setUser({
        id: '11',
        avator: '照片',
        account: '账户',
        mobile: '13213123',
        token: 1
      })
    "
    >登录用户信息</van-button
  >
  <van-button @click="userUserStrore.deleteUser">退出登录</van-button>
  <van-btton @click="getUser">获取用户信息</van-btton>
  <van-btton @click="login" type="danger">登录用户信息</van-btton>
  <RouterView />
</template>

<style scoped>
.main {
  /* 使用全局样式来设置样式 */
  color: var(--cp-primary);
}
</style>
