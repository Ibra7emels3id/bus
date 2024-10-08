import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { ContextData } from '../context/ContextApi';
import axios from 'axios';


// Import Image
import Logo from '../assets/logo.png'


export default function Navbar() {
    const { UserData } = useContext(ContextData)

    // Handle LogOut 
    const handleLogOut = () => {
        axios.post('http://localhost:3000/api/user/logout', {
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
                    <ul className="hidden lg:flex ml-20 items-center justify-center gap-6">
                        <li>
                            <Link to={'/'} className='text-neutral-600 font-medium ' >Home</Link>
                        </li>
                        <li>
                            <Link to={'/about'} className='text-neutral-600 font-medium ' >About Us</Link>
                        </li>
                        <li>
                            <Link className='text-neutral-600 font-medium ' >Bus</Link>
                        </li>
                        <li>
                            <Link className='text-neutral-600 font-medium ' >Services</Link>
                        </li>
                    </ul>
                </div>

                {/* Navigation links */}
                <div className='flex items-center justify-center'>
                    <div className="flex items-center justify-center">
                        <div className="relative hidden md:block bg-violet-600 rounded-md px-8 py-2 w-fit cursor-pointer">
                            <div className="absolute top-[50%] -left-6 translate-y-[-50%] w-9 h-9 rounded-full bg-violet-600 border-4 border-neutral-100  flex items-center justify-center">
                                <PhoneIcon sx={{ color: 'white', fontSize: '20px' }} />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs text-neutral-200 font-light">
                                    Need Help?
                                </p>
                                <p className="text-xs font-normal text-neutral-50 tracking-wide">+91 1234567890</p>
                            </div>
                        </div>
                        <div className="them rounded-full bg-white p-3 mx-3  cursor-pointer ">
                            <BrightnessHighIcon sx={{ color: 'black', fontSize: '25px' }} />
                        </div>
                        <label className="flex lg:hidden  mx-4 flex-col gap-2 w-8">
                            <input className="peer hidden" type="checkbox" />
                            <div
                                className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"
                            ></div>
                            <div
                                className="rounded-2xl h-[3px] w-full bg-black duration-500 peer-checked:-rotate-45"
                            ></div>
                            <div
                                className="rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"
                            ></div>
                        </label>
                        {UserData.role === 'admin' && (
                            <>
                                <Link className='mx-4' to={'/admin'}>
                                    Admin
                                </Link>
                                <LogoutIcon onClick={handleLogOut} className=' cursor-pointer mx-4' sx={{ color: 'black', fontSize: '25px' }} />
                            </>
                        )}
                        {UserData && (
                            <div onClick={handleLogOut} className='mx-4 flex  items-center justify-center'>
                                {UserData.role === 'user' &&
                                    <>
                                        <Avatar
                                            sx={{ width: 30, height: 30, marginRight: '30px', borderRadius: '50%' }}
                                            alt={UserData.name}
                                            src={UserData?.image}
                                            className=' cursor-pointer'
                                        />
                                        <LogoutIcon className=' cursor-pointer' sx={{ color: 'black', fontSize: '25px' }} />
                                    </>
                                }
                            </div>
                        )}
                        {!UserData.role && <Link to={'/login'}>Login</Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}
