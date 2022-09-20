import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import CityView from '@/views/CityView.vue';
import HomeView from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
