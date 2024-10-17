<template>
  <el-menu mode="horizontal">
    <template v-for="(item, index) in props.menuItem" :key="index">
      <template v-if="item.children && item.children.length !== 1">
        <!-- <template v-for="(item2, index2) in item.children" :key="index2">
          <el-sub-menu :index="item2.path">
            <template #title>{{ item.meta.title }}</template>
            <el-menu-item :index="item2.path" @click="navigateTo(item2.path)">
              {{ item2.meta.title }}
            </el-menu-item>
            <Menu :menuItem="item2.children"></Menu>
          </el-sub-menu>
        </template> -->
        {{item}}
      </template>
      <template v-else>
        <el-menu-item :index="item.path" @click="navigateTo(item.path)">
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{
  menuItem: RouteRecordRaw[]
}>()

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}

// console.log(props.menuItem)
</script>
