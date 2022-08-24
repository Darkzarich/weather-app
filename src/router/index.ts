import { createRouter, createWebHistory } from 'vue-router';
import CityView from '@/views/CityView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/weather/:state/:city',
      name: 'city-view',
      component: CityView,
    },
  ],
});

export default router;
