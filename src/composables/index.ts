import { ref, onUnmounted } from 'vue'
import type { FollowType } from '@/types/consult'
import { followOrUnfollow } from '@/services/consult'

// 封装通用逻辑，关注
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
// 第三方登录-验证码
// import { showToast, type FormInstance } from 'vant'
// import { sendMobileCode } from '@/services/user'
// import type { CodeType } from '@/types/user'
// export const useSendMobileCode = (mobile: Ref<string>, type: CodeType = 'login') => {
//   const form = ref<FormInstance>()
//   const time = ref(0)
//   let timer: number
//   const onSend = async () => {
//     if (time.value > 0) return
//     await form.value?.validate('mobile')
//     await sendMobileCode(mobile.value, type)
//     showToast('发送成功')
//     time.value = 60
//     clearInterval(timer)
//     timer = setInterval(() => {
//       time.value--
//       if (time.value <= 0) clearInterval(timer)
//     }, 1000)
//   }
//   onUnmounted(() => {
//     clearInterval(timer)
//   })
//   return { form, time, onSend }
// }
