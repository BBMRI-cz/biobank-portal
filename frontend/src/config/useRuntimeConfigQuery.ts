import { useQuery } from '@tanstack/react-query'

import { fetchRuntimeConfig } from './runtimeConfig'

export function useRuntimeConfigQuery(apiBaseUrl: string) {
  return useQuery({
    queryKey: ['config', apiBaseUrl],
    queryFn: () => fetchRuntimeConfig(apiBaseUrl),
    staleTime: Infinity,
  })
}
