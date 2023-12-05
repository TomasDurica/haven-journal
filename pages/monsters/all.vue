<script setup lang="ts">
import { DialogFullscreen } from '#components'

const scenarios = await useScenarios()
const monsters = await useAllMonsters()

const menu = ref<typeof DialogFullscreen>()

</script>

<template>
  <header class="sticky top-0 z-10 bg-dark-800 pb-4 shadow-sm shadow-dark-50">
    <div class="absolute left-2 top-4 z-20 grid place-items-center bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-apps" @click="menu.open()" />
    </div>

    <scenario-header name="All monsters" />
  </header>

  <main>
    <monster-list-item v-for="name in monsters" :name="name" :key="name" />
  </main>

  <dialog-fullscreen ref="menu" class="bg-dark-800" v-slot="{ resolve }">
    <div class="fixed grid place-items-center left-2 top-4 z-20 bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-close" @click="resolve()" />
    </div>

    <main-menu />
  </dialog-fullscreen>
</template>