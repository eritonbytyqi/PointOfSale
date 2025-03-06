<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { get, post } from "@/composable/useApi.js"; 
import InputText from "@/components/InputText.vue";
import router from "@/router";

// Filtron doktorët bazuar në departamentin e zgjedhur
const filteredDoctors = computed(() => {
    const selectedDepartment = departments.value.find(dept => dept.id === form.department_id);
    if (selectedDepartment) {
        return selectedDepartment.doctors.filter((doctor, index, self) =>
            index === self.findIndex((d) => d.name === doctor.name && d.surname === doctor.surname)
        );
    }
    return [];
});

const isSunday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date.getDay() === 0; // 0 = E diel
};

// Funksioni për të fshirë datën nëse është e diel
const handleDateChange = () => {
    if (!form.date) return; // Kthehu nëse data është e zbrazët

    if (isSunday(form.date)) {
        alert("E diel nuk lejohet! Zgjidh një ditë tjetër.");
        form.date = ""; // Reset the date if it's Sunday
    }
};

const form = reactive({
    department_id: "",
    doctor_id: "", 
    fullname: "",
    email: "",
    phoneNumber: "",
    personal_id: "",
    date: "",
    time: "",
});

const allAvailableTimes = ref([
    "08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00",
    "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"
]);
const availableTimes = ref([]);

// Marrja e orareve të lira për një datë të caktuar
const fetchAvailableTimes = async () => {
    if (!form.department_id || !form.doctor_id || !form.date) return;

    try {
        const response = await get(`/api/appointments/unavailable/${form.department_id}/${form.doctor_id}`, {
            params: { date: form.date },
        });

        console.log("API Response:", response.data); // Kontrollo të dhënat e marra nga API

        const bookedTimes = response.data && Array.isArray(response.data.data) ? response.data.data : [];
        console.log("Oraret e zëna:", bookedTimes);

        availableTimes.value = allAvailableTimes.value.filter(time => !bookedTimes.includes(time));
        console.log("Oraret e lira:", availableTimes.value);

    } catch (error) {
        console.error("Gabim në marrjen e orareve të zëna:", error);
    }
};

watch([() => form.department_id, () => form.date, () => form.doctor_id], fetchAvailableTimes);

const departments = ref([]);
const message = ref("");
const success = ref(false);

// Marrja e listës së departamenteve
const fetchDepartments = async () => {
    try {
        const response = await get('/api/departments');
        console.log("Departments Data:", response.data.result.data);
        departments.value = response.data.result.data;
    } catch (error) {
        console.error("Gabim në marrjen e departamenteve:", error);
    }
};

onMounted(fetchDepartments);


// Validimi për secilën fushë
const errors = reactive({
    department_id: "",
    doctor_id: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    personal_id: "",
    date: "",
    time: "",
});

const validateForm = () => {
    // Reset the errors first
    for (const key in errors) {
        errors[key] = "";
    }

    let isValid = true;

    // Kontrollojmë çdo fushë
    if (!form.department_id) {
        errors.department_id = "Departamenti është i detyrueshëm!";
        isValid = false;
    }

    if (!form.doctor_id) {
        errors.doctor_id = "Doktori është i detyrueshëm!";
        isValid = false;
    }

    if (!form.fullname) {
        errors.fullname = "Emri është i detyrueshëm!";
        isValid = false;
    }

    if (!form.email || !validateEmail(form.email)) {
        errors.email = "Ju lutem, shkruani një email të vlefshëm!";
        isValid = false;
    }

    if (!form.phoneNumber || !isValidPhone(form.phoneNumber)) {
        errors.phoneNumber = "Numri i telefonit duhet të jetë në formatin +383....!";
        isValid = false;
    }

    if (!form.personal_id) {
        errors.personal_id = "ID personale është e detyrueshme!";
        isValid = false;
    }

    if (!form.date) {
        errors.date = "Data është e detyrueshme!";
        isValid = false;
    } else if (isSunday(form.date)) {
        errors.date = "E diel nuk lejohet! Zgjidh një ditë tjetër.";
        isValid = false;
    }

    if (!form.time) {
        errors.time = "Koha është e detyrueshme!";
        isValid = false;
    }

    return isValid;
};

// Funksioni për të kontrolluar nëse emaili është valid
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Funksioni për të kontrolluar nëse numri i telefonit është valid
const isValidPhone = (phone) => {
    const regex = /^\+383[0-9]{8,}$/;
    return regex.test(phone);
};

// Funksioni për të kontrolluar nëse është e diel

const submit = async () => {
    await checkEmail(); // Kontrollo emailin para se të dërgohet formulari
    if (emailExists.value) {
        message.value = "Ky email është përdorur tashmë!";
        success.value = false;
        return;
    }

    try {
        const response = await post('/api/appointments', form);
    // if (response.data.errors && response.data.errors.personal_id) {
    //         message.value = "Ky ID personal është përdorur tashmë!";
    //         success.value = false;
    //         return;
    //     }
     
        console.log("Response Data:", response.data);

        if (!response || !response.data || !response.data.result) {
            console.error("Gabim: Response ose result nuk ekziston!");
            return;
        }

        const appointmentId = response.data.result.id;
        if (!appointmentId) {
            console.error("Gabim: ID nuk u kthye nga API");
            return;
        }

        message.value = "Appointment created successfully!";
        success.value = true;

        router.push({ path: "/payments/create", query: { appointment_id: appointmentId } });

        console.log("Redirecting to payments/create with ID:", appointmentId);
    } catch (error) {
        message.value = "Error creating appointment. Please check all fields.";
        success.value = false;
        console.error("Gabim:", error);
    }
};

const emailExists = ref(false);

// Funksioni për të kontrolluar nëse emaili ekziston
const checkEmail = async () => {
    if (!form.email) return; // Mos e kontrollo nëse fusha është bosh

    try {
        const response = await get(`/api/check-email`, { params: { email: form.email } });

        emailExists.value = response.data.exists;
    } catch (error) {
        console.error("Gabim në verifikimin e emailit:", error);
    }
};
const addPrefix = () => {
  if (!form.phoneNumber.startsWith("+383")) {
    form.phoneNumber = "+383" + form.phoneNumber.replace(/^(\+383)?/, "");
  }

}


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
                            {{ doctor.name }} {{ doctor.surname }}
                        </option>
                    </select>
                </div>

                <InputText v-model="form.fullname" :required="true" label="Full Name"/>
                <p v-if="errors.fullname" class="text-red-500 text-sm mt-1">{{ errors.fullname }}</p>

                <InputText v-model="form.email" :required="true" label="Email" @blur="checkEmail" />
<p v-if="emailExists" class="text-red-500 text-sm mt-1">Ky email është përdorur tashmë!</p>
<p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>

<div>
    <label for="phoneNumber">Phone Number</label>
    <input 
      id="phoneNumber" 
      v-model="form.phoneNumber" 
      type="tel" 
      :required="true"
      @input="addPrefix"
      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
    />
  </div>    
  <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">{{ errors.phoneNumber }}</p>
  
  <InputText v-model="form.personal_id" :required="true" label="Personal ID"/>
  <p v-if="errors.personal_id" class="text-red-500 text-sm mt-1">{{ errors.personal_id }}</p>
  

                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
<input 
    type="date" 
    id="date" 
    v-model="form.date" 
    :min="new Date().toISOString().split('T')[0]" 
    required
    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    @change="handleDateChange" 
/>
<p v-if="isSunday(form.date)" class="text-red-500 text-sm mt-1">
    E diel nuk lejohet! Zgjidh një ditë tjetër.
</p>
                </div>

                <div>
                    <label for="time" class="block text-sm font-medium text-gray-700">Time:</label>
                    <select id="time" v-model="form.time" required
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="" disabled>Select a time</option>
                        <option v-for="time in availableTimes" :key="time" :value="time">
                            {{ time }}
                        </option>
                    </select>
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                    Save
                </button>
            </form> 
        </div>
    </div>
</template>
