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

