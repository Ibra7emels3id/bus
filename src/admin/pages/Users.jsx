import React, { useEffect, useState } from 'react';
import Header from '../_Components/Header';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import MainNavbar from '../_Components/MainNavbar';

export default function Users() {
    const [email, setemail] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Search for users
    const SearchData = async (e) => {
        e.preventDefault();
        if (!email) {
            GetUsers();
            return;
        }
        setLoading(true);
        try {
            const Res = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/users`, { email });
            setUsers(Res.data);
            setemail('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Get All Users
    const GetUsers = async () => {
        setLoading(true);
        try {
            const Res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/users`);
            setUsers(Res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // handle Block User
    const handleBlockUser = async (id) => {
        setLoading(true);
        try {
            await axios.put(`${import.meta.env.VITE_SOME_URL}/api/user/block/${id}`);
            const updatedUsers = users.map((user) => user._id === id? {...user, isBlocked:!user.isBlocked } : user);
            setUsers(updatedUsers);
            toast.success('User blocked successfully')
        } catch (error) {
            console.error(error);
            toast.error('Failed to block user')
        } finally {
            setLoading(false);
        }
    }

    // Delete User
    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setLoading(true);
            try {
                await axios.delete(`${import.meta.env.VITE_SOME_URL}/api/users/${id}`);
                const updatedUsers = users.filter((user) => user._id !== id);
                setUsers(updatedUsers);
                toast.success('Deleted user successfully')
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete user')
            } finally {
                setLoading(false);
            }
        }
    }

    // Set Use Effect
    useEffect(() => {
        GetUsers();
    }, []);

    // Set Loading 
    if (loading) {
        return <Loader />
    }


    return (
        <>
            <Header />
            <div className="flex w-full">
                <MainNavbar />
                <div className="flex flex-col w-full items-center justify-center p-5">
                    <div className="flex w-full">
                        <form className="w-1/2 m-auto flex gap-3">
                            <input
                                className='w-full border focus:outline-none px-3 h-12'
                                onChange={(e) => setemail(e.target.value)}
                                name='email'
                                type="email"
                                value={email}
                                placeholder="Search email users..."
                            />
                            <button
                                className='w-[120px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'
                                onClick={SearchData}
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Table to display users */}
                    <div className="mt-12 px-6">
                        {<TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{backgroundColor:'#000' , color:'white'}}>
                                    <TableRow>
                                        <TableCell  sx={{color:'white'}} width={100} align='center'><strong>ID</strong></TableCell>
                                        <TableCell sx={{color:'white'}} width={200} align='center'><strong>Name</strong></TableCell>
                                        <TableCell sx={{color:'white'}} width={200} align='center'><strong>Email</strong></TableCell>
                                        <TableCell sx={{color:'white'}} width={200} align='center'><strong>Role</strong></TableCell>
                                        <TableCell sx={{color:'white'}} width={200} align='center'><strong>BLock</strong></TableCell>
                                        <TableCell sx={{color:'white'}} width={100} align='center'><strong>Delete</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell align='center'>#{user._id.slice(0, 6)}</TableCell>
                                                <TableCell align='center'>{user.name}</TableCell>
                                                <TableCell align='center'>{user.email}</TableCell>
                                                <TableCell align='center'>{user.role}</TableCell>
                                                <TableCell width={200} align='center'>
                                                    <button className={`${user.isBlocked === true ? 'bg-black' : 'bg-green-700' } w-32 h-10 rounded-lg text-white`} onClick={() => {
                                                        handleBlockUser(user._id)
                                                    }}>{user.isBlocked === true ? 'UnBlock' : 'Block'}</button>
                                                </TableCell>
                                                <TableCell width={200} align='center'>
                                                    <button className='bg-red-500 w-32 h-10 rounded-lg text-white' onClick={() => {
                                                        handleDeleteUser(user._id)
                                                    }}>Delete</button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">No users found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
