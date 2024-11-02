import React, { useContext, useEffect, useState } from 'react'
import { Navigate} from 'react-router-dom'
import Header from './_Components/Header'
import MainNavbar from './_Components/MainNavbar'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ContextData } from '../context/ContextApi'
import Loader from '../components/Loader'

function Admin() {
    const [Products, setProducts] = useState([])
    const { UserData } = useContext(ContextData);
    const [loading, setloading] = useState(false)
    const [Users, setUsers] = useState([])
    const [allBuss , setAllBuss] = useState([])

    // getDataProducts
    const getDataReservations = async () => {
        try {
            setloading(true);
            const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/payment`)
            setProducts(response.data)
            setloading(false);
        } catch (error) {
            console.error(error)
        } finally {
            setloading(false);
        }
    }

    // Delete product
    const handleDeleteUser = async (id) => {
        try {
            setloading(true);
            const response = await axios.delete(`${import.meta.env.VITE_SOME_URL}/api/payment/${id}`)
            if (response.status === 200) {
                getDataReservations();
            }
            toast.success('Delete reservation successfully')
            setloading(false);
        } catch (error) {
            console.error(error)
        } finally {
            setloading(false);
        }
    }

    // Delete Chair 
    const handleDeleteChair = async (id, cardID) => {
        console.log(id , cardID);
        try {
            setloading(true);
            const product = Products.find(it => it.productId);
            const productId = product?.productId;

            const res = await axios.put(`${import.meta.env.VITE_SOME_URL}/api/product/AddChair/update/${productId}/chair/${id}`, {
                chair: 'without'
            });
            console.log("Response Data:", res.data);

            const resbody = await axios.put(`${import.meta.env.VITE_SOME_URL}/api/UpdateChair/update/${cardID}/chair/${id}`, {
                chair: 'without'
            });
            console.log("Response Data:", resbody.data);

            toast.success('Delete Chairs successfully')
            getDataReservations();
            setloading(false);
        } catch (error) {
            console.error("Error updating chair:", error);
        } finally {
            setloading(false);
        }
    };


    // Get Users Length
    const GetUsers = async () => {
        setloading(true);
        try {
            const Res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/users`);
            setUsers(Res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false);
        }
    }


    // Get All Bus
    const getAllBus = async () => {
        setloading(true);
        try {
            const Res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/products`);
            setAllBuss(Res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false);
        }
    }




    // getDataReservations
    useEffect(() => {
        getDataReservations();
        GetUsers();
        getAllBus();
    }, [])


    // Set loading
    if (loading || !Products) {
        return <Loader />
    }


    // Check User
    if (UserData?.user?.role == 'admin') {
        return (
            <>
                <Header />
                <div className="flex">
                    <MainNavbar />
                    <div className="flex flex-col w-full p-16">
                        <div className="grid grid-cols-3 w-full gap-5 h-56">
                            <div className="box flex items-center justify-center flex-col bg-[#f5f5f5] rounded-lg">
                                <h3 className='text-[40px] font-bold text-violet-600'>Users</h3>
                                <span className='text-[30px]'>{Users.length}</span>
                            </div>
                            <div className="box flex items-center justify-center flex-col bg-[#f5f5f5] rounded-lg">
                                <h3 className='text-[40px] font-bold text-violet-600'>Reservations</h3>
                                <span className='text-[30px]'>{Products.length}</span>
                            </div>
                            <div className="box flex items-center justify-center flex-col bg-[#f5f5f5] rounded-lg">
                                <h3 className='text-[40px] font-bold text-violet-600'>Buss</h3>
                                <span className='text-[30px]'>{allBuss.length}</span>
                            </div>
                        </div>
                        <span className="flex items-center my-9">
                            <span className="pr-6 text-2xl">Reservations</span>
                            <span className="h-px flex-1 bg-black"></span>
                        </span>
                        <div className="flex">
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#000', color: 'white' }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }} width={10} align='center'><strong>ID</strong></TableCell>
                                            <TableCell sx={{ color: 'white' }} width={100} align='center'><strong>Name</strong></TableCell>
                                            <TableCell sx={{ color: 'white' }} width={100} align='center'><strong>Email</strong></TableCell>
                                            <TableCell sx={{ color: 'white' }} width={70} align='center'><strong>Length</strong></TableCell>
                                            <TableCell sx={{ color: 'white' }} width={100} align='center'><strong>Payment Id</strong></TableCell>
                                            <TableCell sx={{ color: 'white' }} width={100} align='center'><strong>T Price</strong></TableCell>
                                            <TableCell sx={{ color: 'white' }} width={200} align='center'><strong>chair Number / Chair / IdChair</strong></TableCell>
                                            <TableCell sx={{ color: 'white' }} width={100} align='center'><strong>Delete</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Products.length > 0 ? (
                                            Products.map((user) => (
                                                <TableRow key={user._id}>
                                                    <TableCell align='center'>#{user._id.slice(0, 3)}</TableCell>
                                                    <TableCell align='center'>{user.name}</TableCell>
                                                    <TableCell align='center'>{user.email}</TableCell>
                                                    <TableCell align='center'>{user.lengthChairs}</TableCell>
                                                    <TableCell align='center'>{user.paymentIntentId.slice(0,15)}...</TableCell>
                                                    <TableCell align='center' >${user.amount}</TableCell>
                                                    <TableCell sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} align='center'>{
                                                        user?.items.map((e) => {
                                                            return (
                                                                <>
                                                                    <div className="flex gap-2 my-1">
                                                                        <p className="flex items-center px-2 py-1 text-xs font-semibold leading-5 text-gray-700 bg-green-100 rounded-full">
                                                                            {e.chair}
                                                                        </p>
                                                                        <p className="ml-2  w-32 flex items-center justify-center text-xs font-semibold leading-5 text-gray-700 bg-blue-100 rounded-lg">
                                                                            {e.status}
                                                                        </p>
                                                                        <p className="flex items-center px-2 py-1 text-xs font-semibold leading-5 text-gray-700 bg-green-100 rounded-full">
                                                                            {e.price}
                                                                        </p>
                                                                    </div>
                                                                </>
                                                            )
                                                            // return user.chair.name
                                                        })
                                                    }</TableCell>
                                                    <TableCell width={200} align='center'>
                                                        {user?.items.some((it) => it.status === 'reservation') ? (
                                                            user.items.map((it) => {
                                                                if (it.status === 'reservation') {
                                                                    return (
                                                                        <button
                                                                            key={it.chairId}
                                                                            className='bg-red-500 mt-1 w-32 h-10 rounded-lg text-white'
                                                                            onClick={() => handleDeleteChair(it.chairId, user._id)}
                                                                        >
                                                                            Delete Chair
                                                                        </button>
                                                                    );
                                                                }
                                                                return null;
                                                            })
                                                        ) : (
                                                            <button
                                                                className='bg-red-500 w-32 h-10 rounded-lg text-white'
                                                                onClick={() => handleDeleteUser(user._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">No Reservations found</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        <Navigate to="/" />
    }


}

export default Admin;