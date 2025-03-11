<template>
<div class="w-64 min-h-screen bg-gradient-to-r from-blue-100 to-blue-10 fixed top-0 left-0">
      <div class="flex items-center space-x-4 mb-4 flex-col justify-end mt-10 mr-auto">
      <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="@/assets/logo/quickkk.png" class="h-12" alt="Flowbite Logo" />
        <span class="self-center text-3xl font-bold text-black">QuickMed</span>
      </a>
    </div>

    <ul class="space-y-4 mt-10">
      <li>
        <RouterLink :to="{name: 'appointments'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span>Home</span>
        </RouterLink>
      </li>

      <!-- Menu dropdown -->
      <li class="relative">
        <button @click="isOpen = !isOpen" class="flex items-center justify-between py-2 px-3 text-black rounded-md cursor-pointer hover:text-blue-600 w-full">
          <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h10M7 16h10M3 4h18M3 20h18"></path>
            </svg>
            <span>Appointments</span>
          </div>

          <!-- Toggle icon (rotate when open) -->
          <svg :class="{'rotate-180': isOpen}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 transform transition-all duration-200">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Submenu (only visible when isOpen is true) -->
        <ul v-show="isOpen" class="mt-1 space-y-1 border-2 border-gray-200 rounded-md pt-2">
          <li>
            <RouterLink :to="{ name: 'appointments' }" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h18M3 9h18M3 13h18M3 17h18M3 21h18" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v18" />
                <circle cx="5" cy="5" r="1.5" fill="currentColor" />
                <circle cx="5" cy="9" r="1.5" fill="currentColor" />
                <circle cx="5" cy="13" r="1.5" fill="currentColor" />
                <circle cx="5" cy="17" r="1.5" fill="currentColor" />
                <circle cx="5" cy="21" r="1.5" fill="currentColor" />
              </svg>
              <span>All Appointments</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'confirmed-appointments' }" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <circle cx="12" cy="12" r="9" stroke="green" stroke-width="1.5"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" stroke="green"/>
              </svg>
              <span>Confirmed Appointments</span>
            </RouterLink>
          </li>
        </ul>
      </li>

      <li>
        <RouterLink :to="{ name: 'doctors'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5c1.935 0 3.5 1.565 3.5 3.5S13.935 11.5 12 11.5 8.5 9.935 8.5 8 10.065 4.5 12 4.5zM3 20.25v-3.5a7.002 7.002 0 0114 0v3.5M6 16h12" />
          </svg>
          <span>Doctors</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'departments'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20m10-10H2" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
          </svg>
          <span>Departments</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'payments'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span>Payments</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<style scoped>
/* Add styling adjustments */
.sidebar {
  width: 250px;
  background-color: #ffffff;
  color: #6b7280;
}

/* Logo styling */
.sidebar a span {
  font-size: 2rem;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  color: #2c3e50;
}

/* Hover effect on menu items */
.sidebar a:hover {
  color: #38a169;
}

@media (max-width: 1024px) {
  .sidebar {
    display: none;
  }
}
</style>
