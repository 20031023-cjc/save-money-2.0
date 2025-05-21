import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/save-money-2.0/',  // 这里填你的仓库名，必须以斜杠开头和结尾
  plugins: [react()],
})
