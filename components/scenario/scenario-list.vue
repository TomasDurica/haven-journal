<script setup lang="ts">
import type { Scenario } from '~/composables/useScenarios'

const { scenarios } = defineProps<{
  scenarios: Scenario[]
}>()

</script>

<template>
  <nav
    v-if="scenarios.length"
    class="pa-4 mx-auto max-w-max pt-4 grid gap-4 grid-cols-5 justify-center place-items-center"
  >
    <a
      v-for="{ slug, link, complexity } in scenarios"
      :href="`/scenarios/${slug}`"
      class="w-16 max-w-full aspect-1 grid place-items-center b-4 rounded-full b-neutral-200 stroke-neutral-200 fill-neutral-200"
    >
      <svg viewBox="0 0 16 16" class="stroke-width-.5">
        <text x="50%" :y="complexity ? '45%' : '55%'" dominant-baseline="middle" text-anchor="middle" font-size="8" stroke="none">
          {{ link }}
        </text>
        <template v-if="complexity">
          <circle r="1" cx="5" cy="12.5" />
          <circle :fill="complexity < 2 ? 'none' : ''" r="1" cx="8" cy="12.5" />
          <circle :fill="complexity < 3 ? 'none' : ''" r="1" cx="11" cy="12.5" />
        </template>
      </svg>
    </a>
  </nav>
  <div v-if="!scenarios.length" class="grid place-items-center py-8 text-dark-50">
    <span> No scenarios found </span>
  </div>
</template>
