import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import { LoginPages } from '../auth';
import { CalendarPages} from '../calendar'
import { useAuthStore } from '../hooks';


export const AppRouter = () => {

   //const {status, checkAuthToken} = useAuthStore()
    const authStatus = 'not-authenticated'
    

    /*useEffect(() => {
     checkAuthToken()
    }, [])
    

    if(status === 'checking'){
        return(
            <>
                <h3>Cargando...</h3>
            </>
        )
    }*/

    return(
        <Routes>
            {
                (authStatus === 'not-authenticated' )
                ?(
                    <>
                        <Route path="/auth/*" element={<LoginPages />} />
                        <Route path="/*" element={<Navigate to="/auth/login" /> } />
                    </>
                )
                :
                (
                    <>
                        <Route path="/" element={<CalendarPages />} />
                        <Route path="/*" element={<Navigate to="/" /> } />
                    </>
                )

            }

        </Routes>
    )
}