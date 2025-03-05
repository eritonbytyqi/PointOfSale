import {destroy, get, patch, post} from "@/composable/useApi.js";
import axios from "axios";
export async function getDepartments(pageQuery = '', filters = {}) {
    try {
        return await get('api/departments' + pageQuery, {params: filters}).then(res =>{
            if(res.status === 200){
                    return res.data;
                }
                return null
            }
        );
    }catch (e) {
        return null;
    }
}
export async function showDepartment(id) {
    try {
        console.log("Department ID:", id); // Kontrollo ID-në
        console.log("API URL:", 'api/departments/' + id); // Kontrollo URL-në
        
        return await get('api/departments/' + id).then(res =>{
                if(res.status === 200){
                    return res.data;
                }
                return null
            }
        );
    }catch (e) {
        return null;
    }
}
export async function storeDepartment(form) {
    try {
        return await post('api/departments', form).then(res =>{
                if(res.status === 200){
                    return res.data;
                }
                return null
            }
        );
    }catch (e) {
        return null;
    }
}
export async function updateDepartment(id, form) {
    try {
       
        const response = await patch(`api/departments/${String(id)}`, form);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (e) {
        console.error("Error updating department:", e);
        return null;
    }
}

export async function deleteDepartment(id) {
    try {
        return await destroy('api/departments/' + id).then(res =>{
                if(res.status === 200){
                    return res;
                }
                return null
            }
        );
    }catch (e) {
        return null;
    }
}


export async function addDoctorToDepartment(departmentId, doctorId) {
    try {
        return await post(`api/departments/${departmentId}/add-doctor`, { "doctor_id": doctorId }).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error("Error adding doctor to department:", e);
        return null;
    }
}

export const deleteDoctorFromDepartment = async (departmentId, doctorId) => {
    try {
      const response = await axios.delete(`/api/departments/${departmentId}/delete-doctor`,
      {doctor_id: doctorId}
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting doctor:", error);
      throw error; // Sigurohuni që të dergoni gabimin në front-end
    }
  };