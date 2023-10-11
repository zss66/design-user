import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'
import pxtorem from 'postcss-pxtorem'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({

  server: {
    // http://localhost:5173/api/login -> http://www.test.com/login
    proxy: {
      //api是自行设置的请求前缀，任何请求路径以/api开头的请求将被代理到对应的target目标
      //虚拟机·=ip  http://hadoop102:3000
      '/api': {
        target: "http://localhost:3000", //需要代理的域名，目标域名
        changeOrigin: true, //需要代理跨域
        rewrite: (path) => path.replace(/^\/api/, ''), //路径重写，把'/api'替换为''
      },
    },
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }

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
  })],
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 35, // 1rem，根据 设计稿宽度/10 进行设置
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  },




})
