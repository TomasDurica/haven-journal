<script setup lang="ts">
  import type { DialogFullscreen } from '#components'

  const { name } = defineProps<{
    name: string
  }>()

  const { difficulty } = useScenarioLevel()
  const monster = await useMonster(name, toValue(difficulty))

  const dialog = ref<typeof DialogFullscreen>()

  const openDialog = async () => {
    if (!toValue(monster).deck.size) {
      return
    }

    await toValue(dialog).open()
  }

</script>

<template>
  <section class="py-4 b-b-1 b-dark-400 space-y-2">
    <div class="flex gap-2">
      <div v-if="monster.normal" class="flex-1 flex flex-col items-end text-3">
        <div class="flex-1 flex gap-2 items-end pb-1">
          <client-only>
            <monster-immunity v-for="immunity in monster.normal.immunities" :key="immunity" :immunity="immunity" />
          </client-only>
        </div>
        <div class="flex gap-2 items-center">
          <client-only>
            <monster-shield :shield="monster.normal.shield" />
            <monster-retaliate :value="monster.normal.retaliate.value" :range="monster.normal.retaliate.range" />
          </client-only>
          <div class="flex gap-.5 items-center">
            <div>
              <client-only fallback="&nbsp;"> {{ monster.normal.health }} </client-only>
            </div>
            <div class="i-fh-hp" />
          </div>
        </div>
        <div class="flex gap-.5 items-center">
          <div>
            <client-only fallback="&nbsp;"> {{ monster.normal.movement }} </client-only>
          </div>
          <div :class="monster.flying ? 'i-fh-fly' : 'i-fh-move '" />
        </div>
        <div class="flex gap-.5 items-center">
          <div>
            <client-only fallback="&nbsp;"> {{ monster.normal.attack }} </client-only>
          </div>
          <div class="i-fh-attack" />
        </div>
        <div class="flex-1 flex gap-2 items-start pt-1">
          <client-only>
            <monster-attack-modifier v-for="modifier in monster.normal.attackModifiers" :key="modifier" :modifier="modifier" />
          </client-only>
        </div>
      </div>

      <div v-if="monster.boss" class="flex-1">

      </div>

      <div class="flex flex-col gap-2 justify-center relative">
        <button class="w-20 h-20 rounded-full overflow-clip relative" @click="openDialog">
          <img :src="monster.image" :alt="name" />
          <span
            v-if="monster.deck.size"
            class="absolute bottom-0 left-0 right-0 text-3 font-bold text-center bg-opacity-69 bg-dark-800"
          >
            <client-only fallback="0 / 8">
              {{ monster.deck.unlocked.length }} / {{ monster.deck.size }}
            </client-only>
          </span>
        </button>
        <div v-if="monster.catchable" class="absolute top-0 right-0 pa-1 bg-dark-200 rounded-full">
          <div class="i-mdi-bag-suitcase w-4 h-4 rotate-30 text-white" />
        </div>
        <div class="text-3 text-center max-w-20">{{ monster.name }}</div>
      </div>

      <div v-if="monster.elite" class="flex-1 flex flex-col items-start text-yellow text-3">
        <div class="flex-1 flex gap-2 items-end pb-1">
          <client-only>
            <monster-immunity v-for="immunity in monster.elite.immunities" :key="immunity" :immunity="immunity" />
          </client-only>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex gap-.5 items-center">
            <div class="i-fh-hp" />
            <div>
              <client-only fallback="&nbsp;"> {{ monster.elite.health }} </client-only>
            </div>
          </div>
          <client-only>
            <monster-shield :shield="monster.elite.shield" />
            <monster-retaliate :value="monster.elite.retaliate.value" :range="monster.elite.retaliate.range" />
          </client-only>
        </div>
        <div class="flex gap-.5 items-center">
          <div :class="monster.flying ? 'i-fh-fly' : 'i-fh-move '" />
          <div>
            <client-only fallback="&nbsp;"> {{ monster.elite.movement }} </client-only>
          </div>
        </div>
        <div class="flex gap-.5 items-center">
          <div class="i-fh-attack" />
          <div>
            <client-only fallback="&nbsp;"> {{ monster.elite.attack }} </client-only>
          </div>
        </div>
        <div class="flex-1 flex gap-2 items-start pt-1">
          <client-only>
            <monster-attack-modifier v-for="modifier in monster.elite.attackModifiers" :key="modifier" :modifier="modifier" />
          </client-only>
        </div>
      </div>

      <div v-if="monster.boss" class="flex-1 flex flex-col items-start text-red text-3">
        <div class="flex-1 flex gap-2 items-end pb-1">
          <client-only>
            <monster-immunity v-for="immunity in monster.boss.immunities" :key="immunity" :immunity="immunity" />
          </client-only>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex gap-.5 items-center">
            <div class="i-fh-hp" />
            <div>
              <client-only> {{ monster.boss.health }} </client-only>
            </div>
          </div>
          <client-only>
            <monster-shield :shield="monster.boss.shield" />
            <monster-retaliate :value="monster.boss.retaliate.value" :range="monster.boss.retaliate.range" />
          </client-only>
        </div>
        <div class="flex gap-.5 items-center">
          <div :class="monster.flying ? 'i-fh-fly' : 'i-fh-move '" />
          <div>
            <client-only> {{ monster.boss.movement }} </client-only>
          </div>
        </div>
        <div class="flex gap-.5 items-center">
          <div class="i-fh-attack" />
          <div>
            <client-only> {{ monster.boss.attack }} </client-only>
          </div>
        </div>
        <div class="flex-1 flex gap-2 items-start pt-1">
          <client-only>
            <monster-attack-modifier v-for="modifier in monster.boss.attackModifiers" :key="modifier" :modifier="modifier" />
          </client-only>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-2 text-3">
      <client-only>
        <div
          v-for="{ initiative } in monster.deck.unlocked"
          class="flex gap-1 items-center bg-dark-200 rounded-full px-2"
        >
          {{ initiative }}
        </div>
      </client-only>
    </div>
  </section>

  <dialog-fullscreen ref="dialog" class="bg-dark-800" v-slot="{ resolve }">
    <div class="fixed grid place-items-center left-2 top-4 z-20 bg-dark-800 rounded-full pa-2 text-8">
      <button class="i-mdi-chevron-left" @click="resolve()" />
    </div>

    <monster-deck :monster="monster" />

  </dialog-fullscreen>
</template>
