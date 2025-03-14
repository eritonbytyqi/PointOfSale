<template>
  <!-- Main container -->
  <div class="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-100">
    <!-- Sidebar -->
    <Sidebar class="fixed w-64 h-screen" />

    <!-- Main content area -->
    <div class="flex-1 p-4 ml-64">
      <!-- Topbar with Profile -->
      <Navbar />

      <!-- Content area for dynamic content -->
      <div class="max-w-6xl mx-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';  // Import Sidebar component
import Navbar from './Navbar.vue';    // Import Navbar component
import { useNotification } from '@kyvg/vue3-notification';  // Import useNotification hook
import { watchEffect } from "vue";

const { notify } = useNotification();  // Inicializoni notify për të përdorur notifikimet



export default {
  name: "MainLayout",
  components: {
    Sidebar,   // Register Sidebar component
    Navbar,    // Register Navbar component
  },
};
</script>

<style scoped>
/* Sidebar adjustments */
/* Remove sidebar styles here since it's now imported from Sidebar.vue */

/* Profile Dropdown adjustments */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.right-0 {
  right: 0;
}

/* Add hover effect for the profile dropdown */
.relative:hover .group-hover\:block {
  display: block;
}
</style>
