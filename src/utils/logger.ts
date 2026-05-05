import packageJson from '../../package.json'

type LogLevel = 'debug' | 'log' | 'info' | 'warn' | 'error'
interface LoggerColor {
    debug?: string
    log?: string
    info?: string
    warn?: string
    error?: string
}
const defaultColor: LoggerColor = {
    debug: '#6c757d',
    log: '#007bff',
    info: '#17a2b8',
    warn: '#ffc107',
    error: '#dc3545',
}
interface LoggerConfig {
    name?: string
    color?: LoggerColor
    level?: LogLevel
}
const { VITE_APP_NAME, VITE_APP_LOG_LEVEL, DEV } = import.meta.env
const { name } = packageJson as { name: string }
const defaultConfig: LoggerConfig = {
    name: VITE_APP_NAME || name,
    color: defaultColor,
    level: VITE_APP_LOG_LEVEL || 'log',
}

type LoggerStorage = {
    [key in LogLevel]: {
        name: string
        level: LogLevel
        timestamp: number
        color?: string
        args: any[]
    }[]
}

export const loggerStorage = reactive<LoggerStorage>({
    debug: [],
    log: [],
    info: [],
    warn: [],
    error: [],
})

export class Logger {
    private config: LoggerConfig = {}

    private color(level: LogLevel, ...args: any[]): string[] {
        const colorStyle = `color: #fff; background-color: ${this.config.color?.[level] || 'inherit'};font-weight: bold; padding: 2px 4px; border-radius: 4px;`
        const name = this.config.name ?? ''
        const prefix = name ? `[${this.config.name}]` : ''
        if (DEV) {
            loggerStorage[level]?.push({
                name,
                level,
                timestamp: Date.now(),
                color: this.config.color?.[level],
                args,
            })
        }
        return [`%c${prefix}`, colorStyle, ...args]
    }

    constructor(config?: LoggerConfig) {
        const mergedConfig = { ...defaultConfig, ...config }
        this.config = mergedConfig
        this.debug('Logger Created')
        window.$logger = loggerStorage
    }

    isLevelEnabled(level: LogLevel): boolean {
        const levels = ['debug', 'log', 'info', 'warn', 'error']
        const currentLevelIndex = levels.indexOf(this.config.level || 'log')
        const messageLevelIndex = levels.indexOf(level)
        const isEnabled = messageLevelIndex >= currentLevelIndex
        return isEnabled
    }

    debug(...args: any[]) {
        // eslint-disable-next-line no-console
        (this.isLevelEnabled('debug')) && console.log(...this.color('debug', ...args))
    }

    log(...args: any[]) {
        // eslint-disable-next-line no-console
        (this.isLevelEnabled('log')) && console.log(...this.color('log', ...args))
    }

    info(...args: any[]) {
        // eslint-disable-next-line no-console
        (this.isLevelEnabled('info')) && console.info(...this.color('info', ...args))
    }

    warn(...args: any[]) {
        (this.isLevelEnabled('warn')) && console.warn(...this.color('warn', ...args))
    }

    error(...args: any[]) {
        (this.isLevelEnabled('error')) && console.error(...this.color('error', ...args))
    }

    group(...args: any[]) {
        // eslint-disable-next-line no-console
        console.group(...this.color('log', ...args))
    }

    groupEnd() {
        // eslint-disable-next-line no-console
        console.groupEnd()
    }

    getLogs(level?: LogLevel): any[] {
        if (!level) {
            const allLogs: any[] = []
            for (const logs of Object.values(loggerStorage)) {
                allLogs.push(...logs)
            }
            return allLogs
        }

        return loggerStorage[level] || []
    }

    format(Log: LoggerStorage[keyof LoggerStorage][number]): string {
        return `[${new Date(Log.timestamp).toLocaleTimeString()} - ${Log.level.toUpperCase()} - ${Log.name}: ${Log.args.join(' ')}]`
    }
}

export function createLogger(name?: string, level?: LogLevel): Logger
export function createLogger(name?: string, color?: string): Logger
export function createLogger(name?: string): Logger
export function createLogger(config?: LoggerConfig): Logger
export function createLogger(...config: any): Logger {
    const [nameOrConfig, colorOrLevel, level] = config || []
    // 一个都没有 使用默认的
    if (!config.length) {
        return new Logger()
    }
    // 只有一个参数，且是字符串，作为 name
    if (!colorOrLevel && typeof nameOrConfig === 'string') {
        return new Logger({ name: nameOrConfig })
    }
    // 两个参数，第一个是字符串，第二个是对象，作为 name 和 color
    if (!level && typeof nameOrConfig === 'string' && typeof colorOrLevel === 'object') {
        return new Logger({ name: nameOrConfig, color: colorOrLevel })
    }
    // 两个参数，第一个是字符串，第二个是字符串，作为 name 和 level
    if (!level && typeof nameOrConfig === 'string' && typeof colorOrLevel === 'string') {
        return new Logger({ name: nameOrConfig, level: colorOrLevel as LogLevel })
    }
    // 三个参数，第一个是字符串，第二个是对象，第三个是字符串，作为 name、color 和 level
    if (typeof nameOrConfig === 'string' && typeof colorOrLevel === 'object' && typeof level === 'string') {
        return new Logger({ name: nameOrConfig, color: colorOrLevel, level: level as LogLevel })
    }
    // 只有一个参数，且是对象，作为配置对象
    if (typeof nameOrConfig === 'object' && nameOrConfig !== null && !Array.isArray(nameOrConfig)) {
        return new Logger(nameOrConfig)
    }
    return new Logger()
}
export const logger = createLogger()
