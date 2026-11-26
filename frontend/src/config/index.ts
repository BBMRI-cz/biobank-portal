import { readEnv } from './env'

export type { EnvConfig } from './env'
export type { RuntimeConfig } from './runtimeConfig'

export const env = readEnv(import.meta.env)
