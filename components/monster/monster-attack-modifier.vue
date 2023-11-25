<script setup lang="ts">

import type { AttackModifier } from '~/composables/useMonster'

const modifiers = {
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
  target: 'i-fh-target',
  wound: 'i-fh-wound'
}

const { modifier } = defineProps<{
  modifier: AttackModifier
}>()

</script>

<template>
  <div
    v-if="modifier.type === 'condition'"
    class="w-4 h-4 my-.25"
    :class="modifiers[modifier.value]"
  />
  <div
    v-else
    class="flex flex-row items-center gap-1 bg-dark-200 rounded-full px-1"
    v-bind="$attrs"
  >
    <div
      class="w-3 h-3"
      :class="modifiers[modifier.type]"
    />
    <div>{{ modifier.value }}</div>
  </div>
</template>