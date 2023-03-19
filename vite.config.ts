import type { ConfigEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => ({
  define: {
    isDev: command === 'serve'
  },
  plugins: [
    UnoCSS(),
    react(),
    viteMockServe({
      // default
      mockPath: 'mock',
      localEnabled: command === 'serve',
    })
  ]
})
