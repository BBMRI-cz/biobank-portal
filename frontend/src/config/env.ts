export interface EnvConfig {
  apiBaseUrl: string
}

type Env = Record<string, string | boolean | undefined>

/** Reads the build-time settings from Vite env variables; throws if one is missing. */
export function readEnv(env: Env): EnvConfig {
  const apiBaseUrl = env.VITE_API_BASE_URL
  if (typeof apiBaseUrl !== 'string' || apiBaseUrl.trim() === '') {
    throw new Error(
      'Missing environment variable VITE_API_BASE_URL. ' +
        'Copy frontend/.env.example to frontend/.env.local and fill it in.',
    )
  }
  return { apiBaseUrl: apiBaseUrl.trim().replace(/\/+$/, '') }
}
