<script setup>
import { ref, reactive } from "vue";
import { post } from "@/composable/useApi.js";

const form = reactive({
    name: "",
    surname: "",
    phone: "",
    description: ""
});

const message = ref("");
const success = ref(false);

const submit = async () => {
    try {
        const response = await post('/api/doctors', form);
        message.value = "Doctor created successfully!";
        success.value = true;
        
    } catch (error) {
        message.value = "Error creating doctor. Please check all fields.";
        success.value = false;
        console.error("Error:", error);
    }
};
</script>

<template>
    <div class="py-10 min-h-screen bg-gray-100 flex justify-center items-center">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">Create Doctor</h1>

            <div v-if="message" :class="success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                class="p-3 rounded-md mb-4">
                {{ message }}
            </div>

            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" id="name" v-model="form.name" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="surname" class="block text-sm font-medium text-gray-700">Surname:</label>
                    <input type="text" id="surname" v-model="form.surname" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
                    <input type="text" id="phone" v-model="form.phone" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea id="description" v-model="form.description" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                    Save
                </button>
            </form>
        </div>
    </div>
</template>
