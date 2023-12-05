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

export type MonsterResult = {
  name: string,
  deck: string[],
  image: string,
  flying: boolean,
  catchable: boolean,
  normal?: MonsterLevel,
  elite?: MonsterLevel,
  boss?: MonsterLevel
}

const queryMonster = async (name: string) => {
  const { data } = await useAsyncData<Monster>(
    `frosthaven/monsters/${name}`,
    () => queryContent('frosthaven', 'monsters', name).findOne() as unknown as Promise<Monster>
  )

  return toValue(data)!
}

const queryAllMonsters = async () => {
  const { data } = await useAsyncData<{ body: string[] }>(
    `frosthaven/monsters/index`,
    () => queryContent('frosthaven', 'monsters', 'all').findOne() as unknown as Promise<{ body: string[] }>
  )

  return toValue(data)!.body
}

const queryDeck = async (name: string[]) => {
  const [edition, ...path] = name

  const { data } = await useAsyncData<{ body: Card[] }>(
    name.join('/'),
    () => queryContent(edition, ...path).findOne() as unknown as Promise<{ body: Card[] }>
  )

  return toValue(data)!.body
}

export const useDeck = async (name: string[]) => {
  if (!name.length) {
    return {
      deckSize: 0,
      unlocked: computed(() => [] as Card[]),
      unlockCard: (_: number) => {}
    }
  }

  const deck = await queryDeck(name)
  const unlocked = useLocalStorage<number[]>(`${name.join('/')}`, [])

  const unlockCard = (card: number) => {
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
    deckSize: deck.length,
    unlocked: computed(() => deck.filter(({ initiative }) => toValue(unlocked).includes(initiative)) as Card[]),
    unlockCard
  }
}

export const useMonster = async (name: string, scenarioLevel: number) => {
  const nuxtApp = useNuxtApp()

  const monster = await nuxtApp.runWithContext(() => queryMonster(name))

  return {
    name: monster.name,
    deck: monster.deck,
    image: monster.image,
    flying: monster.flying,
    catchable: monster.catchable,
    normal: monster.normal?.[scenarioLevel],
    elite: monster.elite?.[scenarioLevel],
    boss: monster.boss?.[scenarioLevel]
  } as MonsterResult
}

export const useAllMonsters = async () => {
  const nuxtApp = useNuxtApp()

  const monster = await nuxtApp.runWithContext(() => queryAllMonsters())

  return toValue(monster)
}

export const useFavoriteMonsters = () => {
  const favorites = useLocalStorage('frosthaven/monsters/_favorites', [] as string[])

  return {
    favorites: readonly(favorites),
    isFavorite: (name: string) => computed(() => toValue(favorites).includes(name)),
    removeFavorite: (name: string) => { favorites.value = toValue(favorites).filter(e => e !== name).sort() },
    addFavorite: (name: string) => { favorites.value = [name, ...toValue(favorites)].sort() },
  }
}