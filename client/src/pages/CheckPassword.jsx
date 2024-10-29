import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

export default function CheckPassword() {
    const [data, setData] = useState({
        password: "",
        userId: ""
    })

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!location?.state?.name) {
            navigate('/email')
        }
    }, [])
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

        const URL = `${process.env.REACT_APP_BACKEND_URL}/password`

        try {
            const { data: res } = await axios.post(URL, {
                userId: location?.state?._id,
                password: data.password
            }, {
                withCredentials: true
            })

            toast.success(res?.message)
            
            if (res?.success) {
                dispatch(setToken(res?.token))
                localStorage.setItem('token',res?.token)
                setData({
                    password: ""
                })
            }
            navigate('/')
        } catch (error) {
            toast.error(error?.res?.data?.message || "Error")
        }
    }

    return (
        <div>
            <div className='w-full max-w-sm p-4 m-2 mx-auto my-10 overflow-hidden bg-white rounded-md shadow-lg'>
                <div className='flex flex-col items-center mx-auto mb-2 justfy-center'>
                    {/* <RxAvatar
                        size={90}
                    /> */}
                    <Avatar
                        width={70}
                        height={70}
                        name={location?.state?.name}
                        imageUrl={location?.state?.profile_pic}
                    />
                    <h2 className='mt-1 text-lg font-semibold'>{location?.state?.name}</h2>
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
                            className='px-2 bg-slate-100 focus:outline-red-900'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <button className="px-4 py-1 text-lg font-semibold bg-red-400 rounded hover:bg-red-600 hover:text-gray-400 text-zinc-700">
                        Let's GO
                    </button>
                </form>

                <p className='my-3 text-center'>
                    <Link to={"/forget-password"} className="font-semibold hover:text-gray-400">Forget Password ?</Link>
                </p>
            </div>
        </div>
    )
}
