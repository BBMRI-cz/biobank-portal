import type { PropsWithChildren } from 'react'
import { LoaderCircle, TriangleAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ConfigContext } from './configContext'
import { useRuntimeConfigQuery } from './useRuntimeConfigQuery'

type ConfigProviderProps = PropsWithChildren<{
  apiBaseUrl: string
}>

export function ConfigProvider({ apiBaseUrl, children }: ConfigProviderProps) {
  const query = useRuntimeConfigQuery(apiBaseUrl)

  if (query.isPending) {
    return (
      <output className="grid min-h-svh place-items-center text-muted-foreground">
        <span className="flex items-center gap-2">
          <LoaderCircle className="size-5 animate-spin" aria-hidden />
          Loading configuration…
        </span>
      </output>
    )
  }

  if (query.isError) {
    return (
      <div role="alert" className="grid min-h-svh place-items-center p-6">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <TriangleAlert className="size-8 text-destructive" aria-hidden />
          <h1 className="text-lg font-semibold">The application could not start</h1>
          <p className="text-sm text-muted-foreground">{query.error.message}</p>
          <Button variant="outline" disabled={query.isFetching} onClick={() => query.refetch()}>
            Try again
          </Button>
        </div>
      </div>
    )
  }

  return <ConfigContext value={query.data}>{children}</ConfigContext>
}
