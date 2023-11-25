<script setup lang="ts">

const { value, range } = defineProps<{
  value: number,
  range: number
}>()

</script>

<template>
  <div
    v-if="value"
    class="flex gap-1 items-center bg-dark-200 rounded-full px-1"
  >
    <div class="flex gap-.5 items-center">
      <div class="i-fh-retaliate" />
      <span> {{ value }} </span>
    </div>
    <div
      v-if="range"
      class="flex gap-.5 items-center"
    >
      <div class="i-fh-range" />
      <span> {{ range }} </span>
    </div>

  </div>
</template>