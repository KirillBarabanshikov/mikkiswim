// @ts-ignore
import '@splidejs/vue-splide/css/core' // Import Splide CSS

import Splide from '@splidejs/vue-splide'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Splide) // Register Splide as a Vue plugin
})
