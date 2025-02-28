<template>
  <!-- Main container -->
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content area -->
    <div class="flex-1 p-4">
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
