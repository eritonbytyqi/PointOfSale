<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { deleteDoctor } from "@/services/doctors.js";

const props = defineProps({
  doctorId: Number
});

const emit = defineEmits(['closeDeleteModal']); 

const closeDeleteModal = () => {
  emit('closeDeleteModal');
};


const submit = () => {
  deleteDoctor(props.doctorId)
    .then(() => {
      alert('Doctor deleted successfully');
      emit('closeDeleteModal');
    })
    .catch((error) => {
      console.error('Error deleting doctor:', error);
    });
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
      <h2 class="text-xl font-semibold text-gray-800">Delete</h2>
      <p class="mt-4 text-gray-600">Are you sure you want to delete this doctor?</p>
      <div class="mt-6 flex justify-center space-x-4">
        <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
          Cancel
        </button>
        <button @click="submit" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
