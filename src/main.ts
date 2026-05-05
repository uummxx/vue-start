import type { Module } from '~/types.ts'
import { createApp } from 'vue'
import App from './App.vue'
// reset style
import '~/assets/style/reset.ts'

const app = createApp(App)
Object.values(import.meta.glob<{ install: Module }>('./modules/*.ts', { eager: true })).forEach(i => i.install?.(app))
app.mount('#app')
