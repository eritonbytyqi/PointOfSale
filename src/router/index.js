import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Create from "@/views/Appointments/Create.vue";
import AppLayout from "@/views/Layout/AppLayout.vue"

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
          path: '/appointments/create',
          name: 'createAppointment',
          component: Create,
        },
      ]
    },
  ],
})

export default router
