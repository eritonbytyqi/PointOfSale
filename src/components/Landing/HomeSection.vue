<template>
    <section 
      class="relative bg-gradient-to-r from-blue-50 to-blue-100 h-[800px] w-full flex items-center text-white"
      style="background-size: cover; background-position: center;">
      
      <div class="container mx-auto px-8 lg:px-20 text-center">
        <h1 class="text-5xl font-bold text-gray-800">Welcome to QuickMed</h1>
        <p class="text-lg mt-4 max-w-4xl mx-auto text-gray-700">
          Your trusted platform for booking medical appointments, managing doctors, and more. We offer a range of services to meet your healthcare needs.
        </p>
        <router-link 
          to="/appointments/create" 
          class="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition">
          Book an Appointment
        </router-link>
      </div>
  
    </section>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  /* Custom styles for spacing if needed */
  </style>
  