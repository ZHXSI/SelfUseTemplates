import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { type RouteLocationNormalizedLoaded } from 'vue-router'
export const useRouterCache = defineStore(
  'useRouterCache',
  () => {
    const cachedViews = ref([])
    const currentPage = ref('/index')
    const addCacheRoute = (to: RouteLocationNormalizedLoaded) => {
      cachedViews.value = Array.from(new Set([...cachedViews.value, to.name]))
      currentPage.value = to.path
    }
    const clearCacheRoute = (to: RouteLocationNormalizedLoaded) => {
      cachedViews.value = [to.name]
      currentPage.value = to.path
    }
    return {
      cachedViews,
      addCacheRoute,
      clearCacheRoute,
      currentPage,
    } as const
  },
  {
    persist: piniaPersistConfig('RouterCache'),
  },
)
