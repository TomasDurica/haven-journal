<script setup lang="ts">
  import type { Scenario } from '~/composables/useScenarios'

  const { scenario } = defineProps<{ scenario: Scenario }>()
  const { difficulty, trapDamage, hazardDamage } = useScenarioLevel()

  const scenarioNameSize = computed(() => {
    if (scenario.name.length > 16) {
      return 'text-6'
    }

    return 'text-8'
  })

</script>

<template>
  <div>
    <div class="text-center" :class="scenarioNameSize">
      {{ scenario.name }}
    </div>

    <div class="text-4 flex flex-row gap-4 justify-center">
      <div class="flex gap-2">
        <div class="i-fh-level h-6 w-6"/>
        <client-only>
          <span>{{ difficulty }}</span>
        </client-only>
      </div>
      <div class="flex gap-2">
        <div class="i-fh-trap h-6 w-6"/>
        <client-only>
          <span>{{ trapDamage }}</span>
        </client-only>
      </div>
      <div class="flex gap-2">
        <div class="i-fh-hazard h-6 w-6"/>
        <client-only>
          <span>{{ hazardDamage }}</span>
        </client-only>
      </div>
    </div>
  </div>
</template>