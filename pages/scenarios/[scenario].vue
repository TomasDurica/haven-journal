<script setup lang="ts">
import { DialogFullscreen } from '#components'

const { params: { scenario: slug } } = useRoute()

const scenarios = await useScenarios()
const scenario = await useScenario(slug as string)

const menu = ref<typeof DialogFullscreen>()

</script>

<template>
  <header>
    <div class="absolute grid place-items-center left-2 top-4 bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-apps" @click="menu.open()" />
    </div>

    <scenario-header :scenario="scenario" />

    <div class="grid place-items-center b-2 rounded-full w-7 h-7 absolute top-6.5 right-4 bg-dark-800">
      <span class="text-3 font-bold">{{ scenario.link }}</span>
    </div>
  </header>

  <main>
    <monster-list-item v-for="name in scenario.monsters" :name="name" :key="name" />
  </main>

  <dialog-fullscreen v-slot="{ resolve }" ref="menu" class="bg-dark-800">
    <div class="fixed grid place-items-center left-2 top-4 z-20 bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-close" @click="resolve()" />
    </div>

    <main-menu />
  </dialog-fullscreen>
</template>