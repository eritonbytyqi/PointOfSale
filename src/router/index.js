import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateAppointment from "@/views/Appointments/Create.vue"
import AppLayout from "@/views/Layout/AppLayout.vue"  
import Appointments from "@/views/Appointments/Index.vue"
import CreateDoctor from "@/views/Doctors/Create.vue"
import Doctors from "@/views/Doctors/Index.vue"
import EditDoctor from "@/views/Doctors/Edit.vue"
import Departments from "@/views/Departments/Index.vue"
import EditDepartment from "@/views/Departments/Edit.vue"
import CreateDepartment from "@/views/Departments/Create.vue"
import AddDoctor from '@/views/Doctors/AddDoctor.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
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
          path: '/appointments/create',
          name: 'createAppointment',
          component: CreateAppointment,
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

      ]
    },
  ],
})

export default router
