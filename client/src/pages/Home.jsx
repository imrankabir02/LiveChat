import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setUser, setOnlineUser, setSocketConnection } from '../redux/userSlice'  // Ensure both actions are imported
import Sidebar from '../components/Sidebar';
import logo from '../assets/1.jpg'
import io from 'socket.io-client'

export default function Home() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/user-details`

      const res = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(res.data.data))

      if (res.data.logout) {
        dispatch(logout())  // Dispatch logout as a function call
        navigate('/email')
      }

      console.log("data", res)

    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  useEffect(()=>{
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
      auth : {
        token : localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser',(data)=>{
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[])
  
  const basePath = location.pathname === '/'

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      {/* Sidebar */}
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/* Main Content */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
        <div>
          <img src={logo} alt="logo"
            width={50}
            height={100} 
            className='rounded'
            />
        </div>
        <p className='mt-2 text-lg text-slate-700'>Select user to send message</p>
      </div>
    </div>
  )
}
