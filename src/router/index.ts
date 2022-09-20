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
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/weather/:state/:city',
    name: 'city-view',
    component: CityView,
    meta: {
      title: 'Weather',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.params.city || to.meta.title} | The Weather App`;
  next();
});

export default router;
