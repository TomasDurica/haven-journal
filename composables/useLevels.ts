import { toRefs } from '@vueuse/core'

const levels = useLocalStorage('levels', [1, 1, undefined, undefined])
const players = computed(() => toValue(levels).filter(Boolean).length)

const scenario = computed(() => {
  const levelsValue = toValue(levels)
  const playersValue = toValue(players)

  const total = levelsValue.reduce((acc, e) => acc! + (e ?? 0), 0) as number
  const difficulty = Math.max(1, Math.ceil((total / playersValue) / 2)) || 1

  return {
    difficulty,
    remaining: difficulty * 2 * playersValue - total + 1,
    trapDamage: 2 + difficulty,
    hazardDamage: 1 + Math.ceil(difficulty / 3),
  }
})

export const usePlayerLevels = () => {
  return levels
}

export const useScenarioLevel = () => {
  return toRefs(scenario)
}