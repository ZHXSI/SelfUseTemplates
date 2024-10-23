<template>
  <header class="flex items-center border-b bg-slate-200 dark:border-gray-600">
    <el-menu
      mode="horizontal"
      :default-active="routerCache.currentPage"
      class="!m-auto w-1/2"
    >
      <template v-for="(item, index) in filteredRoutes" :key="index">
        <el-menu-item
          v-if="isSingleChild(item)"
          :index="item.children[0].path"
          @click="handleMenuItemClick(item.children[0].path)"
        >
          {{ item.meta.title }}
        </el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template #title> {{ item.meta.title }} </template>
          <Submenu :menuItem="item.children" />
        </el-sub-menu>
      </template>
    </el-menu>
    <el-button @click="switchLanguages">12</el-button>
  </header>
</template>
<script setup lang="ts">
import Submenu from './components/Submenu.vue'
import { type RouteRecordRaw, useRouter } from 'vue-router'
const router = useRouter()
const filterRoutes = (
  routes: RouteRecordRaw[],
  level: number = 1,
): RouteRecordRaw[] => {
  return routes
    .filter(
      route =>
        route.path !== '/404' &&
        (level > 1 || route.redirect !== undefined) &&
        !route.hidden,
    )
    .map(route => {
      if (route.children) {
        route.children = filterRoutes(route.children, level + 1)
      }
      return route
    })
}
const filteredRoutes = computed(() => filterRoutes(router.getRoutes()))
const isSingleChild = (route: RouteRecordRaw): boolean => {
  return (
    route.children &&
    ((route.children.length === 1 &&
      (!route.children[0].children ||
        route.children[0].children.length === 0)) ||
      route.children.length === 0)
  )
}
const handleMenuItemClick = (path: string) => {
  router.push(path)
}
const routerCache = useRouterCache()
const I18nCache = useI18nCache()
const switchLanguages = () => {
  I18nCache.changeLanguage(I18nCache.lang === 'zh' ? 'en' : 'zh')
}
</script>

<style scoped></style>
