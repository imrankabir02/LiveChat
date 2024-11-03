import React from 'react'
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

export default function UserSearchCard({user, onClose}) {
  return (
    <Link to={"/"+user?._id} onClick={onClose} className='flex items-center gap-3 p-2 rounded cursor-pointer hover:border hover:border-red-800'>
      <div>
        <Avatar 
        width={50}
        height={50}
        name={user?.name}
        imageUrl={user?.profile_pic}
        />
      </div>
      <div>
        <div className='font-semibold'>
          {user?.name}
        </div>
        <p className='text-sm'>{user?.email}</p>
      </div>
    </Link>
  )
}
