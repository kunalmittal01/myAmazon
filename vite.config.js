import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/create-checkout-session': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/create-checkout-session/, '/create-checkout-session'),
  //     },
  //   },
  // },
})