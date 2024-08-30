import React from 'react'
import { Link } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';

// Import Image
import Logo from '../assets/logo.png'
export default function Navbar() {
    return (
        <div className=' bg-neutral-100 h-[65px] m-auto  justify-between flex items-center '>
            {/* Logo section */}
            <div className="flex w-[90%] m-auto justify-between items-center  "><div className="logo flex items-center">
                <Link to={"/"} className=''>
                    <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
                </Link>
                <ul className="flex ml-20  items-center justify-center gap-6">
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


                    <div className="flex md:items-center items-start gap-x-5 gap-y-2 flex-wrap md:flex-row flex-col text-base font-medium text-neutral-800">
                        <div className="relative bg-violet-600 rounded-md px-8 py-2 w-fit cursor-pointer">
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
                        <div className="them rounded-full bg-white p-3 ml-3 cursor-pointer ">
                            <BrightnessHighIcon sx={{ color: 'black', fontSize: '25px' }} />
                        </div>
                    </div>
                </div></div>

        </div>
    )
}
