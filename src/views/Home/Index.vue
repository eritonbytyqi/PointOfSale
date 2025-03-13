<script setup>
import { ref, onMounted } from 'vue';
import { getDoctorsCount, getDepartmentsCount, getCompletedAppointmentsCount, getPendingAppointmentsCount, getPaymentsCount } from '@/services/stats.js';
import Spinner from "@/components/Spinner.vue";


const doctorsCount = ref(0);
const departmentsCount = ref(0);
const completedAppointments = ref(0);
const pendingAppointments = ref(0);
const totalPayments = ref(0);
const showSpinner = ref(false);

// Task Management
const newTask = ref("");
const tasks = ref([]);

// Add new task
const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push(newTask.value);
    newTask.value = ""; // Clear input after adding
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  }
};

// Delete a task
const deleteTask = (index) => {
  tasks.value.splice(index, 1); // Remove task
  // Save updated tasks to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

onMounted(async () => {
  showSpinner.value = true;
  try {
    // Fetch statistics from stats.js
    doctorsCount.value = await getDoctorsCount();
    departmentsCount.value = await getDepartmentsCount();
    completedAppointments.value = await getCompletedAppointmentsCount();
    pendingAppointments.value = await getPendingAppointmentsCount();
    totalPayments.value = await getPaymentsCount();
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
    tasks.value = savedTasks;
  }
  } catch (error) {
    console.error("Error fetching statistics:", error);
  } finally {
    showSpinner.value = false;
  }
});


</script>

<template>
      <Spinner v-if="showSpinner" />

      <!-- Greeting message -->
      <div class="mb-4 text-3xl font-bold text-gray-800">
        Hello, Valza
      </div>

      <!-- Statistics Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 bg-white shadow rounded-lg text-center">
          <h3 class="text-lg font-semibold">Doktorë total</h3>
          <p class="text-2xl font-bold">{{ doctorsCount }}</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg text-center">
          <h3 class="text-lg font-semibold">Departamente total</h3>
          <p class="text-2xl font-bold">{{ departmentsCount }}</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg text-center">
          <h3 class="text-lg font-semibold">Terminet e përfunduara</h3>
          <p class="text-2xl font-bold">{{ completedAppointments }}</p>
        </div>
        <div class="p-4 bg-white shadow rounded-lg text-center">
          <h3 class="text-lg font-semibold">Pagesa totale</h3>
          <p class="text-2xl font-bold">
            ${{ totalPayments }}
          </p>
        </div>
      </div>

<!-- Quick Actions Section -->
<div class="p-6 bg-white shadow-lg rounded-xl mt-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link to="/appointments/create" class="flex items-center p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Add Appointment</span>
      </router-link>
      <router-link to="/appointments/confirmed" class="flex items-center p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>View Confirmed Appointments</span>
      </router-link>
      <router-link to="#" class="flex items-center p-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Contact Support</span>
      </router-link>
    </div>
</div>
  <!-- Task Managment -->
  <div class="p-6 bg-white shadow-lg rounded-xl mt-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Task Management</h3>

    <!-- Input & Add Button -->
    <div class="flex mb-4">
      <input
        v-model="newTask"
        type="text"
        placeholder="Enter new task..."
        class="flex-1 p-2 border rounded-md"
      />
      <button 
        @click="addTask"
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </div>

    <!-- Tasks Table -->
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 text-left">Task</th>
          <th class="p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index" class="border-t">
          <td class="p-2">{{ task }}</td>
          <td class="p-2 text-center">
            <button 
              @click="deleteTask(index)"
              class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Administrative Overview -->
  <div class="p-6 bg-white shadow-lg rounded-xl mt-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Administrative Overview</h3>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 text-left">Activity</th>
          <th class="p-2 text-center">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t">
          <td class="p-2">Pending Appointments</td>
          <td class="p-2 text-center">
            <RouterLink to="/appointments/pending" class="text-blue-500">View</RouterLink>
          </td>
        </tr>
        <tr class="border-t">
          <td class="p-2">Recent Payments</td>
          <td class="p-2 text-center">
            <RouterLink to="/payments" class="text-blue-500">Details</RouterLink>
          </td>
        </tr>
        <tr class="border-t">
          <td class="p-2">Registered Doctors</td>
          <td class="p-2 text-center">
            <RouterLink to="/doctors" class="text-blue-500">View</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

      <!-- Content area for dynamic content -->
      <div class="max-w-6xl mx-auto">
        <router-view></router-view>
      </div>
      

</template>

<style scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.right-0 {
  right: 0;
}

.relative:hover .group-hover\:block {
  display: block;
}
</style>
