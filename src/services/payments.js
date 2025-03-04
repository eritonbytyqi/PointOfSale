import {destroy, get, patch, post} from "@/composable/useApi.js";
export async function getPayments(pageQuery = '', filters = {}) {
    try {
        return await get('api/payments' + pageQuery, {params: filters}).then(res =>{
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
export async function showPayment(id) {
    try {
        console.log("Payment ID:", id);
        console.log("API URL:", 'api/payments/' + id);
        
        return await get('api/payments/' + id).then(res =>{
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
export async function storePayment(form) {
    try {
        return await post('api/appointments/${appointmentId}/payments', form).then(res =>{
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
export async function updatePayment(id, form) {
    try {
       
        const response = await patch(`api/payments/${String(id)}`, form);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (e) {
        console.error("Error updating payment:", e);
        return null;
    }
}

export async function deletePayment(id) {
    try {
        return await destroy('api/payments/' + id).then(res =>{
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