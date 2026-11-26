import { z } from 'zod'

const nonEmpty = z.string().trim().min(1, 'must be a non-empty string')

export const runtimeConfigSchema = z.object({
  oidc: z.object({
    authority: nonEmpty,
    clientId: nonEmpty,
    scope: nonEmpty,
  }),
})

export type RuntimeConfig = z.infer<typeof runtimeConfigSchema>

export function parseRuntimeConfig(json: unknown): RuntimeConfig {
  const result = runtimeConfigSchema.safeParse(json)
  if (!result.success) {
    const issue = result.error.issues[0]
    const field = issue?.path.join('.') || 'config'
    throw new Error(`Invalid config from backend: "${field}" ${issue?.message ?? 'is invalid'}`)
  }
  return result.data
}

export async function fetchRuntimeConfig(
  apiBaseUrl: string,
  fetchFn: typeof fetch = fetch,
): Promise<RuntimeConfig> {
  const url = `${apiBaseUrl}/config`
  const response = await fetchFn(url, { headers: { Accept: 'application/json' } })
  if (!response.ok) {
    throw new Error(`Could not load config from ${url}: HTTP ${response.status}`)
  }
  return parseRuntimeConfig(await response.json())
}
