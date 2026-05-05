import type { Module } from '~/types'
import { logger } from '~/utils/logger'

export const install: Module = (app) => {
    app.config.globalProperties.$logger = logger
    app.config.globalProperties.$log = logger
    logger.debug('Logger module installed')
}
