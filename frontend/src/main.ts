import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import { useConfigStore } from './stores/config'

async function bootstrap(): Promise<void> {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)

  // OIDC and other settings come from the backend; nothing works without them.
  await useConfigStore(pinia).load()

  app.use(router)
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      // Put PrimeVue styles in a CSS layer between Tailwind's base and utilities,
      // so Tailwind classes can override component styles.
      options: { cssLayer: { name: 'primevue', order: 'theme, base, primevue' } },
    },
  })
  app.mount('#app')
}

bootstrap().catch((error: unknown) => {
  console.error(error)
  const root = document.getElementById('app')
  if (root) {
    root.textContent = `The application could not start: ${error instanceof Error ? error.message : String(error)}`
  }
})
