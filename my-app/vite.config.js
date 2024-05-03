import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'
import pxtorem from 'postcss-pxtorem'
import { resolve } from 'path'
import VueDevTools from 'vite-plugin-vue-devtools'
// https://vitejs.dev/config/
export default defineConfig({

  base: "./",
  // server: {
  //   // http://localhost:5173/api/login -> http://www.test.com/login
  //   proxy: {
  //     //api是自行设置的请求前缀，任何请求路径以/api开头的请求将被代理到对应的target目标
  //     //虚拟机·=ip  http://hadoop102:3000
  //     '/api': {
  //       target: "http://121.36.193.95:3000", //需要代理的域名，目标域名
  //       changeOrigin: true, //需要代理跨域
  //       rewrite: (path) => path.replace(/^\/api/, '/api'), //路径重写，把'/api'替换为''
  //     },
  //   },
  // },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'comp': resolve(__dirname, 'src/components'),
      '/img': './src/assets'
    }

  },
  build: {
    minify: "terser",
    rollupOptions: {
      // ...

    },
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },


  optimizeDeps: {
    // 排除自定义元素的解析
    exclude: ['header-bar']
  }

  ,

  plugins: [vue({
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes('header-bar')
      }
    }
  }), Components({
    resolvers: [VantResolver()],
  }),
  VueDevTools({
    host: 'localhost', // 指定要打开的主机
    port: 8098, // 指定要打开的端口
    // appendTo: '#app', // 将 Vue Devtools 插件挂载到 id 为 `app` 的 DOM 元素上

    // features: {
    //   timeline: true, // 启用时间旅行功能
    //   performance: true // 启用性能监控功能
    // },
    // depth: 10, // 响应式数据的深度限制为 10 层
    // filters: {
    //   foo: true, // 显示名为 `foo` 的事件过滤器
    //   bar: false // 不显示名为 `bar` 的事件过滤器
    // },
    // timelineLimit: 100, // 时间旅行记录的限制为 100 条
    // openInEditorHost: 'myeditor://' // 指定打开编辑器的主机地址
  }),
  ],

  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 35, // 1rem，根据 设计稿宽度/10 进行设置
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        }),

      ]
    }
  },




})
