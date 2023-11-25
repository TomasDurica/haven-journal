<script setup lang="ts">
import { DialogModal } from '#components'

const range = (from: number, to: number) => {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}

const dialog = ref<typeof DialogModal<number>>()
const levels = usePlayerLevels()
const { difficulty, remaining } = useScenarioLevel()
const open = async (i: number) => {
  try {
    levels.value[i] = await toValue(dialog)?.open()
  } catch { }
}

</script>

<template>
  <div class="flex gap-4 justify-center pa-4">
    <button
      v-for="(level, i) in levels"
      :key="i"
      class="w-16 aspect-1 grid place-items-center b-4 rounded-full color-neutral-500 fill-neutral-200"
      :class="level ? 'b-neutral-200' : 'b-dashed b-neutral-500'"
      @click="open(i)"
    >
      <client-only>
        <template v-if="level">
          <svg viewBox="0 0 16 16">
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="10">{{ level }}</text>
          </svg>
        </template>
        <template v-else>
          <i class="i-mdi-plus w-4/5 h-4/5"> </i>
        </template>
      </client-only>
    </button>

    <div
      class="w-16 max-w-full aspect-1 grid place-items-center color-neutral-500 fill-neutral-200"
    >
      <svg viewBox="0 0 16 16">
        <text x="50%" y="0" dominant-baseline="hanging" text-anchor="middle" font-size="4">
          Difficulty
        </text>

        <client-only>
          <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="8">
            {{ difficulty }}
          </text>
          <text x="50%" y="98%" dominant-baseline="auto" text-anchor="middle" font-size="3" opacity=".4">
            {{ remaining }} lvl left
          </text>
        </client-only>
      </svg>
    </div>

    <dialog-modal
      ref="dialog" v-slot="{ resolve }"
      class="mt-4 bg-dark-600 pa-4 rounded-4 space-y-4 shadow-lg shadow-dark-300"
    >
      <div class="color-neutral-200 font-bold text-8 text-center">
        Select character level
      </div>

      <div class="grid grid-cols-5 gap-4 w-full">
        <button
          v-for="i in range(1, 9)"
          class="w-16 max-w-full aspect-1 grid place-items-center b-4 rounded-full fill-neutral-200 b-neutral-200"
          @click="resolve(i)"
        >
          <svg viewBox="0 0 16 16">
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="10">{{ i }}</text>
          </svg>
        </button>

        <button
          class="w-16 max-w-full aspect-1 grid place-items-center b-4 rounded-full color-red-400 b-red-400"
          @click="resolve(undefined)"
        >
          <i class="i-mdi-minus w-4/5 h-4/5"> </i>
        </button>
      </div>

    </dialog-modal>
  </div>
</template>
