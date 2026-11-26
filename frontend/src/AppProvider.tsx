import { useState, type PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { env } from '@/config'
import { ConfigProvider } from '@/config/ConfigProvider'

export function AppProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider apiBaseUrl={env.apiBaseUrl}>{children}</ConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
