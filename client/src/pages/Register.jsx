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
            <div className='w-full max-w-sm p-4 m-2 mx-auto my-10 overflow-hidden bg-white rounded-md shadow-lg'>
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
                            className='px-2 bg-slate-100 focus:outline-red-900'
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
                            className='px-2 bg-slate-100 focus:outline-red-900'
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
                            className='px-2 bg-slate-100 focus:outline-red-900'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="profile_pic">
                            Photo:

                            <div className='flex items-center justify-center border rounded cursor-pointer h-14 bg-slate-300 hover:border-red-900'>
                                <p className='text-sm'>
                                    {uploadPhoto?.name ? uploadPhoto?.name : 'Upload Profile Photo'}
                                </p>

                                {
                                    uploadPhoto?.name && (<button className='ml-2 text-lg hover:text-red-600' onClick={handleClearPhoto}>
                                        <IoIosClose />
                                    </button>)
                                }


                            </div>
                        </label>
                        <input type="file"
                            id='profile_pic'
                            name='profile_pic'
                            className='hidden px-2 bg-slate-100 focus:outline-red-900'
                            onChange={handleUploadPhoto}
                        />
                    </div>

                    <button className="px-4 py-1 text-lg font-semibold bg-red-400 rounded hover:bg-red-600 hover:text-gray-400 text-zinc-700">
                        Register
                    </button>
                </form>

                <p className='my-3 text-center'>
                    Already have account? <Link to={"/email"} className="font-semibold hover:text-gray-400">Login</Link>
                </p>
            </div>
        </div>
    )
}
