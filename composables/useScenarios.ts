export type Scenario = {
  number: number | null,
  slug: string,
  link: string,
  name: string,
  complexity: 1 | 2 | 3 | null,
  monsters: string[],
}

export const useScenarios = async () => {
  const { data } = await useAsyncData<{ body: Scenario[] }>('scenarios', () => queryContent('scenarios').findOne() as unknown as Promise<{ body: Scenario[] }>)

  return computed(() => toValue(data)?.body ?? [])
}

export const useScenario = async (slug: string) => {
  const scenarios = await useScenarios()

  return computed(() => toValue(scenarios).find(scenario => scenario.slug === slug) ?? {
    number: null,
    slug,
    link: '',
    name: '',
    complexity: null,
    monsters: [],
  })
}