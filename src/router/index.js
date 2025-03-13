 import { createRouter, createWebHistory } from 'vue-router'
 import LandingPage from '../views/LandingPage.vue'
import HomeView from '../views/HomeView.vue'
import CreateAppointment from "@/views/Appointments/Create.vue"
import AppLayout from "@/views/Layout/AppLayout.vue"  
import Appointments from "@/views/Appointments/Index.vue"
import CreateDoctor from "@/views/Doctors/Create.vue"
import Doctors from "@/views/Doctors/Index.vue"
import Payment from "@/views/Payments/Index.vue"
import EditDoctor from "@/views/Doctors/Edit.vue"
import Departments from "@/views/Departments/Index.vue"
import EditDepartment from "@/views/Departments/Edit.vue"
import EditPayment from "@/views/Payments/edit.vue"
import CreateDepartment from "@/views/Departments/Create.vue"
import AddDoctor from '@/views/Doctors/AddDoctor.vue'
import DeleteDoctor from '@/views/Doctors/DeleteDoctorModal.vue'
import CreatePayment from '@/views/Payments/Create.vue'
import CreateAdminPayment from '@/views/Payments/CreateAdmin.vue'

import BookAppointment from '@/components/Landing/BookAppointmentSection.vue'
import PaymentSection from '@/components/Landing/PaymentSection.vue'
import ConfirmedAppointment from '@/views/Appointments/ConfirmedAppointment.vue'
import Login from '@/views/Auth/Login.vue'

import logout  from '@/views/auth/logout.vue'

import Home from "@/views/Home/Index.vue"
import PendingAppointment from '@/views/Appointments/PendingAppointment.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/landing'   
    },
    {
      path: '/login',
      name: 'login',
     component: Login,
    },
    {
      path: '/logout',
      name: 'logout',
     component: logout,
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/landing/BookAppointment',
      name: 'bookAppointmentLanding',
      component: BookAppointment,
    },
    {
      path: '/landing/Payment',
      name: 'paymentLanding',
      component: PaymentSection,
    },
    {
      path: '/payments/create',
      name: 'createPayment',
      component: CreatePayment,
    },

    {
      path: '',
      name: 'layout',
      component: AppLayout,
      children: [
        {
          path: '/appointments',
          name: 'appointments',
          component: Appointments,
        },
        {

          path: '/payments/:id/edit',
          name: 'editPayment',
          component: EditPayment,
        },
        {
          path: '/home',
          name: 'home',
          component: Home,

        },
        {
          path: '/appointments/create',
          name: 'createAppointment',
          component: CreateAppointment,
        },

        {
          path: '/appointments/confirmed',
          name: 'confirmed-appointments',
          component: ConfirmedAppointment,
        },
        {
          path: '/appointments/pending',
          name: 'pending-appointments',
          component: PendingAppointment,
        },
      
        {
          path: '/payments',
          name: 'payments',
          component: Payment,
        },
        {
          path: '/payments/create/Admin',
          name: 'createAdminPayment',
          component: CreateAdminPayment,
        },
        {
          path: "/appointments/confirmed",
          name: "appointments.confirmed",
          component: Appointments,
        },
        {
          path: '/doctors',
          name: 'doctors',
          component: Doctors,
        },

        {
          path: '/doctors/create',
          name: 'createDoctor',
          component: CreateDoctor,
        },

        {
          path: '/doctors/:id/edit',
          name: 'editDoctor',
          component: EditDoctor,
        },
        {
          path: '/departments',
          name: 'departments',
          component: Departments,
        },
        {
          path: '/departments/create',
          name: 'createDepartment',
          component: CreateDepartment,
        },
        {
          path: '/departments/:id/edit',
          name: 'editDepartment',
          component: EditDepartment,
        },
        {
            path: 'departments/:departmentId/add-doctor',
            name: 'addDoctor',
            component: AddDoctor,
         },
         {
          path: 'departments/:departmentId/delete-doctor',
          name: 'deleteDoctor',
          component: DeleteDoctor,
       },

      ]
    },
  ],
})

export default router

