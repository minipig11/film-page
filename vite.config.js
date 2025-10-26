import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue3-video-play': path.resolve(__dirname, './vue3-video-play-main/lib/index.js')
    }
  },
  optimizeDeps: {
    include: ['throttle-debounce', 'hls.js']
  },
  build: {
    chunkSizeWarningLimit: 1000, // 增加警告限制到 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          'video-player': ['./vue3-video-play-main/lib/index.js'],
          'vendor': ['vue', 'vue-router'],
          'media': ['hls.js', 'throttle-debounce']
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/api': 'https://dayofaicurriculum.oss-cn-shenzhen.aliyuncs.com'
    }
  }
})
