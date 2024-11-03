import React, { useState } from 'react'
import { BsChat } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";
import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import SearchUser from './SearchUser';
import { logout } from '../redux/userSlice';



export default function Sidebar() {
  const user = useSelector(state => state?.user)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [allUser, setAllUser] = useState([])
  const [openSearchUser, setOpenSearchUser] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/email')
    localStorage.clear()
  }

  return (
    <div className='grid w-full h-full grid-cols-[48px,1fr] bg-white'>
      <div className='flex flex-col justify-between w-12 h-full py-5 rounded-tr-lg rounded-br-lg bg-slate-100 text-slate-700'>
        <div>
          <NavLink className={({ isActive }) => `flex items-center justify-center w-12 h-12 rounded cursor-pointer hover:bg-slate-200 ${isActive && "bg-slate-300"}`} title='chat'>
            <BsChat
              size={25}
            />
          </NavLink>
          <div onClick={() => setOpenSearchUser(true)} className='flex items-center justify-center w-12 h-12 rounded cursor-pointer hover:bg-slate-200' title='add friend'>
            <HiUserAdd
              size={30}
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
            <Avatar
              width={36}
              height={36}
              name={user?.name}
              imageUrl={user?.profile_pic}
            />
          </button>
          <button onClick={handleLogout} className='flex items-center justify-center w-12 h-12 rounded cursor-pointer hover:bg-slate-200' title='logout'>
            <span className='-ml-1'>
              <BiLogOutCircle
                size={30}
              />
            </span>
          </button>
        </div>
      </div>

      <div className='w-full'>
        <div className='flex items-center h-16'>

          <h2 className='p-4 text-2xl font-semibold text-slate-800'>Message</h2>
        </div>
        <Divider />

        <div className="h-[calc(100vh-72px)] overflow-x-hidden overflow-y-auto scrollbar">
          {
            allUser.length === 0 && (
              <div className='mt-0'>
                <div className='flex justify-center'>
                  <IoArrowBackCircleOutline
                  size={40}
                  />

                </div>
                <p className='text-lg text-center text-slate-800'>Explore to start a conversation</p>
              </div>
            )
          }
        </div>
      </div>
      {
        editUserOpen && (
          <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
        )
      }

      {
        openSearchUser && (
          <SearchUser onClose={() => setOpenSearchUser(false)}/>
        )
      }
    </div>
  )
}
