import { createRouter, createWebHistory } from 'vue-router'

// Add a placeholder route to avoid an empty routes array
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
