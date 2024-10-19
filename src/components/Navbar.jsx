import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { ContextData } from '../context/ContextApi';
import axios from 'axios';


// Import Image
import Logo from '../assets/logo.png'
import AlertLinks from './AlertLinks';


export default function Navbar() {
    const { UserData } = useContext(ContextData)
    const Navigate = useNavigate()
    const [open, setOpen] = useState(false);


    // Handle LogOut 
    const handleLogOut = () => {
        axios.post(`${import.meta.env.VITE_SOME_URL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        localStorage.removeItem('token')
        window.location.href = '/login'
    }


    // Toggle Dark Mode
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

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
                        {UserData.role === 'admin' && (
                            <>
                                <li>
                                    <Link to={'/reservations'} className='text-neutral-600 font-medium ' >Reservations</Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to={'/about'} className='text-neutral-600 font-medium ' >About Us</Link>
                        </li>
                        <li>
                            <Link to={'/bus'} className='text-neutral-600 font-medium ' >Bus</Link>
                        </li>
                        <li>
                            <Link to={'/services'} className='text-neutral-600 font-medium ' >Services</Link>
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
                        <label onClick={toggleDrawer(true)} className="flex lg:hidden  mx-4 flex-col gap-2 w-8">
                            <input className="peer hidden" type={`${open !== false ? 'checkbox' : 'text'}`} />
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
                            <div className='mx-4 flex m-auto items-center justify-center'>
                                {UserData.role === 'user' &&
                                    <>
                                        <Avatar
                                            sx={{ width: 30, margin:'auto', height: 30, marginRight: '30px', borderRadius: '50%' }}
                                            alt={UserData?.user?.name}
                                            src={`${import.meta.env.VITE_SOME_URL}/${UserData?.user?.image}`}
                                            className=' cursor-pointer'
                                            onClick={() => {
                                                Navigate('/portfolio')
                                            }}
                                        />
                                        {/* <LogoutIcon onClick={handleLogOut} className=' cursor-pointer' sx={{ color: 'black', fontSize: '25px' }} /> */}
                                    </>
                                }
                            </div>
                        )}
                        {!UserData.role && <Link to={'/login'}>Login</Link>}
                    </div>
                </div>
            </div>
            <AlertLinks open={open} toggleDrawer={toggleDrawer} />
        </div>
    )
}
