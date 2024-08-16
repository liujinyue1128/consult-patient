<script setup lang="ts">
import RoomStatus from './components/roomStatus.vue'
import RoomAction from './components/roomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import io from 'socket.io-client'
import { onMounted, onUnmounted } from 'vue'
import { baseURL } from '@/utils/request.ts'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
const store = useUserStore()
const router = useRoute()
let socket
onMounted(() => {
  // 使用scocket技术，进行聊天需要先下载插件 npm i socket.io-client
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      // orderId: '6874484688306179'
      orderId: router.query.orderId
    }
  })
  socket.on('connect', () => {
    console.log('连接成功')
  })

  //   获取聊天记录，如果是第一次（默认聊天记录）
  socket.on('chatMsgList', (msg) => {
    console.log('服务器返回的消息---默认聊天记录', msg)
  })
  socket.on('disconnect', () => {
    console.log('连接关闭')
  })
  socket.on('error', () => {
    console.log('发生错误')
  })
})
onUnmounted(() => {
  socket.close()
})

// 测试用例
// socket.on('connect', () => {
//   // 建立连接成功
//   console.log('成功')
//   socket.emit('chat message', 'hello scoket')
// })
// socket.on('chat message', (msg) => {
//   console.log('接受消息', msg)
// })
// socket.on('diconnect', () => {
//   console.log('关闭连接')
// })
</script>
<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室"></cp-nav-bar>
    <!-- 状态栏 -->
    <room-status />
    <!-- 操作栏 -->
    <room-action />
    <!-- 消息栏 -->
    <room-message />
  </div>
</template>
<style scoped lang="scss">
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
