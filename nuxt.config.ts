/* eslint-disable quotes */

import vue from '@vitejs/plugin-vue'
import {
  metaConfig,
  type MODE,
  modulesConfig,
  scriptConfig
} from './app/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      meta: metaConfig(),
      script: scriptConfig(process.env.MODE as MODE)
    }
  },
  ssr: true,
  plugins: [
    { src: '~/app/providers/QueryProvider' },
    { src: '~/share/plugins/config.ts' }
  ],
  devtools: { enabled: true },
  modules: modulesConfig(process.env.MODE as MODE),
  storybook: {
    url: 'http://localhost:6006',
    storybookRoute: '/__storybook__',
    port: 6006,
    modules: {
      exclude: ['@nuxtjs/svg-sprite', 'nuxt-icons']
    }
  },

  pinia: {
    // autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
  },

  alias: {
    assets: '/<rootDir>/assets'
  },

  css: ['/app/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/app/assets/scss/variables.scss" as *;'
        }
      }
    }
  },

  build: {
    transpile: ['@vue/runtime-core', '@vue/runtime-dom', "@storybook-vue/nuxt"]
  },

  image: {
    screens: {
      xs: 320,
      sm: 440,
      md: 768,
      lg: 960,
      xl: 1260
    },
    quality: 70,
    format: ['avif', 'webp'],
    domains: ['api.itlabs.top'],
    densities: [1, 2],
    provider: 'ipx'
  },

  yandexMaps: {
    apikey: '3c893c7f-a06c-4af0-906f-79e9f2815e28'
  },

  runtimeConfig: {
    public: {
      API: process.env.API,
      BASE_URL: process.env.BASE_URL,
      MODE: process.env.MODE
    }
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  imports: {
    dirs: ['share/composables', 'share/utils']
  },

  components: {
    dirs: [
      {
        path: '~/share/UI',
        pathPrefix: false
      }
    ]
  },

  dir: {
    layouts: 'app/layouts',
    assets: 'app/assets',
    middleware: 'middleware',
    plugins: 'share/plugins'
  },

  compatibilityDate: '2025-02-14'
})
