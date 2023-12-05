<script setup lang="ts">

const scenarios = await useScenarios()

const filter = ref<string>('')

const filteredScenarios = computed(() => {
  return toValue(scenarios).filter(scenario => scenario.slug?.includes(toValue(filter)))
})

</script>

<template>
  <div class="text-center text-8 relative pt-4">
    Party
  </div>

  <character-list />

  <div class="sticky top-0 z-10 bg-dark-800 pb-4 shadow-sm shadow-dark-50">
    <div class="text-center text-8">
      Select scenario
    </div>
    <input-text
        v-model="filter"
        pattern="[0-9]*"
        inputmode="numeric"
        placeholder="Filter"
    />
  </div>

  <scenario-list :scenarios="filteredScenarios" />

  <hr class="b-dark-50" />

  <div class="flex gap-2 justify-center py-4">
    <a class="px-4 color-yellow" href="/monsters/all">All monsters</a>
    <a class="px-4 color-yellow" href="/monsters/favorites">Favorites</a>
  </div>

</template>