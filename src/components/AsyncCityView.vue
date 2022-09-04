<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>

    <!-- Current weather -->
    <div
      v-if="currentWeather"
      class="flex flex-col items-center text-white py-12"
    >
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>

      <p class="text-sm mb-12">
        {{
          new Date(currentWeather.dt! * 1000).toLocaleDateString('en-us', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
          })
        }}
        {{
          new Date(currentWeather.dt * 1000).toLocaleTimeString('en-us', {
            timeStyle: 'short',
          })
        }}
      </p>

      <p class="text-8xl mb-8">
        {{ Math.round(currentWeather.main.temp) }}&deg;
      </p>

      <p>
        Feels like
        {{ Math.round(currentWeather.main.feels_like) }}&deg;
      </p>
      <p class="capitalize">{{ currentWeather.weather[0].description }}</p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`"
        :alt="currentWeather.weather[0].description"
      />
    </div>

    <hr class="border-white border-opacity-10 w-full" />

    <!-- Forecast 4 days -->
    <div v-if="forecastWeather" class="max-w-screen-md w-full my-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Next 4 days Hourly Forecast</h2>
        <div
          class="flex gap-10 pb-8 scrollbar overflow-x-scroll scrollbar-thumb-weather-secondary scrollbar-track-weather-primary"
        >
          <div
            v-for="hourlyData in forecastWeather.list"
            :key="hourlyData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-base">
              {{
                new Date(hourlyData.dt * 1000).toLocaleTimeString('en-us', {
                  hour: 'numeric',
                })
              }}
            </p>
            <p class="whitespace-nowrap text-base">
              {{
                new Date(hourlyData.dt * 1000).toLocaleDateString('en-us', {
                  day: 'numeric',
                  month: 'short',
                })
              }}
            </p>
            <img
              class="w-[150px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`"
              alt="weather"
            />
            <p class="text-xl">{{ Math.round(hourlyData.main.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="forecastWeather" class="max-w-screen-md w-full my-3">
      <div class="mx-8 text-white">
        <div
          v-for="hourlyData in forecastWeather.list"
          :key="hourlyData.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(hourlyData.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long',
                minute: '2-digit',
                hour: '2-digit',
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`"
            alt="weather"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>
              <sup class="mr-2">max</sup
              >{{ Math.round(hourlyData.main.temp_max) }}&deg;
            </p>
            <p>
              <sup class="mr-2">min</sup
              >{{ Math.round(hourlyData.main.temp_min) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
