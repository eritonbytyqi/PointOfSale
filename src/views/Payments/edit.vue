<script setup>
import { onMounted, reactive, ref } from "vue";
import { showPayment, updatePayment } from "@/services/payments.js"; 
import { useRoute } from "vue-router";
import router from "@/router/index.js";
import Spinner from "@/components/Spinner.vue";

const route = useRoute();

const form = reactive({
  amount: "",
  payment_method: "",
  status: "",
});

const showSpinner = ref(false);
const message = ref("");
const success = ref(false);

const submit = async () => {
  try {
    console.log('Form data being submitted:', form); 

    if (!form || !form.status) {
      console.error('Form is missing status or required fields.');
      message.value = 'Error: Payment data is incomplete.';
      success.value = false;
      return;
    }

    const response = await updatePayment(route.params.id, form);
    if (response) {
      message.value = 'Payment updated successfully!';
      success.value = true;
      router.push({ name: 'payments' }); 
    }
  } catch (error) {
    message.value = 'Error updating payment.';
    success.value = false;
    console.error('Error:', error);
  }
};

onMounted(() => {
  if (!route.params.id) {
    console.error("Payment ID is not provided in the route.");
    return; 
  }

  showSpinner.value = true;
  showPayment(route.params.id)
    .then(res => {
      console.log("Response from showPayment:", res);

      if (res && res.result) {
        form.amount = res.result.amount || '';
        form.payment_method = res.result.payment_method || '';
        form.status = res.result.status || ''; 
      }
    })
    .finally(() => {
      showSpinner.value = false;
    });
});
</script>

<template>
  <Spinner v-if="showSpinner"/>
  <div class="py-10 min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">Edit Payment</h1>

      <div v-if="message" :class="success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
           class="p-3 rounded-md mb-4">
        {{ message }}
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount:</label>
          <input type="number" id="amount" v-model="form.amount" required
                 class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        </div>

        <div>
          <label for="method" class="block text-sm font-medium text-gray-700">Payment Method:</label>
          <select id="method" v-model="form.payment_method" required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status:</label>
          <select id="status" v-model="form.status" required
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select Status</option>
            <option value="partially">partially</option>
            <option value="paid">paid</option>
          </select>
        </div>

        <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">
          Save
        </button>
      </form>
    </div>
  </div>
</template>
