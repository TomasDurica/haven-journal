<script setup lang="ts">
const modelValue = defineModel<string>()
</script>

<template>
  <div class="flex justify-center">
    <div class="relative">
      <input
        v-model="modelValue"
        class="ring-(1 neutral-500) focus:ring-(2 neutral-300) outline-none rounded-2 bg-transparent pa-1"
        type="text"
        v-bind="$attrs"
      />
      <button
        @click="modelValue = ''"
        class="i-mdi-close h-full aspect-1 min-w-6 absolute right-1"
      />
    </div>
  </div>
</template>

<style scoped>

</style>