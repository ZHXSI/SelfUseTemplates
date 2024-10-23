<template>
  <div>{{ date }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

const date = ref(dayjs().format('DD-MM-YYYY HH:mm:ss'))
const isRunning = ref(true)
const localTime = performance.now()

const updateDate = () => {
  date.value = dayjs().format('DD-MM-YYYY HH:mm:ss')
}

const timers = (callback: () => void, duration: number) => {
  const now = performance.now()
  const timeGap = now - localTime
  const nextTickTime = 1000 - (timeGap % 1000)
  if (duration <= 0 || !isRunning.value) {
    return
  }
  setTimeout(() => {
    callback()
    timers(callback, duration - 1)
  }, nextTickTime)
}

onMounted(() => {
  timers(updateDate, Infinity)
})

onUnmounted(() => {
  isRunning.value = false
})
</script>

<style scoped></style>
