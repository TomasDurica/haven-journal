// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:[
    '@unocss/reset/tailwind.css'
  ],
  devtools: {
    enabled: true
  },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],
  nitro: {
    static: true,
  },
  vue: {
    defineModel: true,
    propsDestructure: true,
  }
})