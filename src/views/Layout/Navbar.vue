<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 mb-4">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Profile Dropdown aligned to the right -->
        <div class="relative ml-auto">
          <button 
            class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            @click="toggleDropdown"
          >
            <img src="https://flowbite.com/docs/images/logo.svg" alt="User Profile" class="w-8 h-8 rounded-full"/>
            <span>John Doe</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
  
          <!-- Dropdown Menu (Only visible when isDropdownOpen is true) -->
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <ul class="py-1 text-gray-700">
              <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    data() {
      return {
        // Flag to control dropdown visibility
        isDropdownOpen: false
      };
    },
    methods: {
      // Toggle the dropdown visibility
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      }
    }
  };
  </script>
  
  <style scoped>
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
  
  .ml-auto {
    margin-left: auto; /* Aligns profile dropdown to the right */
  }
  
  /* Ensure dropdown stays hidden when isDropdownOpen is false */
  </style>
  