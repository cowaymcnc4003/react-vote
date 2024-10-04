import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-vote/', // GitHub Pages에서 사용하는 리포지토리 이름으로 교체
  server: {
    host: '0.0.0.0',
    port: 9780
  },
})
