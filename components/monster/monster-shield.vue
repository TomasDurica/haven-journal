<script setup lang="ts">

const { shield } = defineProps<{
  shield: number
}>()

</script>

<template>
  <div
    v-if="shield"
    class="flex gap-.5 items-center bg-dark-200 rounded-full px-1"
  >
    <div class="i-fh-shield" />
    <span> {{ shield }} </span>
  </div>
</template>