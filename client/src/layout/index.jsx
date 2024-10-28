import React from 'react'
import logo from "../assets/1.jpg"

export default function AuthLayouts({children}) {
    return (
        <>
            <header className='flex justify-center items-center py-3 shadow-md h-20 bg-white'>
                <img src={logo} 
                alt="logo"
                width={50}
                height={100}
                className='rounded-lg'
                />
            </header>
            {children}
        </>
    )
}
