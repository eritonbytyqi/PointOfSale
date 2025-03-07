<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDoctorss} from "@/services/doctors.js";
import { deleteDoctorFromDepartment } from "@/services/departments.js";
import Spinner from "@/components/Spinner.vue";

const route = useRoute();
const router = useRouter();
const departmentId = route.params.departmentId;

const doctors = ref([]);
const selectedDoctor = ref(null);
const message = ref("");
const success = ref(false);
const showSpinner = ref(false);

// 🔹 Merr listën e doktorëve vetëm për këtë departament
onMounted(() => {
  showSpinner.value = true;
  showSpinner.value = true; // Fillon loading

getDoctorss(departmentId)
  .then((response) => {
    console.log("API Response:", response); // Kontrollo përgjigjen e API

    if (response.data && Array.isArray(response.data.data)) {
      doctors.value = response.data.data;
      console.log("Doktorët e marrë:", doctors.value);
    } else {
      console.error("Struktura e përgjigjes nuk është e pritur:", response);
      doctors.value = []; 
    }
  })
  .catch((error) => {
    console.error("Gabim në marrjen e doktorëve:", error);
    doctors.value = [];
  })
  .finally(() => {
    showSpinner.value = false; // 🚀 Sigurohemi që spinner ndalet gjithmonë
  });


});

// 🔹 Fshij doktorin nga departamenti
const deleteDoctor = async () => {
  if (!selectedDoctor.value) {
    message.value = "Ju lutem zgjidhni një doktor për të hequr.";
    success.value = false;
    return;
  }

  showSpinner.value = true;
  try {
    await deleteDoctorFromDepartment(departmentId, selectedDoctor.value);
    message.value = "Doktori u hoq me sukses!";
    success.value = true;
    router.push({ name: "departments" }); // Kthehu te lista e departamenteve
} catch (error) {
    showSpinner.value = false;
    
    // Kontrollo nëse gabimi është 404
    if (error.response && error.response.status === 404) {
        message.value = "Doktori nuk u gjet ose ka ndodhur një gabim gjatë fshirjes.";
    } else {
        // Për çdo gabim tjetër, tregoni mesazhin e përgjithshëm të gabimit
        message.value = `Gabim gjatë fshirjes së doktorit: ${error.message}`;
    }
    
    success.value = false;
    console.error("Gabim:", error);
} finally {
    showSpinner.value = false;
}


};
</script>



<template>
  <Spinner v-if="showSpinner"/>
  <div class="min-h-screen flex justify-center items-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">Remove Doctor from Department</h1>

      <div v-if="message" :class="success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
           class="p-3 rounded-md mb-4">
        {{ message }}
      </div>

      <div>
        <label for="doctor" class="block text-sm font-medium text-gray-700">Select Doctor:</label>
        <select v-model="selectedDoctor" id="doctor"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} {{ doctor.surname }}
          </option>
        </select>
      </div>

      <button @click="deleteDoctor"
              class="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">
        Remove Doctor
      </button>
    </div>
  </div>
</template>