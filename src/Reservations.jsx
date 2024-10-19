import React, { useContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import { ContextData } from './context/ContextApi';
import { Navigate, useNavigate } from 'react-router-dom';
import TicketDownload from './components/TicketDownload';

const Reservations = () => {
    const [reservations, setreservations] = useState([])
    const [loading, setloading] = useState(false);
    const { UserData } = useContext(ContextData);
    const [open , setOpen] = useState(false);
    const [IDCart , setIDCart] = useState('');

    const handleClickOpen = (id) => {
        setOpen(true);
        setIDCart(id)
    };

    const handleClose = () => {
        setOpen(false);
        // GetData();
    };

    console.log();

    // Get All Reservations
    const getReservations = async () => {
        try {
            setloading(true);
            const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/payment`)
            const FilterData = await response?.data?.filter((it) => it?.customer === UserData?.user?._id)
            setreservations(FilterData)
            setloading(false);
        } catch (error) {
            console.error(error)
        } finally {
            setloading(false);
        }
    }

    // Use Effect 
    useEffect(() => {
        if(UserData?.user?._id){
            getReservations();
        }
    }, [UserData]);

    // Loading Reservations
    if (loading) {
        return <Loader />;
    }

    // Render Reservations
    if (UserData?.user) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col min-h-screen bg-gray-100">
                    <div className="container mx-auto py-10 px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Reservations</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="py-3 px-6 w-36 text-left">Payment Id</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Date</th>
                                        <th className="py-3 px-6 text-left">In Time</th>
                                        <th className="py-3 px-6 text-left">Out Time</th>
                                        <th className="py-3 px-6 text-left">From</th>
                                        <th className="py-3 px-6 text-left">To</th>
                                        <th className="py-3 px-6 text-left">Price</th>
                                        <th className="py-3 px-6 text-left">Chairs</th>
                                        <th className="py-3 px-6 text-left">Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation) => (
                                        <tr key={reservation.id} className="border-b">
                                            <td className="py-3 px-6">{reservation.paymentIntentId.slice(0, 5)}...</td>
                                            <td className="py-3 px-6">{reservation.name}</td>
                                            <td className="py-3 px-6">{reservation.date}</td>
                                            <td className="py-3 px-6">{reservation.inTime}</td>
                                            <td className="py-3 px-6">{reservation.outTime}</td>
                                            <td className="py-3 px-6">{reservation.from}</td>
                                            <td className="py-3 px-6">{reservation.to}</td>
                                            <td className="py-3 px-6">{reservation.amount}</td>
                                            <td className="py-3 px-6">{reservation.items.map((it) => {
                                                return (
                                                    <>
                                                        <div className="flex gap-2 my-1">
                                                            <p className="flex items-center px-2 py-1 text-xs font-semibold leading-5 text-gray-700 bg-green-100 rounded-full">
                                                                {it.chair}
                                                            </p>
                                                            <p className="ml-2  w-32 flex items-center justify-center text-xs font-semibold leading-5 text-gray-700 bg-blue-100 rounded-lg">
                                                                {it.status}
                                                            </p>
                                                            <p className="flex items-center px-2 py-1 text-xs font-semibold leading-5 text-gray-700 bg-green-100 rounded-full">
                                                                {it.price}
                                                            </p>
                                                        </div>
                                                    </>
                                                )
                                            })}</td>
                                            <td className="py-3 px-6">
                                                <button
                                                    className='bg-violet-600 w-36 h-10 rounded-lg text-white'
                                                    onClick={()=>{
                                                        handleClickOpen(reservation._id)
                                                    }}
                                                >
                                                    Download Teket
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <TicketDownload IDCart={IDCart} open={open} handleClose={handleClose} />
                    </div>
                </div>
                <Footer />
            </>
        );
    } else {
        <Navigate to='/' />
    }
};

export default Reservations;
