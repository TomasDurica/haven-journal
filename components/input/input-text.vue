<script setup lang="ts">

const { modelValue } = defineProps<{
  modelValue: string | undefined
}>()

const emits = defineEmits<{
  'update:modelValue': [value: string]
}>()

const updateValue = (value: string) => {
  emits('update:modelValue', value)
}

</script>

<template>
  <div class="flex justify-center">
    <div class="relative">
      <input
        class="ring-(1 neutral-500) focus:ring-(2 neutral-300) outline-none rounded-2 bg-transparent pa-1"
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        @click="updateValue('')"
        class="i-mdi-close h-full aspect-1 min-w-6 absolute right-1"
      />
    </div>
  </div>
</template>

<style scoped>

</style>