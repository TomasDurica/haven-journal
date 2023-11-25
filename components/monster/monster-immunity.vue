<script setup lang="ts">

const immunities = {
  bane: 'i-fh-bane',
  brittle: 'i-fh-brittle',
  curse: 'i-fh-curse',
  disarm: 'i-fh-disarm',
  immobilize: 'i-fh-immobilize',
  impair: 'i-fh-impair',
  muddle: 'i-fh-muddle',
  pierce: 'i-fh-pierce',
  poison: 'i-fh-poison',
  pull: 'i-fh-pull',
  push: 'i-fh-push',
  stun: 'i-fh-stun',
  wound: 'i-fh-wound'
}

const { immunity } = defineProps<{
  immunity: keyof typeof immunities
}>()

</script>

<template>
  <div class="w-4 h-4 my-.25 relative" :class="immunities[immunity]">
    <div class="absolute bottom-0 right-0 i-mdi-close-circle text-red w-1.5 h-1.5" />
  </div>
</template>