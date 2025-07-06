import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import trip from '../../../server/models/trip';

function Dashboard() {
    const navigate = useNavigate();

    const { setisLoggedin, setUserData } = useContext(AppContext)

    const [tripNames, setTripNames] = useState('')
    const [startDates, setStartDates] = useState('')
    const [endDates, setEndDates] = useState('')
    const [trips, setTrips] = useState([])

    const handleLogout = async () => {
        try {
            const { data } = await axios.post('/api/auth/logout')
            if (data.success) {
                localStorage.removeItem('token'); 
                setisLoggedin(false),
                setUserData(null),
                toast.success('Logged out successfully')
                navigate('/')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchTrips = async () => {
        try {
            const { data } = await axios.get(`/api/trip/mytrips`)
            if (data.success) {
                setTrips(data.trips)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchTrips()
    }, [])

    const handleCreateTrip = async (e) => {
        e.preventDefault();
        if (!tripNames || !startDates || !endDates) {
            return toast.error("Please fill all the fields")
        }
        if(startDates > endDates){
            return toast.error('Start date cannot be after end date')
        }
        try {
            const { data } = await axios.post('/api/trip/createtrip', {
                tripName: tripNames,
                startDate: startDates,
                endDate: endDates,
            })
            if (data.success) {
                toast.success('Trip created successfully')
                setTripNames('')
                setStartDates('')
                setEndDates('')
                fetchTrips()
            }
            else {
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onclicking = async (tripId) => {
        navigate(`/budget/${tripId}`)
    }
    return (
        <>
            <div className="dashbaordContainer w-full min-h-screen">
                <img className='min-h-screen absolute h-full w-full object-cover inset-0' src="./mt-fuji.jpg" alt="bg" />
                <div className='relative z-10 flex flex-col justify-center'>
                    <div className='flex justify-between py-2 px-5  sm:py-5 sm:px-10'>
                        <h1 className='font-bold text-white text-3xl sm:text-5xl '>Splindora</h1>
                        <button onClick={handleLogout} className='border sm:px-7 sm:py-2 px-2 py-1 rounded-full bg-slate-800 cursor-pointer text-white hover:bg-slate-950 hover:scale-108 transition-all text-lg font-medium'>Logout</button>
                    </div>
                    <div>
                        <form onSubmit={handleCreateTrip} className='flex flex-col items-center gap-5 sm:gap-10'>
                            <h1 className='text-center mt-5 font-bold text-3xl sm:text-5xl'>Create New Trip</h1>
                            <div className='flex flex-col gap-3 sm:gap-10 sm:flex-row items-center justify-around'>
                                <input value={tripNames} onChange={(e) => setTripNames(e.target.value)} className='border bg-white/25 border-none backdrop-blur-md rounded-2xl px-2 py-1 sm:px-4 sm:py-2 w-65 sm:w-95 text-black font-bold' type="text" placeholder='Trip name' />
                                <div className='flex items-start flex-col sm:flex-row sm:items-center gap-2'>
                                    <p className='font-bold text-lg'>Start Date : </p>
                                    <input value={startDates} onChange={(e) => setStartDates(e.target.value)} className='border bg-white/25 border-none backdrop-blur-md rounded-2xl px-2 py-1 sm:px-4 sm:py-2 w-65 sm:w-95 text-black font-bold' type="date" placeholder='Startdate' />
                                </div>

                                <div className='flex items-start flex-col sm:flex-row sm:items-center gap-2'>
                                    <p className='font-bold text-lg'>End Date : </p>
                                    <input value={endDates} onChange={(e) => setEndDates(e.target.value)} className='border bg-white/25 border-none backdrop-blur-md rounded-2xl px-2 py-1 sm:px-4 sm:py-2 w-65 sm:w-95 text-black font-bold' type="date" placeholder='Startdate' />
                                </div>
                            </div>
                            <button type='submit' className='border px-2 w-65 py-2.5 sm:py-3  sm:mt-5 rounded-full mt-1 bg-slate-800 cursor-pointer text-white hover:bg-slate-950 hover:scale-108 transition-all text-lg font-medium'>Create Trip</button>
                        </form>
                    </div>
                    <div className=' border mt-10 h-full  bg-white/25 backdrop-blur-md border-white rounded-2xl mx-15 flex flex-col justify-center items-center'>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-2xl text-white font-bold'>
                                My Trips
                            </h1>
                            {trips.length === 0 ? (<p className='font-medium text-black text-lg mb-3 mt-2'>No trips created yet</p>)
                                :
                                (<div>
                                    {trips.map((trip) => (
                                        <div key={trip._id} className='flex flex-col sm:flex-row gap-10 items-center mb-10 mt-5'>
                                            <h3 className='text-lg flex gap-2 text-white font-bold'><span className='text-black'>Trip Name : </span>{trip.tripName}</h3>
                                            <p className='text-lg flex text-white font-bold gap-2'><span className='text-black'>Start Date : </span>{trip.startDate.slice(0, 10)}</p>
                                            <p className='text-lg flex text-white font-bold gap-2'><span className='text-black'>End Date : </span>{trip.endDate.slice(0, 10)}</p>
                                            <button onClick={() => onclicking(trip._id)} className='border px-2 py-2.5 sm:py-1 rounded-full bg-slate-800 cursor-pointer text-white hover:bg-slate-950 hover:scale-108 transition-all text-lg font-medium'>Set Budget</button>
                                        </div>
                                    ))}

                                </div>)}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard