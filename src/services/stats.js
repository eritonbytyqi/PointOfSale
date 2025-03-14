import { get } from "@/composable/useApi.js";

// Fetch doctors count
export async function getDoctorsCount() {
    try {
      const response = await get('api/doctors'); 
      console.log('Doctors response:', response);  
      if (response.status === 200) {
        return response.data.result.data.length; 
      }
      return 0;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return 0;
    }
  }
  

export async function getCompletedAppointmentsCount() {
    try {
      const response = await get('api/appointments');  
      console.log('Appointments response:', response); 
      if (response.status === 200) {
        const completedAppointments = response.data.result.data.filter(appointment => appointment.status === 'completed');
        return completedAppointments.length; 
      }
      return 0;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return 0;
    }
  }
  
export async function getPendingAppointmentsCount() {
    try {
      const response = await get('api/appointments');  
      console.log('Appointments response:', response);  
      if (response.status === 200) {
        const pendingAppointments = response.data.result.data.filter(appointment => appointment.status === 'pending');
        return pendingAppointments.length;  
      }
      return 0;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return 0;
    }
  }

export async function getPaymentsCount() {
    try {
      const response = await get('api/payments');
      console.log('Payments response:', response);  
  
      if (response.status === 200) {
        const payments = response.data.result.data;
        const total = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
        return total.toFixed(2);  // Dy vende pas presjes decimale
      }
      return 0;
    } catch (error) {
      console.error('Error fetching total payments:', error);
      return 0;
    }
  }
  

export async function getDepartmentsCount() {
    try {
      const response = await get('api/departments');  
      console.log('Departments response:', response);  
      if (response.status === 200) {
        return response.data.result.data.length;  
      }
      return 0;
    } catch (error) {
      console.error('Error fetching departments:', error);
      return 0;
    }
  }
  
