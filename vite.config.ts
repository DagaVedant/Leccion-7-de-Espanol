import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Leccion-7-de-Espanol/', // must match your repo name exactly
})