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
const routerCache = useRouterCache();
const route = useRoute();
// const router = useRouter();
watch(route, (to) => {
  routerCache.addCacheRoute(to.name);
});
// const handleClick = () => {
//   router.push(route.path === '/components1' ? '/components2' : '/components1');
// };
</script>

<style scoped></style>