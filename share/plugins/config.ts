export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  return {
    provide: {
      apiUrl: config.public.API
    }
  }
})
