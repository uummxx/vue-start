/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
interface ViteTypeOptions {
    // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，
    // 这样就不允许有未知的键值了。
    strictImportMetaEnv: unknown
}
interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
    readonly VITE_APP_LOG_LEVEL: 'debug' | 'log' | 'info' | 'warn' | 'error'

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
