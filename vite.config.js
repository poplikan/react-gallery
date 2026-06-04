import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Для личного сайта: https://username.github.io
  // Для сайта проекта: https://username.github.io/название-репозитория/
  base: '/poplikan.github.io/',
})