import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextData } from '../context/ContextApi';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Portfolio = () => {
    const { UserData, setUserData } = useContext(ContextData)
    const [loading, setLoading] = useState(true)
    const [ImageUrl, setImageUrl] = useState(null)

    const Navigate = useNavigate()

    // Handle navigation Page Events
    if (!UserData?.token) {
        Navigate('/login')
    } else {
        Navigate('/portfolio')
    }

    const handleLogOut = () => {
        axios.post('http://localhost:3000/api/user/logout', {
            method: 'POST',
            credentials: 'include'
        })

        localStorage.removeItem('token')
        window.location.href = '/login'
        setUserData(null)
        
    }



    return (
        <>
            <Navbar />
            <div className="my-4 mt-20 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
                <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
                    <div className="shrink-0 mr-auto sm:py-3">
                        <p className="font-medium">Account Details</p>
                        <p className="text-sm text-gray-600">Edit your account details</p>
                    </div>
                    <button onClick={handleLogOut} className="mr-2 outline-none focus:outline-none hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline hover:bg-gray-200">
                        logOut
                    </button>
                    <button className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none hover:bg-blue-700">
                        Save
                    </button>
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Name</p>
                    <input
                        value={UserData?.user?.name}
                        placeholder="First Name"
                        className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
                    />
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Email</p>
                    <input
                        value={UserData?.user?.email}
                        placeholder="your.email@domain.com"
                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                    />
                </div>
                <div className="flex flex-col gap-4 py-4  lg:flex-row">
                    <div className="shrink-0 w-32  sm:py-4">
                        <p className="mb-auto font-medium">Avatar</p>
                        <p className="text-sm text-gray-600">Change your avatar</p>
                    </div>
                    <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                        <img
                            src={ImageUrl}
                            className="h-20 w-20 rounded-full"
                        />
                        <p className="text-sm text-gray-600">
                            Drop your desired image file here to start the upload
                        </p>
                        <input
                            onChange={(e) => {
                                // handle file upload logic here
                                const file = URL.createObjectURL(e.target.files[0])
                                setImageUrl(file)
                            }}
                            type="file"
                            className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                        />
                    </div>
                </div>
                <div className="flex justify-end py-4 sm:hidden">
                    <button className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">
                        Cancel
                    </button>
                    <button className="rounded-lg border-2 border-transparent bg-[#6d28d9] px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default Portfolio;