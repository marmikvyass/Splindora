import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function LandingPage() {
    const navigate = useNavigate()
    const { isLoggedin } = useContext(AppContext)

    const handleClick = () => {
        if (isLoggedin) {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
    }
    return (
        <>
            <div className="landingContainer h-screen w-full">
                <img className='min-h-screen absolute h-10 w-full object-cover inset-0' src="./background.jpg" alt="bg" />

                <div className='relative z-10 flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center text-center p-2 sm:p-0'>
                        <h1 className='font-bold text-5xl sm:text-7xl pt-35 sm:pt-30'>Splindora</h1>
                        <p className='text-3xl font-bold pt-4'>Plan your trip & Track your expense</p>
                        <p className='text-lg mt-2'>Discover the fastest and most enjoyable way to plan your trip! with us</p>
                        <p className='text-lg'>Add your expenses and fix your budget</p>
                    </div>
                    <button onClick={handleClick} className='border px-7 py-4 rounded-full mt-20 bg-slate-800 cursor-pointer text-white hover:bg-slate-950 hover:scale-108 transition-all text-lg font-medium'>{isLoggedin ? 'Go to Dashboard' : 'Get started'}</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage