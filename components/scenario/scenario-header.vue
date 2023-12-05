<script setup lang="ts">
  const { name } = defineProps<{ name: string }>()
  const { difficulty, trapDamage, hazardDamage } = useScenarioLevel()

  const scenarioNameSize = computed(() => {
    if (name.length > 16) {
      return 'text-6'
    }

    return 'text-8'
  })

</script>

<template>
  <div>
    <div class="text-center" :class="scenarioNameSize">
      {{ name }}
    </div>

    <div class="text-4 flex flex-row gap-4 justify-center">
      <div class="flex gap-2">
        <div class="i-fh-level h-6 w-6"/>
        <span>
          <client-only> {{ difficulty }} </client-only>
        </span>
      </div>
      <div class="flex gap-2">
        <div class="i-fh-trap h-6 w-6"/>
        <span>
          <client-only> {{ trapDamage }} </client-only>
        </span>
      </div>
      <div class="flex gap-2">
        <div class="i-fh-hazard h-6 w-6"/>
        <span>
          <client-only> {{ hazardDamage }} </client-only>
        </span>
      </div>
    </div>
  </div>
</template>