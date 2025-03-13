<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAppointmentsPending, updateAppointmentStatus } from '@/services/appointments.js';
import Spinner from "@/components/Spinner.vue";

const appointments = ref([]);
const searchQuery = ref("");
const showSpinner = ref(false);
const selectedAction = ref(null);
const showModal = ref(false);
const selectedAppointment = ref(null);
const router = useRouter();

// Merr terminet nga API dhe cakto statusin nga localStorage
onMounted(() => {
  showSpinner.value = true;
  getAppointmentsPending()
    .then((data) => {
      appointments.value = data?.result?.data?.map(appt => ({
        ...appt,
        status: localStorage.getItem(`appointment-${appt.id}`) || "pending"
      })) || [];
    })
    .catch((error) => {
      console.error('Error fetching appointments:', error);
    })
    .finally(() => {
      showSpinner.value = false;
    });
});

// Funksioni për të ndryshuar statusin e një termini
const changeStatus = async (appointment, status) => {
  try {
    const response = await updateAppointmentStatus(appointment.id, status);
    if (response) {
      appointment.status = status;
      localStorage.setItem(`appointment-${appointment.id}`, status);
    } else {
      alert("Failed to update appointment status.");
    }
  } catch (error) {
    console.error("Failed to update appointment status:", error);
    alert("There was an error updating the appointment status. Please try again.");
  }
};

// Konfirmimi i ndryshimit të statusit
const confirmAction = () => {
  if (selectedAction.value && selectedAppointment.value) {
    changeStatus(selectedAppointment.value, selectedAction.value);
  }
  showModal.value = false;
};

// Hap modalin për konfirmim
const openModal = (appointment, action) => {
  selectedAppointment.value = appointment;
  selectedAction.value = action;
  showModal.value = true;
};

const actionTexts = {
  confirmed: "confirm",
  canceled: "cancel"
};

// Teksti i modalit
const modalText = computed(() => {
  if (selectedAction.value) {
    return `Are you sure you want to ${actionTexts[selectedAction.value]} this appointment?`;
  }
  return "";
});

// Kontrollo tekstin e butonit
const buttonText = (appointment) => {
  return appointment.status === 'confirmed' ? 'confirmed' : 'confirm';
};
const buttonTexxt = (appointment) => {
  return appointment.status === 'canceled' ? 'cancelled' : 'cancel';
};
</script>

<template>
  <Spinner v-if="showSpinner" />
  <div class="p-6 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg min-h-screen">
    <h1 class="text-4xl font-bold text-center text-black-600 mb-8">Pending Appointments Dashboard</h1>
    
    <div class="flex justify-between mb-4">
      <input v-model="searchQuery" type="text" placeholder="Search by name" 
             class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 w-64">
    </div>
    
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-100 text-gray-800">
          <tr>
            <th class="px-3 py-2 border-b">Department</th>
            <th class="px-3 py-2 border-b">Full Name</th>
            <th class="px-3 py-2 border-b">Email</th>
            <th class="px-3 py-2 border-b">Phone Number</th>
            <th class="px-3 py-2 border-b">Personal ID</th>
            <th class="px-3 py-2 border-b">Date</th>
            <th class="px-3 py-2 border-b">Time</th>
            <th class="px-3 py-2 border-b">Doctor</th>
            <th class="px-3 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments.filter(appt => appt.fullname.toLowerCase().includes(searchQuery.toLowerCase()))" 
              :key="appointment.id"
              :class="{
                'bg-gray-100': appointment.status === 'pending',
              }">
            <td class="px-3 py-2 text-base">{{ appointment.department.name }}</td>
            <td class="px-3 py-2 text-base">{{ appointment.fullname }}</td>
            <td class="px-3 py-2 text-base">{{ appointment.email }}</td>
            <td class="px-3 py-2 text-base">{{ appointment.phoneNumber }}</td>
            <td class="px-3 py-2 text-base">{{ appointment.personal_id }}</td>
            <td class="px-3 py-2 text-base">{{ appointment.date }}</td>
            <td class="px-3 py-2 text-base">{{ appointment.time }}</td>
            <td class="px-3 py-2 text-base">{{ appointment.doctor?.name }} {{ appointment.doctor?.surname }}</td>
            <td class="px-3 py-2 flex flex-col space-y-1">
              <button @click="openModal(appointment, 'confirmed')" 
                      :disabled="appointment.status === 'confirmed'" 
                      class="px-2 py-1 bg-orange-400 text-white rounded">
                {{ buttonText(appointment) }}
            </button>
                <button @click="openModal(appointment, 'canceled')" 
                      :disabled="appointment.status === 'canceled'" 
                      class="px-2 py-1 bg-red-400 text-white rounded">
                {{ buttonTexxt(appointment) }}
            </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Modal për konfirmim -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <p class="text-lg mb-4">{{ modalText }}</p>
        <div class="flex justify-center space-x-2">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="confirmAction" class="px-4 py-2 bg-red-500 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
