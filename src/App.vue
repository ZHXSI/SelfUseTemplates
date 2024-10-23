<template>
  <div>
    <el-config-provider :locale="lang[I18nCache.lang]">
      <router-view v-if="isRouterAlive" />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
const I18nCache = useI18nCache()
const lang = ref({
  zh,
  en,
})
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(function () {
    isRouterAlive.value = true
  })
}
// internationalization
provide('reload', reload)
</script>

<style scoped></style>
