import {post} from "@/composable/useApi.js";
import {useUserStore} from "@/stores/userSession.js";


export async function login(form) {
    try {
        return await post('api/login', form).then(res =>{
            if (res) {
                if (res.status === 200) {
                    useUserStore().setUser(
                        {
                            id: res.data.user.id,
                            name: res.data.user.name,
                            email: res.data.user.email,
                        }
                    );
                    useUserStore().setToken(res.data.token);
                    useUserStore().setIsLoggedIn();
                    return res.data.user;
                }
            }
                return null
            }
        );
    }catch (e) {
        return null;
    }
}