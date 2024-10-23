import Layout from '@/views/Layout/index.vue'
const route = {
  path: '/',
  component: Layout,
  redirect: '/songList',
  meta: { title: '歌单' },
  children: [
    {
      path: '/songList',
      name: 'songList',
      meta: { title: '歌单' },
      component: () => import('@/views/songList/index.vue'),
    },
  ],
}
export default route
