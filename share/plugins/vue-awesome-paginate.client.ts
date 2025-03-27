// import the package

// import the necessary css file
import 'vue-awesome-paginate/dist/style.css'

import VueAwesomePaginate from 'vue-awesome-paginate'

// Register the package

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAwesomePaginate)
})
