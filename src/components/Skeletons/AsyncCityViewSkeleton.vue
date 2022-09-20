<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col py-12 items-center">
      <BaseSkeleton class="max-w-[300px] w-full mb-2" />
      <BaseSkeleton class="max-w-[300px] w-full mb-12" />
      <BaseSkeleton class="max-w-[300px] h-[100px] w-full mb-12" />
      <BaseSkeleton class="max-w-[300px] w-full mb-8" />
      <BaseSkeleton class="max-w-[300px] h-[75px] w-full" />
    </div>
    <div class="flex flex-col py-12 px-8 items-center">
      <BaseSkeleton class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
    <div class="flex flex-col py-12 px-8 items-center">
      <BaseSkeleton class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSkeleton from '../Base/BaseSkeleton.vue';
</script>
