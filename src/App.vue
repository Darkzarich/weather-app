<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import SiteNavigation from '@/components/SiteNavigation.vue';
</script>

<style>
.scrollbar::-webkit-scrollbar {
  width: 15px;
  height: 10px;
}

.scrollbar::-webkit-scrollbar-track {
  border-radius: 100vh;
  box-shadow: 0px 0px 3px #48eefc;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 100vh;
  border: 3px solid transparent;
}
</style>
