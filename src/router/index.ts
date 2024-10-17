import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
const files = import.meta.glob('/src/router/*.ts',{ import: 'default',eager: true });
const routes = Object.values(files).flat() as RouteRecordRaw[];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
