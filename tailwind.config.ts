import type { Config } from 'tailwindcss'

import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#0a4052',
        'main-200': '#0A4D5C',
        'main-300': '#1480A3',
        'main-white': '#b6f2f2',
        'main-green': '#038c65',
      },
    },
    screens: {
      '4xs': '340px',
      '3xs': '380px',
      '2xs': '400px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      mdlg: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1680px',
      '4xl': '1920px',
      '5xl': '2320px',
      '6xl': '2560px',
    },
  },
  darkMode: 'media',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: true,
      layout: {},
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#0388a6',
              foreground: '#000000',
            },
            focus: '#0388a6',
          },
          layout: {},
        },
        dark: {
          layout: {},
          colors: {
            primary: {
              DEFAULT: '#0388a6',
              foreground: '#000000',
            },
            focus: '#0388a6',
          },
        },
      },
    }),
  ],
}
export default config
