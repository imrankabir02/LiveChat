import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Loader from './Loader';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast'
import axios from 'axios';
import { IoClose } from "react-icons/io5";

const SearchUser = ({onClose}) => {
    const [searchUser,setSearchUser] = useState([])
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState("")


    const handleSearchUser = async()=>{
        const URL = `${process.env.REACT_APP_BACKEND_URL}/search-user`
        try {
            setLoading(true)
            const res = await axios.post(URL,{
                search : search
            })
            setLoading(false)

            setSearchUser(res.data.data)

        } catch (error) {
            toast.error(error?.res?.data?.message)
        }
    }

    useEffect(()=>{
        handleSearchUser()
    },[search])

    console.log("searchUser",searchUser)
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-10 p-2 bg-slate-700 bg-opacity-40'>
        <div className='w-full max-w-lg mx-auto mt-10'>
            {/**input search user */}
            <div className='flex overflow-hidden bg-white rounded h-14 '>
                <input 
                    type='text'
                    placeholder='Search user by name, email....'
                    className='w-full h-full px-4 py-1 outline-none'
                    onChange={(e)=>setSearch(e.target.value)}
                    value={search}
                />
                <div className='flex items-center justify-center h-14 w-14'>
                    <IoSearchOutline size={25}/>
                </div>
            </div>

            {/**display search user */}
            <div className='w-full p-4 mt-2 bg-white rounded'>
                {/**no user found */}
                {
                    searchUser.length === 0 && !loading && (
                        <p className='text-center text-slate-500'>no user found!</p>
                    )
                } 

                {
                    loading && (
                        <p><Loader/></p>
                    )
                }

                {
                    searchUser.length !==0 && !loading && (
                        searchUser.map((user,index)=>{
                            return(
                                <UserSearchCard key={user._id} user={user} onClose={onClose}/>
                            )
                        })
                    )
                } 


            </div>
        </div>

        <div className='absolute top-0 right-0 p-2 text-2xl lg:text-4xl hover:text-white' onClick={onClose}>
            <button>
                <IoClose/>
            </button>
        </div>
    </div>
  )
}

export default SearchUser