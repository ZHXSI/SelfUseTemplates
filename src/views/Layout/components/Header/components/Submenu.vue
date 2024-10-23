<template>
  <div>
    <template v-for="(item, index) in props.menuItem" :key="index">
      <el-menu-item
        :index="item.path"
        v-if="isSingleChild(item)"
        @click="handleMenuItemClick(item.path)"
      >
        {{ item.meta.title }}
      </el-menu-item>
      <el-sub-menu :index="item.path" v-else>
        <template #title> {{ item.meta.title }} </template>
        <template
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
        >
          <el-menu-item
            :index="child.path"
            v-if="isSingleChild(child)"
            @click="handleMenuItemClick(child.path)"
          >
            {{ item.meta.title }}
          </el-menu-item>
          <el-sub-menu :index="child.path" v-else>
            <template #title> {{ item.meta.title }}</template>
            <Submenu :menuItem="child.children" />
          </el-sub-menu>
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type RouteRecordRaw, useRouter } from 'vue-router'
const props = defineProps<{
  menuItem: RouteRecordRaw[]
}>()
const router = useRouter()
const isSingleChild = (route: RouteRecordRaw): boolean => {
  return !route.children || route.children.length === 0
}
const handleMenuItemClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped></style>
