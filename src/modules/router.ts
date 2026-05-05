import type { Module } from '~/types'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { logger } from '~/utils/logger'

export const install: Module = (app) => {
    const router = createRouter({
        history: createWebHistory(),
        routes: setupLayouts(routes),
    })
    app.use(router)
    if (import.meta.hot) {
        handleHotUpdate(router)
    }
    logger.debug('Router module installed')
}
