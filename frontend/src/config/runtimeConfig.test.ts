import { describe, expect, it, vi } from 'vitest'
import { fetchRuntimeConfig, parseRuntimeConfig } from './runtimeConfig'

const validConfig = {
  oidc: {
    authority: 'https://login.example.org/realms/biobank',
    clientId: 'biobank-portal',
    scope: 'openid profile email',
  },
}

describe('parseRuntimeConfig', () => {
  it('accepts a valid config', () => {
    expect(parseRuntimeConfig(validConfig)).toEqual(validConfig)
  })

  it('rejects a config with a missing field', () => {
    expect(() => parseRuntimeConfig({ oidc: { authority: 'x', scope: 'openid' } })).toThrow(
      'oidc.clientId',
    )
  })
})

describe('fetchRuntimeConfig', () => {
  it('loads the config from {apiBaseUrl}/config', async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(Response.json(validConfig))

    const config = await fetchRuntimeConfig('http://localhost:8080/api', fetchFn)

    expect(fetchFn).toHaveBeenCalledWith('http://localhost:8080/api/config', expect.anything())
    expect(config).toEqual(validConfig)
  })

  it('throws when the backend responds with an error', async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }))

    await expect(fetchRuntimeConfig('http://localhost:8080/api', fetchFn)).rejects.toThrow(
      'HTTP 503',
    )
  })
})
