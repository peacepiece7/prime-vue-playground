import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sass from 'sass-embedded'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Sass에서 사용할 옵션을 설정할 수 있습니다.
        implementation: sass,
        additionalData: `$base-color: #3498db;`, // 전역 변수를 정의
      },
    },
  },
})
