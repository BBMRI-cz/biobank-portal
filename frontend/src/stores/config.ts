import { ref } from 'vue'
import { defineStore } from 'pinia'
import { env } from '@/config'
import { fetchRuntimeConfig, type RuntimeConfig } from '@/config/runtimeConfig'

/** Runtime config loaded from the backend once at startup (see main.ts). */
export const useConfigStore = defineStore('config', () => {
  const runtime = ref<RuntimeConfig | null>(null)

  async function load(): Promise<void> {
    runtime.value = await fetchRuntimeConfig(env.apiBaseUrl)
  }

  function requireRuntime(): RuntimeConfig {
    if (!runtime.value) {
      throw new Error('Config not loaded yet')
    }
    return runtime.value
  }

  return { runtime, load, requireRuntime }
})
