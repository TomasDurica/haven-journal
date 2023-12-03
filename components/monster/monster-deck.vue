<script setup lang="ts">
  import type { MonsterResult } from '~/composables/useMonster'
  import type { DialogModal } from '#components'

  const { monster } = defineProps<{
    monster: MonsterResult
  }>()

  const dialog = ref<DialogModal>()
  const initiative = ref<number>()

  const monsterNameSize = computed(() => {
    if (monster.name.length > 16) {
      return 'text-6'
    }

    return 'text-8'
  })

  const openDialog = async () => {
    initiative.value = undefined
    try {
      const value = await toValue(dialog).open()
      monster.addCard(parseInt(value))
    } catch { }
  }

</script>

<template>
  <section>
    <header class="sticky top-0 z-10 bg-dark-800 pb-4 shadow-sm shadow-dark-50">
      <div class="text-center" :class="monsterNameSize">
        {{ monster.name }}
      </div>

      <div class="text-4 flex flex-row justify-around px-8">
        <div class="flex gap-2">
          <span>
            <client-only v-if="monster.normal"> {{ monster.normal.health }} </client-only>
          </span>
          <div class="i-fh-hp h-6 w-6"/>
          <client-only>
            <span v-if="monster.elite" class="text-yellow"> {{ monster.elite.health }} </span>
            <span v-if="monster.boss" class="text-red"> {{ monster.boss.health }} </span>
          </client-only>
        </div>
        <div class="flex gap-2">
          <span>
            <client-only v-if="monster.normal"> {{ monster.normal.movement }} </client-only>
          </span>
          <div v-if="monster.flying" class="i-fh-fly h-6 w-6"/>
          <div v-else class="i-fh-move h-6 w-6"/>
          <client-only>
            <span v-if="monster.elite" class="text-yellow"> {{ monster.elite.movement }} </span>
            <span v-if="monster.boss" class="text-red"> {{ monster.boss.movement }} </span>
          </client-only>
        </div>
        <div class="flex gap-2">
          <span>
            <client-only v-if="monster.normal"> {{ monster.normal.attack }} </client-only>
          </span>
          <div class="i-fh-attack h-6 w-6"/>
          <client-only>
            <span v-if="monster.elite" class="text-yellow"> {{ monster.elite.attack }} </span>
            <span v-if="monster.boss" class="text-red"> {{ monster.boss.attack }} </span>
          </client-only>
        </div>
      </div>
    </header>

    <div class="pb-20 pt-2">
      <client-only>
        <div
          v-for="{ name, initiative, image } in monster.deck.unlocked"
          :key="image"
          class="px-4 py-2"
        >
          <img :src="image" :alt="name" />
        </div>
      </client-only>
    </div>

    <button
      @click="openDialog"
      class="fixed left-1/2 translate-x--1/2 bottom-4 h-14 rounded-4 bg-amber px-4 flex items-center text-dark font-500 text-3.5 gap-2"
    >
      <span class="i-mdi-add w-6 h-6" />
      <span> Add ability card </span>
    </button>

    <dialog-modal
      ref="dialog"
      v-slot="{ resolve, reject }"
      class="mt-4 space-y-6"
    >
      <input-text
        autofocus
        v-model="initiative"
        pattern="[0-9]*"
        inputmode="numeric"
        placeholder="Initiative"
      />

      <div class="flex gap-2 justify-end">
        <button @click="reject" class="text-3.5 font-500 text-amber px-2">
          Cancel
        </button>
        <button @click="resolve(initiative)" class="text-3.5 font-500 text-amber px-2">
          Add card
        </button>
      </div>

    </dialog-modal>
  </section>
</template>
