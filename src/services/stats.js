import { get } from "@/composable/useApi.js";

// Fetch doctors count
export async function getDoctorsCount() {
    try {
      const response = await get('api/doctors');  // Merr të gjithë doktorët
      console.log('Doctors response:', response);  // Kontrollo të dhënat
      if (response.status === 200) {
        return response.data.result.data.length;  // Numëron sa janë doktorët
      }
      return 0;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return 0;
    }
  }
  

// Fetch completed appointments count
export async function getCompletedAppointmentsCount() {
    try {
      const response = await get('api/appointments');  // Merr të gjitha terminat
      console.log('Appointments response:', response);  // Kontrollo të dhënat
      if (response.status === 200) {
        const completedAppointments = response.data.result.data.filter(appointment => appointment.status === 'completed');
        return completedAppointments.length;  // Numëron sa janë terminet e përfunduara
      }
      return 0;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return 0;
    }
  }
  
// Fetch pending appointments count
export async function getPendingAppointmentsCount() {
    try {
      const response = await get('api/appointments');  // Merr të gjitha terminat
      console.log('Appointments response:', response);  // Kontrollo të dhënat
      if (response.status === 200) {
        const pendingAppointments = response.data.result.data.filter(appointment => appointment.status === 'pending');
        return pendingAppointments.length;  // Numëron sa janë terminet pending
      }
      return 0;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return 0;
    }
  }

// Fetch total payments count
export async function getPaymentsCount() {
    try {
      const response = await get('api/payments');
      console.log('Payments response:', response);  // Kontrollo të dhënat
  
      if (response.status === 200) {
        const payments = response.data.result.data;
        // Llogarit totalin e pagesave duke përdorur reduce për të sumuar amount
        const total = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
        return total.toFixed(2);  // Ktheje si një numër me dy vende pas presjes decimale
      }
      return 0;
    } catch (error) {
      console.error('Error fetching total payments:', error);
      return 0;
    }
  }
  

// Fetch departments count
export async function getDepartmentsCount() {
    try {
      const response = await get('api/departments');  // Merr të gjitha departamentet
      console.log('Departments response:', response);  // Kontrollo të dhënat
      if (response.status === 200) {
        return response.data.result.data.length;  // Numëron sa janë departamentet
      }
      return 0;
    } catch (error) {
      console.error('Error fetching departments:', error);
      return 0;
    }
  }
  
