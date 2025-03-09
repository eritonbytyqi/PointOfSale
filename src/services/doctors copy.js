import {destroy, get, patch, post} from "@/composable/useApi.js";
export async function getDoctors(pageQuery = '', filters = {}) {
    try {

        return await get('api/doctors' + pageQuery, {params: filters}).then(res =>{
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
export const getDoctorss = (departmentId) => {
    return get(`/api/departments/${departmentId}/doctors`);
  }
export async function showDoctor(id) {
    try {
        console.log("Doctor ID:", id); // Kontrollo ID-në
        console.log("API URL:", 'api/doctors/' + id); // Kontrollo URL-në
        
        return await get('api/doctors/' + id).then(res =>{
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
export async function storeDoctor(form) {
    try {
        return await post('api/doctors', form).then(res =>{
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
export async function updateDoctor(id, form) {
    try {
       
        const response = await patch(`api/doctors/${String(id)}`, form);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (e) {
        console.error("Error updating doctor:", e);
        return null;
    }
}

export async function deleteDoctor(id) {
    try {
        return await destroy('api/doctors/' + id).then(res =>{
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