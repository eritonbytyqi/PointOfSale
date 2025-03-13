<script setup>
import router from '@/router/index.js';
import { login, checkEmailExists } from '@/services/auth.js';
import { reactive } from 'vue';

const form = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

const submit = async () => {
  // Kontrollo validimin e formës
  if (!validateForm()) return;

  // Kontrollo nëse emaili është i regjistruar
  const emailExists = await checkEmailExists(form.email);

  // Nëse emaili nuk është regjistruar, shfaq gabimin dhe kthehu
  if (emailExists) {
    errors.email = "This email is not registered.";
    errors.password = ""; // Pastroni gabimin për password-in
    return;
  } else {
    errors.email = ""; // Pastroni gabimin për email-in nëse ekziston
  }

  // Kryej login-in nëse emaili ekziston
  login(form).then(res => {
    if (res) {
      router.push({ name: 'home' });
    } else {
      errors.password = "Incorrect password."; // Gabim nëse passwordi është gabim
    }
  }).catch(() => {
    errors.password = "An error occurred during login.";
  });
};

// Funksioni i validimit
const validateForm = () => {
  let isValid = true;

  // Kontrollo passwordin
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
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submit()" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              v-model="form.email"
              type="email"
              id="email"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
<p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input
              v-model="form.password"
              type="password"
              id="password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button 
            type="submit" 
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add some styles for error messages */
p.text-red-500 {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
