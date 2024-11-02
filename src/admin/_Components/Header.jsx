import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { ContextData } from '../../context/ContextApi';
import axios from 'axios';


// Import Image
import Logo from '../../assets/logo.png'


export default function Header() {
    const { UserData } = useContext(ContextData)

    // Handle LogOut 
    const handleLogOut = () => {
        axios.post(`${import.meta.env.VITE_SOME_URL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        localStorage.removeItem('token')
        window.location.href = '/login'
    }


    return (
        <div className=' bg-neutral-100 h-[65px] m-auto  justify-between flex items-center '>
            {/* Logo section */}
            <div className="flex w-[90%] m-auto justify-between items-center  ">
                <div className="logo flex items-center">
                    <Link to={"/"} className=''>
                        <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
                    </Link>
                </div>

                {/* Navigation links */}
                <div className='flex items-center justify-center'>
                    <div className="flex items-center justify-center">
                        <div className="them rounded-full bg-white p-3 mx-3  cursor-pointer ">
                            <BrightnessHighIcon sx={{ color: 'black', fontSize: '25px' }} />
                        </div>
                        {UserData.role === 'admin' && (
                            <>
                                <LogoutIcon onClick={handleLogOut} className=' cursor-pointer mx-4' sx={{ color: 'black', fontSize: '25px' }} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
