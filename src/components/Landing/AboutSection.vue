<template>
    <section id=about class="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div class="container mx-auto px-6 text-center md:text-left max-w-4xl">
        <h2 class="text-4xl font-bold text-gray-800">About QuickMed</h2>
        <p class="mt-4 text-gray-600 text-lg leading-relaxed">
          At <span class="text-blue-600 font-semibold">QuickMed</span>, we believe in making healthcare 
          **fast, accessible, and hassle-free**. Our platform connects patients with 
          trusted doctors, allowing seamless appointment booking and secure online payments.
        </p>
  
        <p class="mt-4 text-gray-600 text-lg leading-relaxed">
          With over **5 years of experience** in the healthcare industry, QuickMed has successfully
          helped thousands of patients book appointments with top professionals. Our mission is to continue
          revolutionizing healthcare by providing innovative solutions and ensuring top-quality service.
        </p>
  
        <div class="mt-6 bg-white p-6 rounded-lg shadow-md text-left">
          <h3 class="text-2xl font-semibold text-blue-700">Why Choose QuickMed?</h3>
          <ul class="mt-4 space-y-2 text-gray-700">
            <li>✅ <strong>Fast & Secure Appointments</strong> – Book visits in seconds.</li>
            <li>✅ <strong>Verified Doctors & Clinics</strong> – Only trusted professionals.</li>
            <li>✅ <strong>Transparent Payments</strong> – No hidden fees or surprises.</li>
          </ul>
        </div>
  
        <router-link 
          to="/about" 
          class="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
          Learn More
        </router-link>
      </div>
    </section>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  