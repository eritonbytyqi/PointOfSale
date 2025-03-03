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



export const addDoctorToDepartment = async (departmentId, doctorId) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/departments/${departmentId}/add-doctor`,
      { doctorId }, // Sigurohu që po dërgon të dhënat e duhura
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}


export const deleteDoctorFromDepartment = async (departmentId, doctorId) => {
    try {
      const response = await axios.delete(
        'http://127.0.0.1:8000/department/${departmentId}/delete-doctor',
        {
          data: { doctorId }, // Laravel DELETE nuk merr të dhëna në body, por disa konfigurime e lejojnë
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };