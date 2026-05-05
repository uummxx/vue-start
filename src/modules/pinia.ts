import type { Module } from '~/types'
import { createPinia } from 'pinia'
import { logger } from '~/utils/logger'

export const install: Module = (app) => {
    const pinia = createPinia()
    app.use(pinia)
    logger.debug('Pinia module installed')
}
