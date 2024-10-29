import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userSlice'
import { setUser } from '../redux/userSlice'

export default function Home() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  console.log("redux user", user);
  const fetchUserDetails = async() => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/user-details`

      const res = await axios(URL, {
        withCredentials: true
      })

      dispatch(setUser(res.data.data))

      if(res.data.logout) {
        dispatch(logout)
        navigate('/email')
      }

      console.log("data", res)

    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchUserDetails()
  },[])
  return (
    <div className='grid grid-cols-[280px,1fr]'>
      <div>
        <section>
          sidebar
        </section>
      </div>
      <section>
        <Outlet/>
      </section>
    </div>
  )
}
