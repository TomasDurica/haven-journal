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

  <div class="sticky top-0 z-10 bg-dark-800 pa-4 shadow-sm shadow-dark-50">
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
</template>