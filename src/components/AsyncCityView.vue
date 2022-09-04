<template>
  <div></div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';
import type {
  CurrentWeatherResponse,
  WeatherForecastResponse,
} from '@/types/weather';
import { ref } from 'vue';

const route = useRoute();

const getWeatherData = async () => {
  try {
    const { lat, lon } = route.query;

    const params = {
      lat,
      lon,
      units: 'metric',
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    };

    const requests = [
      axios.get<CurrentWeatherResponse>(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params,
        }
      ),
      axios.get<WeatherForecastResponse>(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params,
        }
      ),
    ] as const;

    const weatherData = await Promise.all(requests);

    currentWeather.value = weatherData[0].data;
    forecastWeather.value = weatherData[1].data;
  } catch (e) {
    console.log(e);
  }
};

const currentWeather = ref<CurrentWeatherResponse>();

const forecastWeather = ref<WeatherForecastResponse>();

await getWeatherData();
</script>
