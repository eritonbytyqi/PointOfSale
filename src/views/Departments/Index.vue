<script setup>
import { ref, onMounted } from 'vue';
import { getDepartments } from '@/services/departments.js';
import Spinner from "@/components/Spinner.vue";
import DeleteModal from "@/views/Departments/DeleteModal.vue";
import DeleteDoctorModal from "@/views/Doctors/DeleteDoctorModal.vue";

const departments = ref([])
const showSpinner = ref(false)
const showDeleteModal = ref(false) 
const selectedDepartmentId = ref(null) 
const selectedDoctorId = ref(null);


const openDeleteModal = (departmentId) => {
  selectedDepartmentId.value = departmentId;
  showDeleteModal.value = true;
};


const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const showDeleteDoctorModal = ref(false);

const openDeleteDoctorModal = (departmentId, doctorId) => {
  selectedDepartmentId.value = departmentId;
  selectedDoctorId.value = doctorId;
  showDeleteDoctorModal.value = true;
};

const closeDeleteDoctorModal = () => {
  showDeleteDoctorModal.value = false;
};

onMounted(() => {
  showSpinner.value = true;
  getDepartments()
    .then((data) => {
      console.log(data.result.data);
      departments.value = data.result.data;
    })
    .catch((error) => {
      console.error('Error fetching departments:', error);
    })
    .finally(() => {
      showSpinner.value = false;
    });
});
</script>

<template>
  <Spinner v-if="showSpinner"/>
  <DeleteModal v-if="showDeleteModal" :departmentId="selectedDepartmentId" @closeDeleteModal="closeDeleteModal" />
  <DeleteDoctorModal v-if="showDeleteDoctorModal" :departmentId="selectedDepartmentId" :doctorId="selectedDoctorId" @closeDeleteModal="closeDeleteModal" />

  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">Department Dashboard</h1>

    <div class="text-right mb-6">
      <button 
        @click="navigateToCreateDepartment"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
        Add Department
      </button>
    </div>

    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full table-auto">
        <thead class="bg-blue-100 text-blue-800">
          <tr>
            <th class="px-6 py-4 text-left border-b font-medium">Name</th>
            <th class="px-6 py-4 text-left border-b font-medium">Doctors</th>
            <th class="px-6 py-4 text-left border-b font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="department in departments" :key="department.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ department.name }}</td>
            <td class="px-6 py-4">
            <span v-for="(doctor, index) in department.doctors" :key="doctor.id">
            {{ doctor.name }} {{ doctor.surname }}
            <span v-if="index < department.doctors.length - 1">, </span>
            </span>
            </td>
            <td class="px-6 py-4 flex space-x-2">
              <RouterLink :to="{ name: 'editDepartment', params: { id: department.id } }">
                <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200">
                  Edit
                </button>
              </RouterLink>

              <button
                @click="openDeleteModal(department.id)" 
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all duration-200">
                Delete
              </button>
              <RouterLink :to="{ name: 'addDoctor', params: { departmentId: department.id } }">
              <button 
              class="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-200">
              + Add Doctor
              </button>
              </RouterLink>
              <RouterLink :to="{ name: 'deleteDoctor', params: { departmentId: department.id } }">
              <button 
              class="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-200">
              - Remove Doctor
              </button>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


    
    <script>
    export default {
      methods: {
        // Navigate to the "Create Appointment" page
        navigateToCreateDepartment() {
          this.$router.push('/departments/create');
        },
    
        // Handle the "Edit" button click
        editDepartment(departments) {
          // Navigate to the edit page with the appointment details
          this.$router.push({ name: 'departments-edit', params: { id: departments.id } });
        },
    
        // Handle the "Delete" button click
        deleteDepartment(index) {
          // Ask for confirmation before deleting
          if (confirm('Are you sure you want to delete this department?')) {
            this.employees.splice(index, 1); // Remove the appointment from the list
          }
        },
        
        addDoctor(departmentId) {
          router.push({ name: "addDoctor", params: { departmentId } });
        },
        deleteDoctor(departmentId) {
          this.$router.push({ name: "deleteDoctor", params: { departmentId } });
        },

      },

      
    };
    </script>
    
    <style scoped>
    /* Adding some basic styles for better presentation */
    
    body {
      font-family: 'Inter', sans-serif;
    }
    
    /* Table Styling */
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    thead {
      background-color: #f3f4f6;
    }
    
    th, td {
      padding: 12px 16px;
      text-align: left;
    }
    
    th {
      font-size: 1rem;
      font-weight: bold;
      color: #2c3e50;
    }
    
    td {
      font-size: 1rem;
      color: #34495e;
    }
    
    tr:hover {
      background-color: #f9fafb;
    }
    
    /* Add some spacing for the button */
    button {
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    
    button:hover {
      transform: scale(1.05);
    }
    
    /* Make the table's rows a bit larger for better readability */
    tbody tr {
      font-size: 1rem;
      color: #6b7280;
    }
    
    /* Use softer background for the page */
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    </style>
    