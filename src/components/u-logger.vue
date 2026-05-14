<script setup lang="ts">
import type { LogEntry, LogLevel } from '~/utils/logger'

const levels: LogLevel[] = ['debug', 'log', 'info', 'warn', 'error']

const levelColors: Record<LogLevel, string> = {
  debug: '#6c757d',
  log: '#007bff',
  info: '#17a2b8',
  warn: '#ffc107',
  error: '#dc3545',
}

const activeFilters = reactive<Record<LogLevel, boolean>>({
  debug: true,
  log: true,
  info: true,
  warn: true,
  error: true,
})

const activeLevels = computed<LogLevel[]>(() =>
  levels.filter(l => activeFilters[l]),
)

const filteredLogs = computed<LogEntry[]>(() =>
  logger.getFilteredLogs(activeLevels.value),
)

const logCounts = computed<Record<LogLevel, number>>(() => {
  const counts = {} as Record<LogLevel, number>
  for (const level of levels) {
    counts[level] = loggerStorage[level].length
  }
  return counts
})

const totalLogCount = computed(() =>
  levels.reduce((sum, l) => sum + loggerStorage[l].length, 0),
)

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString()
}

function formatMessage(entry: LogEntry): string {
  return entry.args.map(a =>
    typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a),
  ).join(' ')
}

function randomLog() {
  const randomLevel = levels[Math.floor(Math.random() * levels.length)] as LogLevel
  logger[randomLevel](`This is a ${randomLevel} message`, { time: new Date().toISOString() })
}
</script>

<template>
  <div class="mx-auto max-w-6xl p-3 sm:p-6 text-sm font-mono">
    <h1 class="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
      Logger
    </h1>

    <!-- Filter Pills -->
    <div class="mb-3 sm:mb-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
      <button
        v-for="level in levels"
        :key="level"
        class="inline-flex cursor-pointer select-none items-center gap-1 sm:gap-1.5 border-1 rounded-md px-2 sm:px-3 py-0.5 sm:py-1 text-11px sm:text-xs font-bold transition-all duration-200"
        :class="activeFilters[level]
          ? 'text-white border-transparent'
          : 'bg-transparent'"
        :style="activeFilters[level]
          ? { backgroundColor: levelColors[level], borderColor: levelColors[level] }
          : { borderColor: levelColors[level], color: levelColors[level] }"
        @click="activeFilters[level] = !activeFilters[level]"
      >
        {{ level.toUpperCase() }}
        <span
          class="h-5 min-w-5 inline-flex items-center justify-center rounded-full px-1 text-xs"
          :class="activeFilters[level] ? 'bg-white/25' : 'bg-gray-200'"
        >{{ logCounts[level] }}</span>
      </button>
    </div>

    <!-- Log List -->
    <div
      class="relative overflow-x-auto rounded-lg bg-gray-900 p-2 sm:p-4 text-gray-100"
      style="height: calc(100vh - 260px); overflow-y: auto;"
    >
      <!-- Empty States -->
      <div v-if="totalLogCount === 0" class="py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-400">
        No log entries yet. Logs from <code class="rounded bg-gray-100 px-1 text-11px sm:text-xs">logger.debug()</code>, <code class="rounded bg-gray-100 px-1 text-11px sm:text-xs">logger.log()</code>, etc. will appear here.
      </div>
      <div v-else-if="filteredLogs.length === 0" class="py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-400">
        没有条目符合所选筛选条件。请至少启用一个日志级别。
      </div>

      <div
        v-for="(entry, idx) in filteredLogs"
        :key="`${entry.timestamp}-${idx}`"
        class="flex flex-col sm:flex-row sm:items-baseline gap-y-0.5 sm:gap-y-0 sm:gap-x-3 rounded-r px-2 py-1.5 transition-colors hover:bg-gray-800"
        :style="{ borderLeft: `3px solid ${levelColors[entry.level]}` }"
      >
        <div class="flex items-baseline gap-1.5 sm:gap-3">
          <span class="shrink-0 whitespace-nowrap text-11px sm:text-xs text-gray-500">{{ formatTime(entry.timestamp) }}</span>
          <span
            class="shrink-0 rounded px-1 sm:px-1.5 py-0.5 text-center text-10px sm:text-xs text-white font-bold"
            :style="{ backgroundColor: levelColors[entry.level] }"
          >{{ entry.level.toUpperCase() }}</span>
          <span class="max-w-20 sm:max-w-none shrink-0 truncate text-11px sm:text-xs text-blue-300 font-bold">{{ entry.name }}</span>
        </div>
        <span class="break-all text-11px sm:text-xs text-gray-200 sm:min-w-0">{{ formatMessage(entry) }}</span>
      </div>
      <button
        class="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 cursor-pointer rounded bg-gray-5 px-2 sm:px-3 py-0.5 sm:py-1 text-11px sm:text-xs transition-colors hover:bg-gray-5"
        @click="logger.clearLogs()"
      >
        清空日志
      </button>
    </div>

    <!-- Footer -->
    <div v-if="totalLogCount > 0" class="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-center gap-2 sm:gap-0">
      <!--  随机执行一个log -->
      <button
        class="cursor-pointer rounded bg-blue-500 px-2 sm:px-3 py-1 sm:py-1 text-11px sm:text-xs text-white transition-colors hover:bg-blue-600 sm:mr-auto"
        @click="randomLog()"
      >
        生成随机日志
      </button>
      <!-- Summary -->
      <div class="text-11px sm:text-xs text-gray-500 sm:mb-3 text-center sm:text-right">
        共有 {{ filteredLogs.length }} / {{ totalLogCount }} 条记录
      </div>
    </div>
  </div>
</template>
