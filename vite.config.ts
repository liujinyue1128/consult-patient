import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// vant解析器
import { VantResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
    host: true
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    // 自动导入的插件，解析器可以是 vant element and-vue

    Components({
      dts: false, // 接触自动生成组件类型文件
      // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
      resolvers: [VantResolver({ importStyle: false })] // 不自动导入样式，防止样式重复
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  // base: '/', // 这就是router文件中baseURL属性的来源
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
