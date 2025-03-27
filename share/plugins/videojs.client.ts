import 'video.js/dist/video-js.css'

import VueVideoPlayer from '@videojs-player/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueVideoPlayer) // Register Splide as a Vue plugin
})
