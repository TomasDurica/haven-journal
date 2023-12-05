import { useLocalStorage } from '@vueuse/core'
import type { NuxtApp } from '#app'

export type AttackModifier = {
  type: 'pierce' | 'pull' | 'push' | 'target',
  value: number
} | {
  type: 'condition',
  value: 'bane' | 'brittle' | 'curse' | 'disarm' | 'immobilize' | 'muddle' | 'poison' | 'stun' | 'wound'
}

type Immunity = 'bane' | 'brittle' | 'curse' | 'disarm' | 'immobilize' | 'muddle' | 'poison' | 'push' | 'pull' | 'stun' | 'wound'

type Card = {
  name: string,
  initiative: number,
  image: string
}

type MonsterLevel = {
  health: number,
  shield: number,
  retaliate: {
    range: number,
    value: number,
  },
  movement: number,
  attack: number,
  attackModifiers: AttackModifier[],
  immunities: Immunity[]
}

type MonsterVariant = Record<number, MonsterLevel>

type Monster = {
  flying: boolean,
  name: string,
  catchable: boolean,
  normal?: MonsterVariant,
  elite?: MonsterVariant,
  boss?: MonsterVariant,
  deck: string[],
  image: string
}

type Deck = Card[]

export type MonsterResult = {
  name: string,
  image: string,
  flying: boolean,
  catchable: boolean,
  normal?: MonsterLevel,
  elite?: MonsterLevel,
  boss?: MonsterLevel,
  deck: {
    size: number,
    unlocked: Card[]
  },
  addCard: (card: number) => void
}

const queryMonster = async (name: string) => {
  const { data } = await useAsyncData<Monster>(
    `frosthaven/monsters/${name}`,
    () => queryContent('frosthaven', 'monsters', name).findOne() as unknown as Promise<Monster>
  )

  return toValue(data)!
}

const queryDeck = async (name: string[]) => {
  const [edition, ...path] = name

  const { data } = await useAsyncData<{ body: Deck }>(
    name.join('/'),
    () => queryContent(edition, ...path).findOne() as unknown as Promise<{ body: Deck }>
  )

  return toValue(data)!.body
}

const useDeck = async (nuxtApp: NuxtApp, name: string[]) => {
  console.log(name)

  if (!name.length) {
    console.log('no name')
    return {
      deck: {
        size: 0,
        unlocked: []
      },
      addCard: (_: number) => {}
    }
  }

  const deck = await nuxtApp.runWithContext(() => queryDeck(name))
  const unlocked = useLocalStorage<number[]>(`${name.join('/')}`, [])

  const addCard = (card: number) => {
    if (isNaN(card)) {
      return
    }

    if (toValue(unlocked).includes(card)) {
      return
    }

    if (!deck.find(({ initiative }) => initiative === card)) {
      return
    }

    unlocked.value = [...toValue(unlocked), card]
  }

  return {
    deck: {
      size: deck.length,
      unlocked: deck.filter(({ initiative }) => toValue(unlocked).includes(initiative))
    },
    addCard
  }
}

export const useMonster = async (name: string, scenarioLevel: number) => {
  const nuxtApp = useNuxtApp()

  const monster = await nuxtApp.runWithContext(() => queryMonster(name))
  const deck = await useDeck(nuxtApp, monster.deck)

  return computed(() => {
    if (!monster) {
      return { name, flying: false, catchable: false } as MonsterResult
    }

    return {
      name: monster.name,
      image: monster.image,
      flying: monster.flying,
      catchable: monster.catchable,
      normal: monster.normal?.[scenarioLevel],
      elite: monster.elite?.[scenarioLevel],
      boss: monster.boss?.[scenarioLevel],
      ...deck
    } as MonsterResult
  })
}