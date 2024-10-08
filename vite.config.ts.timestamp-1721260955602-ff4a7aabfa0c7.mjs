// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/project/container-painent/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/project/container-painent/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/project/container-painent/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevTools from "file:///D:/project/container-painent/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Components from "file:///D:/project/container-painent/node_modules/unplugin-vue-components/dist/vite.js";
import { createSvgIconsPlugin } from "file:///D:/project/container-painent/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import { VantResolver } from "file:///D:/project/container-painent/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///D:/project/container-painent/vite.config.ts";
var vite_config_default = defineConfig({
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
      dts: false,
      // 接触自动生成组件类型文件
      // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
      resolvers: [VantResolver({ importStyle: false })]
      // 不自动导入样式，防止样式重复
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), "src/icons")]
    })
  ],
  // base: '/', // 这就是router文件中baseURL属性的来源
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXGNvbnRhaW5lci1wYWluZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXGNvbnRhaW5lci1wYWluZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L2NvbnRhaW5lci1wYWluZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuLy8gdmFudFx1ODlFM1x1Njc5MFx1NTY2OFxuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgwLFxuICAgIGhvc3Q6IHRydWVcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLFxuICAgIFZ1ZURldlRvb2xzKCksXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3Njg0XHU2M0QyXHU0RUY2XHVGRjBDXHU4OUUzXHU2NzkwXHU1NjY4XHU1M0VGXHU0RUU1XHU2NjJGIHZhbnQgZWxlbWVudCBhbmQtdnVlXG5cbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGR0czogZmFsc2UsIC8vIFx1NjNBNVx1ODlFNlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1N0VDNFx1NEVGNlx1N0M3Qlx1NTc4Qlx1NjU4N1x1NEVGNlxuICAgICAgLy8gXHU1MzlGXHU1NkUwXHVGRjFBVG9hc3QgQ29uZmlybSBcdThGRDlcdTdDN0JcdTdFQzRcdTRFRjZcdTc2ODRcdTY4MzdcdTVGMEZcdThGRDhcdTY2MkZcdTk3MDBcdTg5ODFcdTUzNTVcdTcyRUNcdTVGMTVcdTUxNjVcdUZGMENcdTY4MzdcdTVGMEZcdTUxNjhcdTVDNDBcdTVGMTVcdTUxNjVcdTRFODZcdUZGMENcdTUxNzNcdTk1RURcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcbiAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcih7IGltcG9ydFN0eWxlOiBmYWxzZSB9KV0gLy8gXHU0RTBEXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU2ODM3XHU1RjBGXHVGRjBDXHU5NjMyXHU2QjYyXHU2ODM3XHU1RjBGXHU5MUNEXHU1OTBEXG4gICAgfSksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XHVGRjBDXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHVGRjA4Tk9ERVx1NEVFM1x1NzgwMVx1RkYwOVxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9pY29ucycpXVxuICAgIH0pXG4gIF0sXG4gIC8vIGJhc2U6ICcvJywgLy8gXHU4RkQ5XHU1QzMxXHU2NjJGcm91dGVyXHU2NTg3XHU0RUY2XHU0RTJEYmFzZVVSTFx1NUM1RVx1NjAyN1x1NzY4NFx1Njc2NVx1NkU5MFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0USxTQUFTLGVBQWUsV0FBVztBQUUvUyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sVUFBVTtBQUVqQixTQUFTLG9CQUFvQjtBQVZ3SSxJQUFNLDJDQUEyQztBQVl0TixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBO0FBQUEsSUFHWixXQUFXO0FBQUEsTUFDVCxLQUFLO0FBQUE7QUFBQTtBQUFBLE1BRUwsV0FBVyxDQUFDLGFBQWEsRUFBRSxhQUFhLE1BQU0sQ0FBQyxDQUFDO0FBQUE7QUFBQSxJQUNsRCxDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsV0FBVyxDQUFDO0FBQUEsSUFDckQsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
