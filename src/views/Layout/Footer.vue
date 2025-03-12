<template>
    <!-- Footer Section -->
    <footer class="bg-white text-gray-800 p-6 shadow-md">
      <div class="max-w-screen-xl mx-auto flex justify-between items-center">
        <!-- Contact Information Section -->
        <div>
          <p class="font-semibold text-lg">Contact Us</p>
          <p class="text-sm">Phone: (123) 456-7890</p>
          <p class="text-sm">Email: support@hospital.com</p>
        </div>
  
        <!-- Quick Links Section -->
        <div>
          <p class="font-semibold text-lg">Quick Links</p>
          <ul class="space-y-2">
            <li><a href="#" class="text-blue-500 hover:underline">Privacy Policy</a></li>
            <li><a href="#" class="text-blue-500 hover:underline">Terms of Service</a></li>
          </ul>
        </div>
  
        <!-- Social Media Section (Optional) -->
        <div>
          <p class="font-semibold text-lg">Follow Us</p>
          <div class="flex space-x-4">
            <a href="#" class="text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm9 2H9v10h5V7z" />
              </svg>
            </a>
            <a href="#" class="text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm9 2H9v10h5V7z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  footer {
    background-color: white;
    color: #2d3748; /* Darker text for better contrast */
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  footer svg {
    transition: all 0.3s ease;
  }
  
  footer svg:hover {
    color: #3182ce; /* Blue hover color for icons */
  }
  </style>
  