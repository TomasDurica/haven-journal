<script setup lang="ts">
import { DialogFullscreen } from '#components'

const scenarios = await useScenarios()
const monsters = await useAllMonsters()

const menu = ref<typeof DialogFullscreen>()
const { favorites, isFavorite } = useFavoriteMonsters()

</script>

<template>
  <header class="sticky top-0 z-10 bg-dark-800 pb-4 shadow-sm shadow-dark-50">
    <div class="absolute left-2 top-4 z-20 grid place-items-center bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-apps" @click="menu.open()" />
    </div>

    <scenario-header name="Favorites" />
  </header>

  <main>
    <template v-for="name in monsters" :key="name">
      <monster-list-item class="hidden" :name="name" />
    </template>

    <client-only>
      <template v-for="name in favorites" :key="name">
        <monster-list-item :name="name" />
      </template>
    </client-only>

    <client-only>
      <div v-if="!favorites.length" class="grid place-items-center py-8 text-dark-50">
        No monsters found
      </div>
    </client-only>
  </main>

  <dialog-fullscreen ref="menu" class="bg-dark-800" v-slot="{ resolve }">
    <div class="fixed grid place-items-center left-2 top-4 z-20 bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-close" @click="resolve()" />
    </div>

    <main-menu />
  </dialog-fullscreen>
</template>