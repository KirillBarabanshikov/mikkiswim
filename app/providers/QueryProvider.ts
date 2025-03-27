import { VueQueryPlugin } from '@tanstack/vue-query'

import { queryClient } from '~/share/query'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
})
