<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg z-10">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Weather App</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          v-if="route.query.preview"
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
        ></i>
        <a
          href="https://github.com/Darkzarich/weather-app"
          target="_blank"
          class="fa-brands fa-github text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        />
      </div>

      <BaseModal :show="showInfo" @close="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Weather App allows you to track the current and future weather
            of cities of your choice.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { citiesLSKey } from '@/config';
import type { FavoriteCity } from '@/types/cities';
import { nanoid } from 'nanoid';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseModal from './Base/BaseModal.vue';

const showInfo = ref(false);

const toggleModal = () => {
  showInfo.value = !showInfo.value;
};

const favoriteCities = ref<FavoriteCity[]>([]);

const route = useRoute();
const router = useRouter();

const addCity = () => {
  // TODO: check if city was already added before
  const data = localStorage.getItem(citiesLSKey);

  if (data) {
    favoriteCities.value = JSON.parse(data);
  }

  const locationObj = {
    id: nanoid(),
    state: route.params.state,
    city: route.params.city,
    location: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  favoriteCities.value.push(locationObj as FavoriteCity);

  localStorage.setItem(citiesLSKey, JSON.stringify(favoriteCities.value));

  const query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;

  router.replace({ query });
};
</script>
