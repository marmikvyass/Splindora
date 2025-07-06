import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import trip from '../../../server/models/trip'
import { useEffect } from 'react'

function Budget() {

  const { tripId } = useParams()
  const navigate = useNavigate()

  const [expensis, setExpensis] = useState([])
  const [descriptions, setDescriptions] = useState('')
  const [amt, setamt] = useState('')
  const [Tname, setTname] = useState('')

  const addingExpenses = async (e) => {
    e.preventDefault();
    if (!descriptions || !amt) {
      return toast.error('Please enter all fields')
    }
    try {
      const { data } = await axios.post('/api/expense/addexpense', {
        tripId,
        description: descriptions,
        amount: amt
      })
      if (data.success) {
        toast.success('Expense added successfully')
        setDescriptions('')
        setamt('')
        fetchExpense()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const totalExp = expensis.reduce((acc, expense) => acc + Number(expense.amount || 0), 0)

  const fetchExpense = async (e) => {
    try {
      const { data } = await axios.get(`/api/expense/getexpense/${tripId}`)
      if (data.success) {
        setExpensis(data.expenses)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchTripName = async () => {
    try {
      const { data } = await axios.get(`/api/trip/gettrips/${tripId}`)
      if (data.success) {
        setTname(data.trip.tripName)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const deleteExpense = async (id) => {
    try {
      const { data } = await axios.delete(`/api/expense/delete/${id}`)
      if (data.success) {
        toast.success('Expense deleted')
        fetchExpense();
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchExpense()
    fetchTripName()
  }, [])
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center  bg-gradient-to-br from-blue-400 to-purple-500">
        <img src="/bg_2.webp" className='w-full h-screen absolute' alt="bg" />
        <div className='relative'>
        <h1 className="sm:text-5xl text-2xl text-black mt-5 text-center font-bold mb-10">Set Budget for Trip</h1>
        <form onSubmit={addingExpenses} >
          <div className="flex flex-col items-center gap-5 sm:w-180 w-70 bg-white/5 shadow-2xl shadow-black backdrop-blur-sm p-10 rounded-xl">
            <h2 className="sm:text-3xl text-sm text-black font-semibold">Trip name: {Tname}</h2>
            <input
              type="text"
              placeholder="Description"
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
              className=" rounded-full px-2 py-1 sm:px-4 w-45 sm:py-2 bg-slate-950 text-white font-medium sm:w-90"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amt}
              onChange={(e) => setamt(e.target.value)}
              className="rounded-full px-2 py-1 sm:px-4 w-45 sm:py-2 bg-slate-950 text-white font-medium sm:w-90 "
            />
            <button
              type="submit"
              className="bg-slate-800 text-white sm:px-6 px-1 py-1 w-45 sm:w-90 sm:py-2 rounded-full hover:bg-slate-950 hover:scale-110 transition-all cursor-pointer"
            >
              Add Amount
            </button>
          </div>
        </form>
        <div className='flex justify-center'>
          {expensis.length === 0 ? (<><p className='mt-5 text-2xl font-medium'>Expense not added yet</p></>)
            :
            (<>
              <div className="max-h-46 overflow-x-auto mt-5 ">
                <table className="border text-center sm:w-180 w-70  divide-y-2 divide-gray-200">
                  <thead className="top-0 w-180 bg-white/90 backdrop-blur-md">
                    <tr className="*:font-medium *:text-gray-900">
                      <th className="px-3 py-2 whitespace-nowrap">Description</th>
                      <th className="px-3 py-2 whitespace-nowrap">Amount</th>
                      <th className="px-3 py-2 whitespace-nowrap">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {expensis.map((expense) => (
                      <tr key={expense._id} className="font-medium text-slate-950 text-lg bg-white/40 backdrop-blur-sm ">
                        <td className="px-3 py-2 whitespace-nowrap">{expense.description}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{expense.amount}</td>
                        <td onClick={() => deleteExpense(expense._id)} className="px-3 py-2 whitespace-nowrap hover:cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#242424"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
              
            </>
            )
          }

        </div>
        <div className='flex justify-center'>
          <div className='bg-slate-950/50 backdrop-blur-md w-75 sm:w-75 rounded-full mt-5 text-center py-3 font-bold text-white hover:scale-105 cursor-pointer transition-all'>Total Budget : {totalExp}
        </div>
        </div>
        
        </div>
      </div>
    </>
  )
}

export default Budget