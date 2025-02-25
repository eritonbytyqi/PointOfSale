<script setup>
import { ref, reactive, onMounted } from "vue";
import { get, post } from "@/composable/useApi.js"; 

// Form data
const form = reactive({
    department_name: "",  // Emri i departamentit shkruhet si tekst
    fullname: "",
    email: "",
    phone_number: "",
    personal_id: "",
    date: "",
    time: "",
});

// Gjendja e suksesit ose gabimit
const message = ref("");
const success = ref(false);

// Funksioni për të ruajtur një takim
const submit = async () => {
    try {
        const response = await post('/api/appointments', form);
        message.value = "Appointment created successfully!";
        success.value = true;
        console.log(response.data);
    } catch (error) {
        message.value = "Error creating appointment. Please check all fields.";
        success.value = false;
        console.error("Gabim:", error);
    }
};
</script>

<template>
    <div class="py-10 min-h-screen bg-gray-100 flex justify-center items-center">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">Create Appointment</h1>

            <!-- Mesazhi i suksesit ose gabimit -->
            <div v-if="message" :class="success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                class="p-3 rounded-md mb-4">
                {{ message }}
            </div>

            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <label for="department_id" class="block text-sm font-medium text-gray-700">Department:</label>
                    <input type="text" id="department_id" v-model="form.department_id" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter department name" />
                </div>

                <div>
                    <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name:</label>
                    <input type="text" id="fullname" v-model="form.fullname" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" v-model="form.email" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input type="text" id="phoneNumber" v-model="form.phoneNumber" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="personal_id" class="block text-sm font-medium text-gray-700">Personal ID:</label>
                    <input type="text" id="personal_id" v-model="form.personal_id" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700">Date:</label>
                    <input type="date" id="date" v-model="form.date" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="time" class="block text-sm font-medium text-gray-700">Time:</label>
                    <input type="time" id="time" v-model="form.time" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                    Save
                </button>
            </form>
        </div>
    </div>
</template>
