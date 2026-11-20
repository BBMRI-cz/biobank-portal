import { readEnv } from './env'

export type { EnvConfig } from './env'
export type { RuntimeConfig } from './runtimeConfig'

/** Build-time settings, read once from VITE_* environment variables. */
export const env = readEnv(import.meta.env)
