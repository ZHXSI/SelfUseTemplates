<template>
  <main class="flex-1 overflow-auto">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="routerCache.cachedViews">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </main>
</template>
<script setup lang="ts">
const routerCache = useRouterCache()
const route = useRoute()
watch(route, to => {
  routerCache.addCacheRoute(to)
})
const handleBeforeUnload = () => {
  routerCache.clearCacheRoute(route)
}
// 这里是监听页面刷新或离开的事件
onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})
// 这里是监听页面即将卸载的事件
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style scoped></style>
