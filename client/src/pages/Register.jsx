import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import { uploadFile } from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: ""
    })

    const [uploadPhoto, setUploadPhoto] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0]
        setLoading(true)

        const uploadPhoto = await uploadFile(file)


        setData((prev) => {
            return {
                ...prev,
                profile_pic: uploadPhoto?.url
            }
        })
        setUploadPhoto(file)
    }

    const handleClearPhoto = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setUploadPhoto(null)

        setData((prev) => ({
            ...prev,
            profile_pic: ""
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        // const URL = '${REACT_APP_BACKEND_URL}/register'
        const URL = `${process.env.REACT_APP_BACKEND_URL}/register`

        try {
            const res = await axios.post(URL, data)
            toast.success(res.data.message)

            if (res.data.success) {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    profile_pic: ""
                })
            }

            navigate('/email')
        } catch (error) {
            toast.error(error?.res?.data?.message)
        }
    }

    return (
        <div>
            <div className='bg-white w-full max-w-sm m-2 overflow-hidden p-4 mx-auto my-10 rounded-md shadow-lg'>
                <h3>Welcome! Happy Messaging!!</h3>

                <form action="" className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name">
                            Name:
                        </label>
                        <input type="text"
                            id='name'
                            name='name'
                            placeholder='Enter your name'
                            className='bg-slate-100 px-2 focus:outline-red-900'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
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
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="profile_pic">
                            Photo:

                            <div className='h-14 cursor-pointer bg-slate-300 flex justify-center items-center border rounded hover:border-red-900'>
                                <p className='text-sm'>
                                    {uploadPhoto?.name ? uploadPhoto?.name : 'Upload Profile Photo'}
                                </p>

                                {
                                    uploadPhoto?.name && (<button className='text-lg ml-2 hover:text-red-600' onClick={handleClearPhoto}>
                                        <IoIosClose />
                                    </button>)
                                }


                            </div>
                        </label>
                        <input type="file"
                            id='profile_pic'
                            name='profile_pic'
                            className='bg-slate-100 px-2 focus:outline-red-900 hidden'
                            onChange={handleUploadPhoto}
                        />
                    </div>

                    <button className="bg-red-400 text-lg px-4 py-1 hover:bg-red-600 hover:text-gray-400 rounded font-semibold text-zinc-700">
                        Register
                    </button>
                </form>

                <p className='my-3 text-center'>
                    Already have account? <Link to={"/email"} className="hover:text-gray-400 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    )
}
