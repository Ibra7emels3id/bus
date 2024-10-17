import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextData } from '../context/ContextApi';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });



const Portfolio = () => {
    const { UserData, setUserData } = useContext(ContextData)
    const [ImageUrl, setImageUrl] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const Navigate = useNavigate()

    // Handle navigation Page Events
    useEffect(() => {
        if (UserData?.role === 'admin') {
            Navigate('/admin');
        }
        if (UserData?.user) {
            setName(UserData?.user?.name)
            // setEmail(UserData?.user?.email)
        }
    }, [UserData, Navigate]);

    const handleLogOut = async () => {
        await axios.post(`${import.meta.env.VITE_SOME_URL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        localStorage.removeItem('token')
        window.location.href = '/login'
        setUserData(null)
    }



    // Update User Profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        const fromData = new FormData();
        fromData.append('name', name)
        fromData.append('image', UserData?.user?.image)
        // fromData.append('email', email)
        if (imageFile) {
            fromData.append('image', imageFile)
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_SOME_URL}/api/user/${UserData?.user._id}`, fromData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                },
                credentials: 'include'
            })
            setUserData(response.data)
            toast.info('Profile updated successfully')
        } catch (error) {
            console.error(error)
        }
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
                    <button onClick={handleUpdateProfile} className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none hover:bg-blue-700">
                        Save
                    </button>
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Name</p>
                    <input
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        value={name}
                        placeholder="First Name"
                        className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
                    />
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="shrink-0 w-32 font-medium">Email</p>
                    <p className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1">
                        {UserData?.user?.email || 'No email provided'}
                    </p>
                </div>
                <div className="flex flex-col gap-4 py-4  lg:flex-row">
                    <div className="shrink-0 w-32  sm:py-4">
                        <p className="mb-auto font-medium">Avatar</p>
                        <p className="text-sm text-gray-600">Change your avatar</p>
                    </div>
                    <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                        {ImageUrl ? <img
                            src={ImageUrl}
                            className="w-32 rounded-full"
                        /> : <img
                            src={`${import.meta.env.VITE_SOME_URL}/${UserData?.user?.image}`}
                            className="w-32 rounded-full"
                        />}

                        <p className="text-sm text-gray-600">
                            Drop your desired image file here to start the upload
                        </p>
                        {/* <input
                            onChange={(e) => {
                                // handle file upload logic here
                                const file = URL.createObjectURL(e.target.files[0])
                                setImageUrl(file)
                                setImageFile(e.target.files[0])
                            }}
                            type="file"
                            className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                        /> */}
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
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