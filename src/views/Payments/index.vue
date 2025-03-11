<script setup>
import { ref, computed, onMounted } from 'vue';
import { getPayments } from '@/services/payments';
import Spinner from "@/components/Spinner.vue";
import DeleteModal from "@/views/Doctors/DeleteModal.vue";

const payments = ref([]);
const searchQuery = ref('');
const showSpinner = ref(false);
const showDeleteModal = ref(false);

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Filtron pagesat sipas emrit të pacientit
const filteredPayments = computed(() => {
  return payments.value.filter(payment =>
    payment.appointment?.fullname?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  showSpinner.value = true;
  getPayments()
    .then((data) => {
      payments.value = data.result.data;
    })
    .catch((error) => {
      console.error('Error fetching payments:', error);
    })
    .finally(() => {
      showSpinner.value = false;
    });
});
</script>

<template>
  <Spinner v-if="showSpinner" />
  <DeleteModal v-if="showDeleteModal" @closeDeleteModal="closeDeleteModal" />

  <div class="p-6 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg min-h-screen">
    <h1 class="text-4xl font-bold text-center text-black-600 mb-8">Payments Dashboard</h1>

   
    <div class="mb-4">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search by Name..." 
        class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 w-64"
      />
    </div>

    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-3 text-left border-b font-semibold">Full Name</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Personal Id</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Amount</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Status</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Method</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in filteredPayments" :key="payment.id" class="border-b hover:bg-gray-100">
            <td class="px-6 py-3 text-gray-800">{{ payment.appointment?.fullname }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.appointment?.personal_id }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.amount }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.status }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.payment_method }}</td>
          </tr>
        </tbody>
      </table>
      
      <p v-if="filteredPayments.length === 0" class="text-center text-gray-500 py-4">
        No payments found.
      </p>
    </div>
  </div>
</template>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 16px;
  text-align: left;
}

th {
  font-weight: bold;
  color: #2c3e50;
  background-color: #f3f4f6; 
}

td {
  color: #34495e; 
}

tbody tr:hover {
  background-color: #f9fafb;
}

/* Input styling */
input {
  transition: all 0.2s ease-in-out;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}
</style>
