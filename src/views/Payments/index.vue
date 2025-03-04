<script setup>
import { ref, onMounted } from 'vue';
import { getDoctors } from '@/services/doctors.js';
import Spinner from "@/components/Spinner.vue";
import DeleteModal from "@/views/Doctors/DeleteModal.vue";
import { getPayments } from '@/services/payments';
import { getAppointments } from '@/services/appointments';

const payments = ref(null)
const showSpinner = ref(false)
const showDeleteModal = ref(false) 


const openDeleteModal = (doctorId) => {
  showDeleteModal.value = true;
};


const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

onMounted(() => {
  showSpinner.value = true;
  getPayments()
    .then((data) => {
      console.log(data.result.data);
      payments.value = data.result.data;
    })
    .catch((error) => {
      console.error('Error fetching payments:', error);
    });
    showSpinner.value = false;

  
});
</script>

<template>
  <Spinner v-if="showSpinner"/>
  <DeleteModal v-if="showDeleteModal" :doctorId="selectedDoctorId" @closeDeleteModal="closeDeleteModal" />

  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">payments Dashboard</h1>

    <div class="text-right mb-6">
      <button 
        @click="navigateToCreatePayment"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
        Add payment
      </button>
    </div>

    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full table-auto">
        <thead class="bg-blue-100 text-blue-800">
          <tr>
            <th class="px-6 py-4 text-left border-b font-medium">fullname</th>
            <th class="px-6 py-4 text-left border-b font-medium">personal_id</th>
            <th class="px-6 py-4 text-left border-b font-medium">amount</th>
            <th class="px-6 py-4 text-left border-b font-medium">status</th>
            <th class="px-6 py-4 text-left border-b font-medium">method</th>
            <th class="px-6 py-4 text-left border-b font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ payment.appointment?.fullname }}</td>
            <td class="px-6 py-4">{{ payment.appointment?.personal_id }}</td>

            <td class="px-6 py-4">{{ payment.amount }}</td>
            <td class="px-6 py-4">{{ payment.status }}</td>
            <td class="px-6 py-4">{{ payment.payment_method }}</td>
            <!-- <td class="px-6 py-4">{{ doctor.description }}</td> -->
            <!-- Me i shfaq edhe departamentet e doktorit -->
            <td class="px-6 py-4">
           
            </td>
            <td class="px-6 py-4 flex space-x-2">
             

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


    
    <script >
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
          this.$router.push('/payments/create');
        },
    
        // Handle the "Edit" button click
        editDoctor(doctors) {
          // Navigate to the edit page with the appointment details
          this.$router.push({ name: 'doctors-edit', params: { id: doctors.personalId } });
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
    