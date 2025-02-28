<script setup>
import { ref, reactive, onMounted } from "vue";
import { get, post } from "@/composable/useApi.js"; 
import InputText from "@/components/InputText.vue";





import { computed } from "vue";

// Filtron doktorët bazuar në departamentin e zgjedhur
const filteredDoctors = computed(() => {
    const selectedDepartment = departments.value.find(dept => dept.id === form.department_id);
    return selectedDepartment ? selectedDepartment.doctors : [];
});
 
const form = reactive({
    department_id: "",
    doctor_id:"", // ID e departamentit do të ruhet këtu
    fullname: "",
    email: "",
    phone_number: "",
    personal_id: "",
    date: "",
    time: "",
});

// Lista e departamenteve që do të mbushet nga API
const departments = ref([]);
const message = ref("");
const success = ref(false);

const fetchDepartments = async () => {
    try {
        const response = await get('/api/departments');
        console.log("Departments Data:", response.data.result.data); // Kontrollo që është array
        departments.value = response.data.result.data;
    } catch (error) {
        console.error("Gabim në marrjen e departamenteve:", error);
    }
};

// Thirr funksionin kur komponenti montohet
onMounted(fetchDepartments);

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

           
            <div v-if="message" :class="success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                class="p-3 rounded-md mb-4">
                {{ message }}
            </div>

            <form @submit.prevent="submit" class="space-y-4">
                <div class="space-y-4">
  
    <div>
        <label for="department_id" class="block text-sm font-medium text-gray-700">Department:</label>
        <select id="department_id" v-model="form.department_id" required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select a department</option>
            <option v-for="department in departments" :key="department.id" :value="department.id">
                {{ department.name }}
            </option>
        </select>
    </div>

   
    <div v-if="form.department_id" class="pl-4 border-l-4 border-blue-500">
        <label for="doctor_id" class="block text-sm font-medium text-gray-700">Doctor:</label>
        <select id="doctor_id" v-model="form.doctor_id" required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select a doctor</option>
            <option v-for="doctor in filteredDoctors" :key="doctor.id" :value="doctor.id">
                {{ doctor.name }}
            </option>
        </select>
    </div>
</div>

                <div>
                        <form @submit.prevent="submit"  class="block text-sm font-medium text-gray-700">
                        <div class="w-full">
                            <InputText v-model="form.fullname" required="true" label="Full Name"/>
                        </div>    
                        </form>     
                </div>
                <div>   
                    <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" v-model="form.email" required="true"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                        <form @submit.prevent="submit"  class="block text-sm font-medium text-gray-700">
                        <div class="w-full">
                            <InputText v-model="form.phone_number" required="true" label="Phone Number"/>
                        </div>    
                        </form>     
                </div>

                <div>
                        <form @submit.prevent="submit"  class="block text-sm font-medium text-gray-700">
                        <div class="w-full">
                            <InputText v-model="form.personal_id" required="true" label="Personal ID"/>
                        </div>    
                        </form>     
                </div>

                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" id="time" v-model="form.Date" required="true"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="time" class="block text-sm font-medium text-gray-700">Time:</label>
                    <input type="time" id="time" v-model="form.time" required="true"
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

