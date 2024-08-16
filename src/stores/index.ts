import { createPinia } from 'pinia'
// 1. 创建pinia实例，使用pinia插件
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia
export * from './modules/user' // 更简洁的将文件导出
export * from './modules/consult'
