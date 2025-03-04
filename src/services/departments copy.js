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
        return await post('api/doctors/${departmentId}/add-doctor', form).then(res =>{
                if(res.status === 201){
                    return res.data;
                }
                return null
            }
        );
    }catch (e) {
        return null;
    }
}

export async function deleteDoctorFromDepartment(departmentId, doctorId) {
    try {
        return await destroy(`api/departments/${departmentId}/delete-doctor`, { data: { doctorId } }).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error("Error deleting doctor from department:", e);
        return null;
    }
}