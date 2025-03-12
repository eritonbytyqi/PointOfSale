<!-- 
<template>
    <div class="relative flex items-center justify-center min-h-screen">
     
      <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: 'url(' + backgroundImage + ')', filter: 'blur(8px)' }"></div>

      <div class="w-full max-w-md p-8 bg-white bg-opacity-70 rounded-lg shadow-md relative z-10">
     
        <div class="flex justify-center mb-4">
          <img src="@/assets/logo/quickkk.png" alt="QuickMed Logo" class="w-12 h-12 animate-heartbeat">
        </div>
  
        
        <h2 class="text-2xl font-bold text-center text-blue-900 animate-fade-in">Login</h2>
  
        <form @submit.prevent="handleLogin" class="mt-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 animate-fade-in">Email</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              @focus="handleFocus"
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 animate-fade-in">Password</label>
            <input 
              v-model="password" 
              type="password" 
              required 
              class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          
          <button type="submit"
            class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 animate-fade-in">Login</button>
        </form>
      </div>
    </div>
</template>

<script>
import doctorhome from '@/assets/home/doctorhome.jpg';

export default {
    data() {
      return {
        email: '',
        password: '',
        backgroundImage: doctorhome,
      };
    },
    methods: {
      handleLogin() {
        console.log('Email:', this.email, 'Password:', this.password);
        // Add authentication logic here
      },
      handleFocus() {
        // Logic for focus if needed
      }
    }
};
</script>

<style scoped>
@keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
}

@keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.95);
    }
    75% {
      transform: scale(1.15);
    }
}

.animate-fade-in {
    animation: fadeIn 1s ease-out;
}

.animate-heartbeat {
    animation: heartbeat 1.5s infinite ease-in-out;
}
</style>
-->



<script setup>
import router from '@/router/index.js';
import { login } from '@/services/auth';
import { reactive } from 'vue';

const form = reactive({
  email: "",
  password: "",

})

const submit = () => {
  login(form).then(res => {
    if(res){
  router.push({name:'doctors'})
    }
});

}


</script>
<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submit()" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>

</template>
 