import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    react(),
    UnoCSS()
  ],
  server: {
    port: 3333
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      'hooks': resolve(__dirname, 'src/hooks')
    },
    extensions: ['.js', '.json']
  }
})
