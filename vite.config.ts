import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/PCMS/', // MUST match your repo name exactly
  build: {
    outDir: 'dist' // or 'build' if you prefer
  }
})