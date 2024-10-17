<template>
  <!-- flex justify-between p-2 items-center border-b dark:border-gray-600 bg-slate-200" -->
  <header class="flex items-center border-b dark:border-gray-600 bg-slate-200">
    <!-- <span v-for="(item, index) in filterRoutes(router.getRoutes())" :key="index" class="p-2" @click="details(item)">
      {{ item.meta.title }}
    </span> -->
    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
<el-menu-item index="2-1">item one</el-menu-item>
<el-menu-item index="2-2">item two</el-menu-item>
<el-menu-item index="2-3">item three</el-menu-item>
<el-sub-menu index="2-4">
  <template #title>item four</template>
  <el-menu-item index="2-4-1">item one</el-menu-item>
  <el-menu-item index="2-4-2">item two</el-menu-item>
  <el-menu-item index="2-4-3">item three</el-menu-item>
</el-sub-menu>
</el-sub-menu>
<el-menu-item index="3" disabled>Info</el-menu-item>
<el-menu-item index="4">Orders</el-menu-item>
</el-menu> -->
    <Menu :menuItem="filterRoutes(router.getRoutes())" class="w-full"></Menu>
    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <template v-for="(item, index) in filterRoutes(router.getRoutes())">
        <el-menu-item :index="String(index)" @click="details(item)">
          {{ item.meta.title }}
        </el-menu-item>
      </template> -->
    <!-- <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item> -->
    <!-- </el-menu> -->
  </header>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import Menu from "./components/Menu.vue";
const router = useRouter();
const filterRoutes = (
  routes: RouteRecordRaw[],
  level: number = 1,
): RouteRecordRaw[] => {
  return routes
    .filter((route) =>
      route.path !== "/404" &&
      (level > 1 || route.redirect !== undefined) &&
      !route.hidden
    )
    .map((route) => {
      if (route.children) {
        route.children = filterRoutes(route.children, level + 1);
      }
      return route;
    });
};
// const details = (item: RouteRecordRaw) => {
//   console.log(item);
// }
// const activeIndex = ref('1')
// const activeIndex2 = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>

<style scoped></style>
