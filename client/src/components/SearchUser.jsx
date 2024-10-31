import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Loader from './Loader';
import UserSearchCard from './UserSearchCard';


export default function SearchUser() {
    const [searchUser, setSearchUser] = useState([])
    const [loading, setLoading] = useState(true)
    
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-800 bg-opacity-40'>

            <div className='w-full max-w-md mx-auto mt-10'>
            
                <div className='flex h-12 overflow-hidden bg-white rounded'>
            
                    <input type="text" placeholder='Search User'
                        className='w-full h-full px-4 py-1 outline-none' />
                    <div className='flex items-center justify-center h-14 w-14'>
                        <IoSearchOutline size={25} />
                    </div>
                </div>

                <div className='w-full p-4 mt-2 bg-white rounded'>
                    {
                        searchUser.length === 0 && !loading && (
                            <p className='text-center text-slate-800'>No user found.</p>
                        )
                    }

                    {
                        loading && (
                            <p>
                                <Loader/>
                            </p>
                        )
                    }

                    {
                        searchUser.length !== 0 && !loading && (
                            searchUser.map((user, idx) => {
                                return (
                                    <UserSearchCard key={user._id} user= {user}/>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}
