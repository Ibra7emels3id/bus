import React, { useState } from 'react';
import IconBus from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const Navigate = useNavigate()
    // SetData
    const [Data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    // handle Change event
    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }

    // Fetch data Api
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_SOME_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
            });
            if (!response.ok) {
                toast.error('User already exists')
                return;
            }
            toast.success('Registration Successfully')
            Navigate('/login')
        } catch (error) {
            console.error('Failed to register')
        }
    }


    return (
        <>
            <div className="flex  h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="bg-[#f5f5f5] w-[40%] m-auto p-10 rounded-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src={IconBus}
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="mt-5  sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={Data.name}
                                        id="name"
                                        name="name"
                                        htmlFor="fullName"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        className="block w-full h-12 px-2 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={Data.email}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full h-12 px-2 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={Data.password}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full  h-12 px-2 outline-none  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={HandleSubmit}
                                    type="submit"
                                    className="flex  w-full justify-center items-center  h-12 outline-none  rounded-md bg-[#7c3aed] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                login Now!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
