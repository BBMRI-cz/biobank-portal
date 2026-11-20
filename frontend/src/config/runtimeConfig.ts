/** Settings served by the backend at GET {apiBaseUrl}/config. */
export interface RuntimeConfig {
  oidc: {
    authority: string
    clientId: string
    scope: string
  }
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Invalid config from backend: "${field}" must be a non-empty string`)
  }
  return value
}

/** Validates the JSON returned by the backend. */
export function parseRuntimeConfig(json: unknown): RuntimeConfig {
  const oidc = (json as { oidc?: Record<string, unknown> } | null)?.oidc ?? {}
  return {
    oidc: {
      authority: requireString(oidc.authority, 'oidc.authority'),
      clientId: requireString(oidc.clientId, 'oidc.clientId'),
      scope: requireString(oidc.scope, 'oidc.scope'),
    },
  }
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
