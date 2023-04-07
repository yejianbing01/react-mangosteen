import type { ConfigEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => ({
  base: '/react-mangosteen',
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
    }),
    svgsprites({ noOptimizeList: ['calendar', 'logo', 'chart', 'category', 'export', 'noty'] })
  ]
})
