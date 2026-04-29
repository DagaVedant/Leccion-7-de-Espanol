import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: '/Leccion-7-de-Espanol/',  // must match your repo name exactly
  plugins: [react()],
})