<script setup>
import { ref, onMounted } from 'vue';
import { getAppointments } from '@/services/appointments.js';

const appointments = ref(null);

onMounted(() => {
  getAppointments().then((data) => {
      console.log(data.result.data);
      appointments.value = data.result.data; // Store the data in the reactive variable
       // Log the data for debugging
    })
    .catch((error) => {
      console.error('Error fetching appointments:', error); // Handle the error
    });
});
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-blue-600 mb-8">Appointments Dashboard</h1>

    <!-- Button to add an appointment -->
    <div class="text-right mb-6">
      <button 
        @click="navigateToCreateAppointment"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
        Add Appointment
      </button>
    </div>

    <!-- Table to display appointments -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full table-auto">
        <thead class="bg-blue-100 text-blue-800">
          <tr>
            <th class="px-6 py-4 text-left border-b font-medium">Department</th>
            <th class="px-6 py-4 text-left border-b font-medium">Full Name</th>
            <th class="px-6 py-4 text-left border-b font-medium">Email</th>
            <th class="px-6 py-4 text-left border-b font-medium">Phone Number</th>
            <th class="px-6 py-4 text-left border-b font-medium">Personal ID</th>
            <th class="px-6 py-4 text-left border-b font-medium">Date</th>
            <th class="px-6 py-4 text-left border-b font-medium">Time</th>
            <th class="px-6 py-4 text-left border-b font-medium">Doctor</th>
            <th class="px-6 py-4 text-left border-b font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ appointment.department.name }}</td>
            <td class="px-6 py-4">{{ appointment.fullname }}</td>
            <td class="px-6 py-4">{{ appointment.email }}</td>
            <td class="px-6 py-4">{{ appointment.phoneNumber }}</td>
            <td class="px-6 py-4">{{ appointment.personal_id }}</td>
            <td class="px-6 py-4">{{ appointment.date }}</td>
            <td class="px-6 py-4">{{ appointment.time }}</td>
            <td class="px-6 py-4">{{ appointment.doctors.name }} {{ appointment.doctors.surname }}</td>
            <td class="px-6 py-4 flex space-x-2">
              <!-- Edit Button -->
              <button
                @click="editAppointment(appointment)"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200">
                Confirm
              </button>
              <!-- Delete Button -->
              <button
                @click="deleteAppointment(appointment)"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-200">
                Cancel
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
      navigateToCreateAppointment() {
        this.$router.push('/appointments/create');
      },
  
      // Handle the "Edit" button click
      editAppointment(employee) {
        // Navigate to the edit page with the appointment details
        this.$router.push({ name: 'appointments-edit', params: { id: employee.personalId } });
      },
  
      // Handle the "Delete" button click
      deleteAppointment(index) {
        // Ask for confirmation before deleting
        if (confirm('Are you sure you want to delete this appointment?')) {
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
  