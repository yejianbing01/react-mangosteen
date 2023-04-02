import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'j-btn': 'w-100% bg-#5f34bf h-48px rounded-8px text-white',
    'j-bg': 'bg-gradient-to-t from-#8f4cd7 to-#5c33be',
    'j-form': 'px-16px flex flex-col children-flex children-flex-col gap-y-4px',
    'j-form-input': 'h-48px px-16px leading-32px py-8px b="#5C33BE" b-1 focus:shadow focus:shadow-inset rounded-8px text-18px'
  },
  rules: [
    ['h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }]
  ],
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ],
})
