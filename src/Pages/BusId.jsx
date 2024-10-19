import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import { ContextData } from '../context/ContextApi';
import Loader from '../components/Loader';

export default function BusId() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [chairs, setChairs] = useState([]);
    const [condition, setCondition] = useState([]);
    const { UserData } = useContext(ContextData);
    const [conditionIndex, setConditionIndex] = useState([]);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        dateNow: ''
    });


    // Fetch product data by ID
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/product/${id}`);
            const data = response.data;
            setProduct(data);
            // Initialize chairs' condition
            setCondition(data.chairAll.map(chair => chair.chair));
            setChairs(data.chairAll.map(chair => chair.chair))
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Toggle chair condition
    const toggleChairCondition = (index) => {
        setCondition(prevCondition => {
            const updatedConditions = [...prevCondition];
            updatedConditions[index] = updatedConditions[index] === 'without' ? 'reservation' : 'without';
            return updatedConditions;
        });

        setConditionIndex(prevCondition => {
            const updatedConditions = [...prevCondition];
            updatedConditions[index] = updatedConditions[index] === 'reservation' ? 'without' : 'reservation';
            return updatedConditions;
        });
    };

    console.log({
        inTime: product?.inTime,
        outTime: product?.outTime,
        date: product?.date,
        from: product?.form,
        to: product?.to,
    });


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { phone, address, dateNow } = formData;

        try {
            // Create reservation
            const selectedChairs = conditionIndex
                .map((status, index) => {
                    if (status === 'reservation') {
                        return {
                            chairId: product.chairAll[index]._id,
                            chairNumber: index + 1,
                            status,
                            email: UserData?.user?.email,
                            price: product.price,
                            userId: UserData?.user?._id,
                        };
                    }
                    return null;
                })
                .filter(Boolean);
            if (selectedChairs.length === 0) {
                console.log('No chairs selected for reservation.');
                return;
            }
            const reservationData = {
                name: UserData?.user?.name,
                email: UserData?.user?.email,
                phone,
                address,
                dateNow,
                chair: selectedChairs,
                productId: product._id,
                userId: UserData?.user?._id,
                totalPrice: selectedChairs.length * product.price,
                lengthChairs: selectedChairs.length,
                inTime: product?.inTime,
                outTime: product?.outTime,
                date: product?.date,
                from: product?.form,
                to: product?.to,
                ProductId: id
            };

            // Make API call to create reservation
            const reservationResponse = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/reservations`, reservationData);

            // Update chair conditions after reservation
            await Promise.all(
                selectedChairs.map(chair => {
                    return axios.put(`${import.meta.env.VITE_SOME_URL}/api/product/AddChair/update/${id}/chair/${chair.chairId}`, {
                        chair: 'reservation'
                    });
                })
            );

            console.log('Reservation successful:', reservationResponse.data);
            navigate('/bus/reservation/checkout'); // Optionally navigate to a success page
        } catch (error) {
            console.error('Error submitting reservation:', error);
        }
    };




    // Set Loader
    if (!product) {
        return <Loader />;
    }

    if (UserData?.user) {
        return (
            <>
                <Navbar />
                <div className="flex bg-gray-100">
                    <div className="flex my-16 flex-col md:w-[60%] w-[95%] m-auto">
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
                            <div className="box">
                                <input
                                    value={UserData?.user?.name}
                                    className="w-full h-12 border-none focus:border-none rounded-sm focus:outline-none px-3"
                                    type="text"
                                    placeholder="Enter Your Name"
                                    readOnly
                                />
                            </div>
                            <div className="box">
                                <input
                                    value={UserData?.user?.email}
                                    className="w-full h-12 border-none focus:border-none rounded-sm focus:outline-none px-3"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    readOnly
                                />
                            </div>
                            <div className="box">
                                <input
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full h-12 border-none focus:border-none rounded-sm focus:outline-none px-3"
                                    required
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Your Phone +20"
                                />
                            </div>
                            <div className="box">
                                <input
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full h-12 border-none focus:border-none rounded-sm focus:outline-none px-3"
                                    required
                                    type="text"
                                    name="address"
                                    placeholder="Enter Your Address"
                                />
                            </div>
                            <div className="box">
                                <p className="w-full h-12 rounded-sm focus:outline-none px-3 bg-white flex items-center text-gray-600">
                                    {product.form} - {product.to}
                                </p>
                            </div>
                            <div className="box">
                                <input
                                    value={formData.dateNow}
                                    onChange={handleInputChange}
                                    className="w-full h-12 rounded-sm focus:outline-none px-3 bg-white"
                                    required
                                    type="date"
                                    name="dateNow"
                                />
                            </div>
                            <div className="box m-auto justify-center flex flex-wrap gap-6">
                                {product.chairAll.map((chair, index) => (
                                    chairs[index] === 'reservation' ? (
                                        <p
                                            key={chair._id}
                                            className="w-10 h-10 rounded-lg bg-gray-400 flex items-center justify-center text-white cursor-not-allowed"
                                        >
                                            <ChairAltIcon />
                                        </p>
                                    ) : (
                                        <button
                                            key={chair._id}
                                            type="button"
                                            onClick={() => toggleChairCondition(index)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${condition[index] === 'without' ? 'bg-red-600' : 'bg-green-600'}`}
                                        >
                                            <ChairAltIcon />
                                        </button>
                                    )
                                ))}
                            </div>

                            <div className="btn">
                                <button className="w-full h-12 rounded-xl px-3 text-white flex items-center justify-center text-2xl bg-[#6d28d9]" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className='flex items-center justify-center h-screen'>
                <p>Please log in to make a reservation. <button className='text-cyan-600 font-bold uppercase underline' onClick={() => {
                    navigate('/login')
                }}>Login.</button></p>
            </div>
        ) // Show message when user is not logged in
    }

}
