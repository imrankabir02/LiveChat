import React, { useState } from 'react'
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CheckEmail() {
  const [data, setData] = useState({
    email: ""
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // const URL = '${REACT_APP_BACKEND_URL}/register'
    const URL = `${process.env.REACT_APP_BACKEND_URL}/email`

    try {
      const res = await axios.post(URL, data)
      toast.success(res.data.message)

      if (res.data.success) {
        setData({
          email: ""
        })
      }
      navigate('/password')
    } catch (error) {
      toast.error(error?.res?.data?.message)
    }
  }

  return (
    <div>
      <div className='bg-white w-full max-w-sm m-2 overflow-hidden p-4 mx-auto my-10 rounded-md shadow-lg'>
        <div className='w-fit mx-auto mb-2'>
          <RxAvatar
            size={90}
          />
        </div>
        <h3 className='text-center'>Welcome! Happy Messaging!!</h3>

        <form action="" className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">
              Email:
            </label>
            <input type="email"
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 focus:outline-red-900'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="bg-red-400 text-lg px-4 py-1 hover:bg-red-600 hover:text-gray-400 rounded font-semibold text-zinc-700">
            Let's GO
          </button>
        </form>

        <p className='my-3 text-center'>
          New User ? <Link to={"/register"} className="hover:text-gray-400 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  )
}
