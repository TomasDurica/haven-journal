export type AttackModifier = {
  type: 'pierce' | 'pull' | 'push' | 'target',
  value: number
} | {
  type: 'condition',
  value: 'bane' | 'brittle' | 'curse' | 'disarm' | 'immobilize' | 'muddle' | 'poison' | 'stun' | 'wound'
}

type Immunity = 'bane' | 'brittle' | 'curse' | 'disarm' | 'immobilize' | 'muddle' | 'poison' | 'push' | 'pull' | 'stun' | 'wound'

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
}

type MonsterResult = {
  flying: boolean,
  name: string,
  catchable: boolean,
  normal?: MonsterLevel,
  elite?: MonsterLevel,
  boss?: MonsterLevel,
}

export const useMonster = async (name: string, scenarioLevel: number) => {
  const { data } = await useAsyncData<Monster>(name, () => queryContent('monsters', name).findOne() as unknown as Promise<Monster>)

  return computed(() => {
    const monster = toValue(data)

    if (!monster) {
      return { name, flying: false, catchable: false } as MonsterResult
    }

    return {
      name: monster.name,
      flying: monster.flying,
      catchable: monster.catchable,
      normal: monster.normal?.[scenarioLevel],
      elite: monster.elite?.[scenarioLevel],
      boss: monster.boss?.[scenarioLevel],
    } as MonsterResult
  })
}