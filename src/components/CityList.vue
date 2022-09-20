<template>
  <CityCard
    v-for="city in favoriteCities"
    :key="city.id"
    :city="city"
    @click="goToCityView(city)"
  >
  </CityCard>

  <p v-if="favoriteCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>
<script setup lang="ts">
import { citiesLSKey } from '@/config';

import type { FavoriteCity } from '@/types/cities';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';

const favoriteCities = ref<FavoriteCity[]>([]);

const getCities = () => {
  const data = JSON.parse(localStorage.getItem(citiesLSKey) ?? '[]');

  if (data) {
    favoriteCities.value = data;
  }
};

await getCities();

const router = useRouter();

const goToCityView = (city: FavoriteCity) => {
  router.push({
    name: 'city-view',
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      lat: city.location.lat,
      lon: city.location.lon,
      id: city.id,
    },
  });
};
</script>
