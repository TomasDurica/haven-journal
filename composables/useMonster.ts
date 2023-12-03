import { useLocalStorage } from '@vueuse/core'

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

type Deck = {
  abilities: Card[]
}

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

  const { data } = await useAsyncData<Deck>(
    name.join('/'),
    () => queryContent(edition, ...path).findOne() as unknown as Promise<Deck>
  )

  return toValue(data)!
}

export const useMonster = async (name: string, scenarioLevel: number) => {
  const nuxtApp = useNuxtApp()

  const monster = await nuxtApp.runWithContext(() => queryMonster(name))
  const deck = await nuxtApp.runWithContext(() => queryDeck(monster.deck))

  const unlocked = useLocalStorage<number[]>(`${monster.deck.join('/')}`, [])

  const addCard = (card: number) => {
    if (isNaN(card)) {
      return
    }

    if (toValue(unlocked).includes(card)) {
      return
    }

    if (!deck.abilities.find(({ initiative }) => initiative === card)) {
      return
    }

    unlocked.value = [...toValue(unlocked), card]
  }

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
      deck: {
        size: deck.abilities.length,
        unlocked: deck.abilities.filter(({ initiative }) => toValue(unlocked).includes(initiative))
      },
      addCard
    } as MonsterResult
  })
}