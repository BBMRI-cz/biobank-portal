import { describe, expect, it } from 'vitest'
import { readEnv } from '../env'

describe('readEnv', () => {
  it('reads the API base URL and strips trailing slashes', () => {
    expect(readEnv({ VITE_API_BASE_URL: 'http://localhost:8080/api/' })).toEqual({
      apiBaseUrl: 'http://localhost:8080/api',
    })
  })

  it('throws when VITE_API_BASE_URL is missing', () => {
    expect(() => readEnv({})).toThrow('VITE_API_BASE_URL')
  })
})
