import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const {backendURL, setisLoggedin } = useContext(AppContext)
    const [state, setState] = useState('Sign up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmithandler = async(e)=>{
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true

            if(state === 'Sign up'){
                const {data} = await axios.post(backendURL + '/api/auth/signin', {name, email, password})
                if(data.success){
                    setisLoggedin(true)
                    navigate('/')
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                const {data} = await axios.post(backendURL + '/api/auth/login', {email, password},{headers : { 'Content-Type' : 'application/json' }, withCredentials: true})
                if(data.success){
                    setisLoggedin(true)
                    navigate('/')
                }
                else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="landingContainer h-screen w-full">
                <img className='min-h-screen absolute h-10 w-full object-cover inset-0' src="./background.jpg" alt="bg" />
                <div className='relative z-10 flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center text-center p-2 sm:p-0'>
                        <h1 className='font-bold text-5xl sm:text-7xl pt-50 sm:pt-30'>Splindora</h1>
                    </div>

                    <div className="loginPage border shadow-2xl w-70 sm:w-100 flex flex-col items-center mt-15 rounded-lg">
                        <h2 className='font-bold mb-4 mt-3 text-3xl'>{state === 'Sign up' ? 'Create Account' : 'Login Account'}</h2>

                        <form onSubmit={onSubmithandler}>
                            
                            <div className='flex flex-col mt-4 gap-5'>
                                {state === 'Sign up' && (<input value={name} onChange={e=>setName(e.target.value)}  type="text" placeholder='Full name' className='border  bg-slate-900 text-white w-65 sm:w-90 rounded-full px-1.5 py-0 sm:px-4 sm:py-2' required />)}
                                
                                <input value={email} onChange={e=>setEmail(e.target.value)}  type="email" placeholder='Email' className='border  bg-slate-900 text-white w-65 sm:w-90 rounded-full px-1.5 py-0 sm:px-4 sm:py-2' required />
                                <input value={password} onChange={e=>setPassword(e.target.value)}  type="password" placeholder='Password' className='border bg-slate-900 text-white w-65 sm:w-90 rounded-full px-1.5 py-0 sm:px-4 sm:py-2 mb-5' required />
                            </div>
                            <button className='border w-65 sm:w-90 px-1.5 py-0 sm:px-2 sm:py-1.5 rounded-full bg-slate-800 cursor-pointer text-white hover:bg-slate-950 hover:scale-108 transition-all text-lg font-medium mb-1 mt-5'>
                                {state === 'Sign up' ? 'Sign up' : 'Login'}
                            </button>
                        </form>

                        {state === 'Sign up' ?
                        (<p className='text-slate-950 text-sm mb-7 mt-2'>Already have an account?
                            <span onClick={() => setState('Login')} className='text-blue-900 cursor-pointer underline'>Login here</span>
                        </p>) 
                        : 
                        (<p className='text-slate-950 text-sm mb-7 mt-2'>Don't have an account?
                            <span onClick={() => setState('Sign up')} className='text-blue-900 cursor-pointer underline'>Sign up</span>
                        </p>)}

                        
                        
                    </div>.
                </div>
            </div>
        </>
    )
}

export default Login