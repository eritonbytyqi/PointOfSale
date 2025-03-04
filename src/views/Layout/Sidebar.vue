<template>
    <div class="w-64 h-screen bg-white text-gray-500 p-4">
      <!-- Flex container to align logo and menu items in a row (positioned lower) -->
      <div class="flex items-center space-x-4 mb-4 flex-col justify-end mt-10 mr-auto">
        <!-- Logo with margin-top to adjust its position -->
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <!-- Logo Image with adjusted size -->
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-12" alt="Flowbite Logo" />
          <!-- Logo Text with larger size and different font -->
          <span class="self-center text-3xl font-extrabold text-blue-800">QuickMed</span>
        </a>
      </div>
  
      <!-- Menu items with icons -->
      <ul class="space-y-4 mt-10">
        <!-- Home - House icon (SVG provided) -->
        <li>
          <a href="#" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span>Home</span>
          </a>
        </li>
  
        <!-- About - Information icon -->
        <li>
          <a href="#" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>About</span>
          </a>
        </li>
  
        <!-- Appointments - Calendar icon -->
        <li>
          <RouterLink :to="{name: 'appointments'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h10M7 16h10M3 4h18M3 20h18"></path>
            </svg>
            <span>Appointments</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink :to="{ name: 'doctors'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Doctors</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'departments'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Departments</span>
          </RouterLink>
        </li>

        <!-- Pricing - Currency icon -->
        <li>
          <RouterLink :to="{ name: 'payments'}" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Payments</span>
          </RouterLink>
        </li>
  
        <!-- Contact - Phone icon -->
        <li>
          <a href="#" class="flex items-center space-x-3 py-2 px-3 text-black rounded-md hover:text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
  };
  </script>
  
  <style scoped>
  /* Sidebar adjustments */
  .sidebar {
    width: 250px;
    background-color: #ffffff;
    color: #6b7280;
  }
  
  /* Logo text size and font */
  .sidebar a span {
    font-size: 2rem; /* Make logo text bigger */
    font-family: 'Arial', sans-serif; /* Use a font that fits the medical/pharmacy theme */
    font-weight: 700; /* Bold font for emphasis */
    color: #2c3e50; /* Dark color for logo text */
  }
  
  /* Menu items' hover effect with green color */
  .sidebar a:hover {
    color: #38a169; /* Dark green on hover */
  }
  
  /* Mobile responsive adjustments for sidebar */
  @media (max-width: 1024px) {
    .sidebar {
      display: none;
    }
  }
  </style>
  