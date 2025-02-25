import {destroy, get, patch, post} from "@/composable/useApi.js";
export async function getAppointments(pageQuery = '', filters = {}) {
    try {
        return await get('api/appointments' + pageQuery, {params: filters}).then(res =>{
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
export async function storeAppointment(form) {
    try {
        return await post('api/appointments', form).then(res =>{
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
