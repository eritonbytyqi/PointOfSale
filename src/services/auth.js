import {post} from "@/composable/useApi.js";
import {useUserStore} from "@/stores/userSession.js";

export async function login(form) {
    try {
        return await post('api/login', form).then(res => {
            if (res) {
                if (res.status === 200) {
                    // Ruani të dhënat e përdoruesit në store (ose nëse është një store Vuex)
                    useUserStore().setUser({
                        id: res.data.user.id,
                        name: res.data.user.name,
                        email: res.data.user.email,
                    });

                    // Vendosni tokenin në store dhe gjithashtu në localStorage
                    const token = res.data.token;
                    useUserStore().setToken(token);
                    localStorage.setItem('authToken', token);  // Vendosni tokenin në localStorage
                    
                    useUserStore().setIsLoggedIn();  // Vendosni statusin e login-it

                    return res.data.user;
                }
            }
            return null;
        });
    } catch (e) {
        console.error('Error during login:', e);
        return null;
    }
}

export const checkEmailExists = async (email) => {
    try {
        const response = await axios.post('/api/check-email', { email });
        return response.data.exists;
    } catch (error) {
        console.error(error);
        return false;
    }
};
export async function logout(form) {
    try {
        return await post('api/logout', form).then(res =>{
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