// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:[
    '@unocss/reset/tailwind.css'
  ],
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],
  devtools: {
    enabled: true
  },
  nitro: {
    static: true,
  }
})