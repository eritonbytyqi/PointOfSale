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

export async function getAppointmentsConfirmed(pageQuery = '', filters = {}) {
    try {
        return await get('api/confirmed' + pageQuery, {params: filters}).then(res =>{
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
export async function getAppointmentsPending(pageQuery = '', filters = {}) {
    try {
        return await get('api/pending' + pageQuery, {params: filters}).then(res =>{
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

export const updateAppointmentStatus = async (id, status) => {
    // Kontrollo që statusi është një nga vlerat e mundshme
    const validStatuses = ['pending', 'confirmed', 'completed', 'canceled'];
    if (!validStatuses.includes(status)) {
        console.error('Invalid status value:', status);
        return null;
    }

    try {
        return await patch(`api/appointments/${id}/status`, { status }).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return null;
    }
};

