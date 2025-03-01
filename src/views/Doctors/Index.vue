<script setup>
import { ref, onMounted } from 'vue';
import { getDoctors } from '@/services/doctors.js';
import Spinner from "@/components/Spinner.vue";
import DeleteModal from "@/views/Doctors/DeleteModal.vue";

const doctors = ref(null)
const showSpinner = ref(false)
const showDeleteModal = ref(false) 
const selectedDoctorId = ref(null) 


const openDeleteModal = (doctorId) => {
  selectedDoctorId.value = doctorId;
  showDeleteModal.value = true;
};


const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

onMounted(() => {
  showSpinner.value = true;
  getDoctors()
    .then((data) => {
      console.log(data.result.data);
      doctors.value = data.result.data;
    })
    .catch((error) => {
      console.error('Error fetching doctors:', error);
    })
    .finally(() => {
      showSpinner.value = false;
    });
});
</script>

<template>
  <Spinner v-if="showSpinner"/>
  <DeleteModal v-if="showDeleteModal" :doctorId="selectedDoctorId" @closeDeleteModal="closeDeleteModal" />

  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">Doctor Dashboard</h1>

    <div class="text-right mb-6">
      <button 
        @click="navigateToCreateDoctor"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
        Add Doctor
      </button>
    </div>

    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full table-auto">
        <thead class="bg-blue-100 text-blue-800">
          <tr>
            <th class="px-6 py-4 text-left border-b font-medium">Name</th>
            <th class="px-6 py-4 text-left border-b font-medium">Surname</th>
            <th class="px-6 py-4 text-left border-b font-medium">Phone</th>
            <th class="px-6 py-4 text-left border-b font-medium">Description</th>
            <th class="px-6 py-4 text-left border-b font-medium">Department</th>
            <th class="px-6 py-4 text-left border-b font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in doctors" :key="doctor.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ doctor.name }}</td>
            <td class="px-6 py-4">{{ doctor.surname }}</td>
            <td class="px-6 py-4">{{ doctor.phone }}</td>
            <td class="px-6 py-4">{{ doctor.description }}</td>
            <!-- Me i shfaq edhe departamentet e doktorit -->
            <td class="px-6 py-4">
            <span v-for="(department, index) in doctor.departments" :key="department.id">
            {{ department.name }} 
            <span v-if="index < doctor.departments.length - 1">, </span>
            </span>
            </td>
            <td class="px-6 py-4 flex space-x-2">
              <RouterLink :to="{ name: 'editDoctor', params: { id: doctor.id } }">
                <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200">
                  Edit
                </button>
              </RouterLink>

              <button
                @click="openDeleteModal(doctor.id)" 
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all duration-200">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


    
    <script>
    export default {
      data() {
        return {
          employees: [
            {
              department: 'HR',
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              phoneNumber: '+1234567890',
              personalId: 'A12345678',
              date: '2025-02-28',
              time: '09:00 AM',
            },
            {
              department: 'Finance',
              fullName: 'Jane Smith',
              email: 'jane.smith@example.com',
              phoneNumber: '+0987654321',
              personalId: 'B87654321',
              date: '2025-02-28',
              time: '10:00 AM',
            },
            // Add more sample data here as needed
          ]
        };
      },
      methods: {
        // Navigate to the "Create Appointment" page
        navigateToCreateDoctor() {
          this.$router.push('/doctors/create');
        },
    
        // Handle the "Edit" button click
        editDoctor(employee) {
          // Navigate to the edit page with the appointment details
          this.$router.push({ name: 'doctors-edit', params: { id: employee.personalId } });
        },
    
        // Handle the "Delete" button click
        deleteDoctor(index) {
          // Ask for confirmation before deleting
          if (confirm('Are you sure you want to delete this doctor?')) {
            this.employees.splice(index, 1); // Remove the appointment from the list
          }
        }
      }
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
    