export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.API
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
