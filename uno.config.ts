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
        times: ['Times'],
        deyihei: ['Smiley Moon Regular']
      }
    }),
    presetAttributify()
  ],
  transformers: [
    transformerVariantGroup()
  ],
  theme: {
    colors: {
      primary: '#1677ff', // 主题色
      secondary: '#1E88E5', // 次要色
      footer: '#2b3137', // 主页底部色
      dark: '#001529', // 暗黑模式色
      darktext: 'rgba(255, 255, 255, 0.8)', // 暗黑模式文字色
      darkbg: '#212a3e', // 暗黑模式背景色
      lightbg: '#f5f6fb' // 浅色模式背景色
    },
    breakpoints: {
      xs: '320px',
      xm: '400px',
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
    'full-screen': 'w-screen h-screen',
    'theme-duration': 'transition duration-300 ease-in-out',
    'survey-item-bottom': 'flex items-center text-base theme-duration dark:(text-darktext hover:(text-primary))',
    'h-sreen': 'h-[100vh]',
    'wh-sreen': 'w-[100vw] h-[100vh]',
    'requred-tip': 'after:(content-["*"] ml1 text-red-500)',
    'question-border-hover': 'border-2 border-solid border-transparent hover:border-primary'
  },
  rules: [
    [
      'content-h', {
        'min-height': 'calc(100vh - 160px)'
      }
    ],
    [
      'min-section-h', {
        'min-height': 'calc(100vh - 80px)'
      }
    ],
    [
      'min-types-h', {
        height: 'calc(100vh - 105px)'
      }
    ],
    [
      'min-questions-h', {
        height: 'calc(100vh - 200px)'
      }
    ],
    [
      'min-content-h', {
        'min-height': 'calc(100vh - 120px)'
      }
    ],
    [
      'min-app-h', {
        'min-height': '100vh'
      }
    ],
    [
      'hover-box', {
        'box-shadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      }
    ]
  ],
  safelist: [
    'ml'
  ]
})
