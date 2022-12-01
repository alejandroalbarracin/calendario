import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store"

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch =  useDispatch()


    const starLogin = async({email, password}) => {
        dispatch(onChecking())
        try {
            const {data} = await calendarApi.post ('/auth',{email, password})
            console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}))
        } catch (error) {
            dispatch(onLogout('Revise las credenciales, el usuario o la constraseña no son correctos'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const startRegister = async ({email, password, name}) => {
        dispatch(onChecking())
        try {
            const {data} = await calendarApi.post ('/auth/new',{email, password, name})
            console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.usuario, uid: data.uid}))
            
        } catch (error) {
            console.log(error);
            dispatch(onLogout( error.response.data?.msg || Object.values(error.response.data.erro)[0].msg ))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }    
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if(!token) return dispatch( onLogout())

        try {
            const {data} = await calendarApi.get('auth/renew')
            console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout());
        }

    }
    
    return{
        status,
        user,
        errorMessage,
        checkAuthToken,
        starLogin,
        startRegister,
    }

}