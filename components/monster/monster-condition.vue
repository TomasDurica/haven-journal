<script setup lang="ts">

const conditions = {
  bane: 'i-fh-bane',
  brittle: 'i-fh-brittle',
  curse: 'i-fh-curse',
  disarm: 'i-fh-disarm',
  immobilize: 'i-fh-immobilize',
  impair: 'i-fh-impair',
  muddle: 'i-fh-muddle',
  pierce: 'i-fh-pierce',
  poison: 'i-fh-poison',
  stun: 'i-fh-stun',
  wound: 'i-fh-wound'
}

const { condition } = defineProps<{
  condition: keyof typeof conditions
}>()

</script>

<template>
  <div class="w-4 h-4 my-.25" :class="conditions[condition]" />
</template>