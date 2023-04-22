import {
  defineConfig,
  presetAttributify,
  presetTagify,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetTagify(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        times: ['Times']
      }
    }),
    presetAttributify()
  ],
  transformers: [
    transformerVariantGroup()
  ],
  theme: {
    colors: {
      primary: '#1677ff',
      footer: '#2b3137'
    },
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    }
  },
  shortcuts: {
    'pos-center': 'relative left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
    'pos-center-x': 'relative left-[50%] -translate-x-[50%]',
    'pos-center-y': 'relative top-[50%] -translate-y-[50%]',
    'flex-center': 'flex justify-center items-center',
    'full-screen': 'w-screen h-screen'
  },
  rules: [
    [
      'content-h', {
        'min-height': 'calc(100vh - 160px)'
      }
    ],
    [
      'main-section-h', {
        height: 'calc(100vh - 80px)'
      }
    ]
  ],
  safelist: [
    'ml'
  ]
})
