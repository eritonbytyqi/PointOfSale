<template>
  <div class="relative">
    <button @click="handleClick" class="p-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-gray-700">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.403-1.403a7.002 7.002 0 0 0 1.432-3.197c.116-.601.18-1.226.18-1.8V9a6 6 0 0 0-12 0v2.6c0 .574.064 1.199.18 1.8a7.002 7.002 0 0 0 1.432 3.197L4 17h5m6 0v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1m6 0v-3a2 2 0 1 1 4 0v3" />
      </svg>

      <!-- Shfaq numrin e njoftimeve -->
      <span v-if="notificationsCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {{ notificationsCount }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Prop për numrin e njoftimeve
const notificationsCount = ref(0);

// Funksioni që mund të thirret për të përditësuar numrin e njoftimeve
const handleClick = () => {
  console.log("Zilja u klikuar!");
};
</script>

<style scoped>
/* Styling për ikonen e ziljes dhe numrin */
</style>
