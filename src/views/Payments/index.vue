<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getPayments, updatePaymentStatus } from '@/services/payments';
import Spinner from "@/components/Spinner.vue";
import { useRoute, useRouter } from 'vue-router';

const payments = ref([]);
const searchQuery = ref('');
const showSpinner = ref(false);
const selectedPayment = ref(null); // Add this to define selectedPayment
const router = useRouter();

const markAsCompleted = (paymentId) => {
  const payment = payments.value.find(p => p.id === paymentId);
  if (payment && payment.status !== 'Completed') {
    updatePaymentStatus(paymentId, 'Completed')
      .then(() => {
        payment.status = 'Completed';

        let completedPayments = JSON.parse(localStorage.getItem('completedPayments')) || [];
        if (!completedPayments.includes(paymentId)) {
          completedPayments.push(paymentId);
          localStorage.setItem('completedPayments', JSON.stringify(completedPayments));
        }
        window.location.reload(); 
        payment.showCompleteButton = false;
        payments.value = payments.value.filter(p => p.id !== paymentId);
      })
      .catch((error) => {
        console.error('Error updating payment status:', error);
      });
  }
};

const loadPayments = () => {
  showSpinner.value = true;
  getPayments()
    .then((data) => {
      console.log(data);  // Kontrollo të dhënat që po merr
      payments.value = data.result.data;

      const completedPayments = JSON.parse(localStorage.getItem('completedPayments')) || [];
      payments.value = payments.value.filter(payment => !completedPayments.includes(payment.id)); 
    })
    .catch((error) => {
      console.error('Error fetching payments:', error);
    })
    .finally(() => {
      showSpinner.value = false;
    });
};


onMounted(() => {
  loadPayments();
});

// Filter payments based on search query
const filteredPayments = computed(() => {
  return payments.value.filter(payment => 
    payment.appointment?.fullname.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Watch for changes in selectedPayment's status
watch(() => selectedPayment.value?.status, (newValue) => {
  if (newValue === "completed") {
    window.location.reload();  
  }
});
</script>

<template>
  <Spinner v-if="showSpinner" />

  <div class="p-6 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg min-h-screen">
    <h1 class="text-4xl font-bold text-center text-black-600 mb-8">Payments Dashboard</h1>

    <!-- Search bar -->
    <div class="mb-4">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search by Name..." 
        class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 w-64"
      />
    </div>

    <!-- Payments Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-3 text-left border-b font-semibold">Full Name</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Personal Id</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Amount</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Status</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Method</th>
            <th class="px-6 py-3 text-left border-b font-semibold">Actions</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in filteredPayments" :key="payment.id" class="border-b hover:bg-gray-100">
            <td class="px-6 py-3 text-gray-800">{{ payment.appointment?.fullname }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.appointment?.personal_id }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.amount }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.status }}</td>
            <td class="px-6 py-3 text-gray-800">{{ payment.payment_method }}</td>

            <td class="px-6 py-3 text-gray-800 flex space-x-2">
              <RouterLink :to="{ name: 'editPayment', params: { id: payment.id } }">
                <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200">
                  Edit
                </button>
              </RouterLink>

              <button 
                v-if="payment.status !== 'Completed'" 
                @click="markAsCompleted(payment.id)" 
                class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-all duration-200">
                Complete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="filteredPayments.length === 0" class="text-center text-gray-500 py-4">
        No payments found.
      </p>
    </div>
  </div>
</template>
