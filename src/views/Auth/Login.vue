<script setup>
import router from '@/router/index.js';
import { login, checkEmailExists } from '@/services/auth.js';
import { reactive } from 'vue';
import doctorhome from '@/assets/home/doctorhome.jpg';

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const backgroundImage = doctorhome; // Background image path

const submit = async () => {
  if (!validateForm()) return;

  const emailExists = await checkEmailExists(form.email);
  if (emailExists) {
    errors.email = "This email is not registered.";
    errors.password = "";
    return;
  } else {
    errors.email = "";
  }

  login(form).then(res => {
    if (res) {
      router.push({ name: 'home' });
    } else {
      errors.password = "Incorrect password.";
    }
  }).catch(() => {
    errors.password = "An error occurred during login.";
  });
};

const validateForm = () => {
  let isValid = true;

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  } else {
    errors.password = "";
  }

  return isValid;
};
</script>
<template>
  <div class="relative flex items-center justify-center min-h-screen">
    <!-- Background Image me Blur -->
    <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: 'url(' + backgroundImage + ')', filter: 'blur(8px)' }"></div>
    
    <!-- Form Container -->
    <div class="w-full max-w-md p-8 bg-white bg-opacity-70 rounded-lg shadow-md relative z-10">
      <!-- Logo -->
      <div class="flex justify-center mb-4">
        <img src="@/assets/logo/quickkk.png" alt="QuickMed Logo" class="w-12 h-12 animate-heartbeat">
      </div>
      
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-blue-900 animate-fade-in">Login</h2>
      
      <!-- Form -->
      <form @submit.prevent="submit" class="mt-4">
        <!-- Email Input -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 animate-fade-in">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>
        
        <!-- Password Input -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 animate-fade-in">Password</label>
          <input 
            v-model="form.password" 
            type="password" 
            required 
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>
        
        <!-- Submit Button -->
        <button type="submit" class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 animate-fade-in">Login</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
@keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.1); }
    50% { transform: scale(0.95); }
    75% { transform: scale(1.15); }
}

.animate-fade-in {
    animation: fadeIn 1s ease-out;
}

.animate-heartbeat {
    animation: heartbeat 1.5s infinite ease-in-out;
}

.text-red-500 {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>