import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z
    .string()
    .trim()
    .min(1)
    .transform((url) => url.replace(/\/+$/, '')),
})

export type EnvConfig = {
  apiBaseUrl: string
}

type Env = Record<string, string | boolean | undefined>

export function readEnv(env: Env): EnvConfig {
  const result = envSchema.safeParse(env)
  if (!result.success) {
    throw new Error(
      'Missing environment variable VITE_API_BASE_URL. ' +
        'Copy frontend/.env.example to frontend/.env.local and fill it in.',
    )
  }
  return { apiBaseUrl: result.data.VITE_API_BASE_URL }
}
