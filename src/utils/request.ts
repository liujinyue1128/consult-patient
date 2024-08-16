import axios from 'axios'
import { showToast } from 'vant'
import { useUserStore } from '../stores'
import router from '@/router'
export const baseURL = 'https://consult-api.itheima.net/'
// 1. 创建axios实例，设置基准地址和超时时间
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 1. 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    // 需要添加类型守卫：config.headers
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 2. 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 3. 处理业务失败
    if (res.data.code !== 10000) {
      // 错误提示，返回错误的promise
      showToast(res.data.message || '业务失败')
      return Promise.reject(res.data)
    }
    // 4. 摘取核心数据
    return res.data
  },
  (err) => {
    // 处理401状态
    if (err.response.status === 401) {
      // token失效，删除用户信息，跳转到登录页面,携带当前访问页面的地址（包含参数）
      const user = useUserStore()
      user.deleteUser()
      router.push({
        path: '/login',
        query: {
          returnUrl: router.currentRoute.value.fullPath
        }
      })
    }
    return Promise.reject(err)
  }
)

export default instance
// 封装请求接口工具（简洁版本的）
export const request = (url: string, method: Method = 'GET', submitData?: object) => {
  return instance.request({
    // 参数： 地址，请求方式，请求参数
    url,
    method,
    // get请求：params传参，其他请求：data传参
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
