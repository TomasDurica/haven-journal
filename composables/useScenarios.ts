export type Scenario = {
  number: number | null,
  slug: string,
  link: string,
  name: string,
  complexity: 1 | 2 | 3 | null,
  monsters: string[],
}

type Scenarios = { body: Scenario[] }

export const useScenarios = async () => {
  const { data } = await useAsyncData<Scenarios>('' +
    'frosthaven/scenarios',
    () => queryContent('frosthaven', 'scenarios', 'scenarios').findOne() as unknown as Promise<Scenarios>
  )

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