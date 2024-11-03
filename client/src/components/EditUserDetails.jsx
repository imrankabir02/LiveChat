import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import { uploadFile } from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

export default function EditUserDetails({ onClose, user }) {
    const [data, setData] = useState({
        name: '',
        profile_pic: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const uploadPhotoRef = useRef()
    const dispatch = useDispatch

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || '',
                profile_pic: user.profile_pic || ''
            })
        }
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUploadPhoto = async (e) => {
        try {
            const file = e.target.files[0]
            if (!file) return
            
            setIsLoading(true)
            const uploadPhoto = await uploadFile(file)
            
            if (uploadPhoto?.url) {
                setData(prev => ({
                    ...prev,
                    profile_pic: uploadPhoto.url
                }))
            }
        } catch (error) {
            toast.error('Failed to upload photo')
            console.error('Upload error:', error)
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleOpenUploadPhoto = (e) => {
        e.preventDefault()
        uploadPhotoRef.current?.click()
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const URL = `${process.env.REACT_APP_BACKEND_URL}/update-user`
            const res = await axios.post(URL, data, {
                withCredentials:true
            })

            toast.success(res?.data?.message || 'Profile updated successfully')
            if(res?.success) {
                dispatch(setUser(res?.data))
            }
            onClose?.()
        } catch (error) {
            console.error('Update error:', error)
            toast.error(error?.res?.data?.message || 'Failed to update profile')
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='w-full max-w-sm p-6 m-4 bg-white rounded-lg shadow-lg'>
                <div className='mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        Profile Details
                    </h2>
                    <p className='text-sm text-gray-600'>
                        Edit user details
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
                            Name
                        </label>
                        <input 
                            type="text"
                            name='name'
                            id='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                            placeholder='Enter your name'
                            disabled={isLoading}
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Photo
                        </label>
                        <div className='flex items-center gap-4'>
                            <Avatar
                                width={48}
                                height={48}
                                imageUrl={data.profile_pic}
                                name={data.name}
                            />
                            <button 
                                type="button"
                                onClick={handleOpenUploadPhoto}
                                className='text-sm font-semibold text-red-600 hover:text-red-700'
                                disabled={isLoading}
                            >
                                Change Photo
                            </button>
                            <input
                                type='file'
                                id='profile_pic'
                                className='hidden'
                                onChange={handleUploadPhoto}
                                ref={uploadPhotoRef}
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-3 pt-4'>
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}