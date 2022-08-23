<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md"
        type="text"
        placeholder="Search for a city or state"
        @input="getSearchResults()"
      />

      <ul
        v-if="searchResults"
        class="absolute bg-weather-secondary w-full shadow-md px-1 top-[66px]"
      >
        <p v-if="searchError">Sorry, something went wrong. Please try again.</p>
        <p v-else-if="searchResults.length === 0">
          Not results match your query, try a different one.
        </p>
        <template v-else>
          <li
            v-for="result in searchResults"
            :key="result.id"
            class="py-2 cursor-pointer"
          >
            {{ result.formatted }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { CitiesSearchResponse, SearchResult } from '@/types/cities';

import { debounce } from '@/utils/debounce';
import axios from 'axios';
import { ref } from 'vue';

const searchQuery = ref('');

const searchResults = ref<SearchResult[] | null>(null);

const searchError = ref(false);

const getSearchResults = debounce(async () => {
  searchError.value = false;

  if (!searchQuery.value.length) {
    searchResults.value = null;

    return;
  }

  try {
    const res = await axios.get<CitiesSearchResponse>(
      `https://api.geoapify.com/v1/geocode/autocomplete`,
      {
        params: {
          text: searchQuery.value,
          type: 'city',
          apiKey: GEOAPIFY_API_KEY,
        },
      }
    );

    searchResults.value = res.data.features.map((item) => ({
      id: item.properties.place_id,
      name: item.properties.name,
      formatted: item.properties.formatted,
    }));
  } catch (e) {
    searchError.value = true;
    searchResults.value = [];
  }
}, 500);
</script>
