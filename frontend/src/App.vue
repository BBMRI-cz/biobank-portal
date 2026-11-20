<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'

const items: MenuItem[] = [{ label: 'Home', icon: 'pi pi-home', route: '/' }]
</script>

<template>
  <Menubar :model="items" class="rounded-none border-x-0 border-t-0">
    <template #start>
      <strong class="mr-4">Biobank Portal</strong>
    </template>
    <template #item="{ item, props }">
      <RouterLink v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </RouterLink>
    </template>
  </Menubar>

  <main class="mx-auto max-w-7xl p-6">
    <RouterView />
  </main>
</template>
