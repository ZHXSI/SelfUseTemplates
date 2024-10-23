import Layout from '@/views/Layout/index.vue'
const route = {
  path: '/',
  component: Layout,
  redirect: '/index',
  meta: { title: '首页' },
  children: [
    {
      path: '/index',
      name: 'index',
      meta: { title: '首页' },
      component: () => import('@/views/homepage/index.vue'),
    },
  ],
}
export default route
