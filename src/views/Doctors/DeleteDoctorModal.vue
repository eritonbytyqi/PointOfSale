<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDoctors } from "@/services/doctors.js";
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

// 🔹 Merr listën e doktorëve për departamentin kur hapet faqja
onMounted(() => {
  showSpinner.value = true;
  getDoctors()
    .then((response) => {
      doctors.value = response.result.data;
    })
    .catch((error) => {
      console.error("Error fetching doctors:", error);
    })
    .finally(() => {
      showSpinner.value = false;
    });
});

//  Fshij doktorin nga departamenti
const deleteDoctor = async () => {
  if (!selectedDoctor.value) {
    message.value = "Please select a doctor to remove.";
    success.value = false;
    return;
  }

  showSpinner.value = true;
  try {
    await deleteDoctorFromDepartment(departmentId, selectedDoctor.value);
    message.value = "Doctor removed successfully!";
    success.value = true;
    router.push({ name: "departments" }); // Kthehu te lista e departamenteve
  } catch (error) {
    message.value = "Failed to remove doctor.";
    success.value = false;
    console.error("Error:", error);
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