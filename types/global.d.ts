import type { LoggerStorage } from './utils/logger'
import { Logger } from './utils/logger'

declare global {
    interface Window {
        $logger: LoggerStorage
    }
}
