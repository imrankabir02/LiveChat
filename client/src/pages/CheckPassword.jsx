import React, { useState } from 'react'
import { RxAvatar } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Avatar from '../components/Avatar';

export default function CheckPassword() {
    const [data, setData] = useState({
        password: "",
        userId: ""
    })

    const navigate = useNavigate()
    const location = useLocation()

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
        const URL = `${process.env.REACT_APP_BACKEND_URL}/password`

        try {
            const res = await axios.post(URL, data)
            toast.success(res.data.message)

            if (res.data.success) {
                setData({
                    password: ""
                })
            }
            navigate('')
        } catch (error) {
            toast.error(error?.res?.data?.message)
        }
    }

    return (
        <div>
            <div className='bg-white w-full max-w-sm m-2 overflow-hidden p-4 mx-auto my-10 rounded-md shadow-lg'>
                <div className='w-fit mx-auto mb-2'>
                    {/* <RxAvatar
                        size={90}
                    /> */}
                    <Avatar
                        width={70}
                        height={70}
                        name={location?.state?.name}
                        imageUrl={location?.state?.profile_pic}
                    />
                    <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
                </div>

                <form action="" className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="password"
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            className='bg-slate-100 px-2 focus:outline-red-900'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <button className="bg-red-400 text-lg px-4 py-1 hover:bg-red-600 hover:text-gray-400 rounded font-semibold text-zinc-700">
                        Let's GO
                    </button>
                </form>

                <p className='my-3 text-center'>
                    <Link to={"/forget-password"} className="hover:text-gray-400 font-semibold">Forget Password ?</Link>
                </p>
            </div>
        </div>
    )
}
