<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <AsyncCityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import AsyncCityView from '@/components/AsyncCityView.vue';
import AsyncCityViewSkeleton from '../components/Skeletons/AsyncCityViewSkeleton.vue';
</script>
