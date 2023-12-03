<script setup lang="ts">
import { DialogFullscreen } from '#components'

const { params: { scenario: slug } } = useRoute()

const scenarios = await useScenarios()
const scenario = await useScenario(slug as string)

const menu = ref<typeof DialogFullscreen>()

</script>

<template>
  <header class="sticky top-0 z-10 bg-dark-800 pb-4 shadow-sm shadow-dark-50">
    <div class="absolute left-2 top-4 z-20 grid place-items-center bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-apps" @click="menu.open()" />
    </div>

    <scenario-header :scenario="scenario" />

    <div class="absolute top-6.5 right-4 z-20 grid place-items-center b-2 rounded-full w-7 h-7 bg-dark-800">
      <span class="text-3 font-bold">{{ scenario.link }}</span>
    </div>
  </header>

  <main>
    <monster-list-item v-for="name in scenario.monsters" :name="name" :key="name" />
  </main>

  <dialog-fullscreen ref="menu" class="bg-dark-800" v-slot="{ resolve }">
    <div class="fixed grid place-items-center left-2 top-4 z-20 bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-close" @click="resolve()" />
    </div>

    <main-menu />
  </dialog-fullscreen>
</template>