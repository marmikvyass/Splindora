import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const backendURL = import.meta.env.VITE_BACKEND_URL
    axios.defaults.baseURL = backendURL
    axios.defaults.withCredentials = true

    const [isLoggedin, setisLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)


    useEffect(() => {
            getAuthStatus();
    }, [])

    const getAuthStatus = async () => {



        try {
            

            const { data } = await axios.get('/api/auth/isAuth')
            if (data.success) {
                setisLoggedin(true)
                setUserData(data.user)
            }
            else {
                setisLoggedin(false),
                    setUserData(null)
            }
        } catch (error) {
                setisLoggedin(false),
                setUserData(null),
                toast.error(error.message)
        }
    }

    // const getUserdata =async ()=>{
    //     try {
    //         const {data} = await axios.get('/api/auth/data')
    //         data.success ? setUserData(data.userData) : toast.error(data.message)
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }


    const value = {
        backendURL,
        isLoggedin, setisLoggedin,
        userData, setUserData,
        getAuthStatus
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}