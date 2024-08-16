import { defineStore } from 'pinia'
import type { User } from '@/types/user.d.ts'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 1. 设置用户信息
    const user = ref<User>()

    // 2. 存储用户信息,登录后使用
    const setUser = (u: User) => {
      user.value = u
    }

    // 3. 删除用户信息，退出登录后使用
    const deleteUser = () => {
      user.value = undefined
    }

    return {
      user,
      setUser,
      deleteUser
    }
  },
  {
    persist: true // 开启数据持久化
  }
)
