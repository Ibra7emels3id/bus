import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ContextData } from '../context/ContextApi';
import Loader from '../components/Loader';

export default function DetailsBusId() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [condition, setCondition] = useState([]);
    const navigate = useNavigate()
    const { UserData } = useContext(ContextData);
    const [loading, setLoading] = useState(true);

    // Fetch the products
    const fetchProducts = async () => {
        setLoading(true); 
        try {
            const response = await fetch(`${import.meta.env.VITE_SOME_URL}/api/product/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            alert('Error fetching product data. Please try again later.');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [id]);


    if (loading) {
        return <Loader/>;
    }


    if (UserData?.user) {
        return (
            <>
                <Navbar />
                <div className=" bg-gray-100 py-8 ">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex h-full flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="w-full lg:w-1/2">
                                <img
                                    src={`${import.meta.env.VITE_SOME_URL}/${product?.image}`}
                                    alt={product?.title}
                                    className="object-cover h-full w-full"
                                />
                            </div>
    
                            <div className="w-full lg:w-1/2 p-6 h-full flex flex-col gap-2 pl-12 justify-center">
                                <h1 className="text-3xl font-semibold mb-4 text-gray-800">Title: {product?.title}</h1>
                                <p className="text-xl font-bold text-green-600 mb-4">Price: ${product?.price}</p>
                                <p className="text-gray-700 mb-6">Description: {product?.description}</p>
                                <p className="text-1xl font-semibold mb-4 text-gray-800">From: {product?.form} - {product?.to}</p>
                                <p className="text-1xl font-semibold mb-4 text-gray-800">Date: {product?.date}</p>
                                <p className="text-1xl font-semibold mb-4 text-gray-800">Time: {product?.inTime} - {product?.outTime}</p>
                                <p className="text-1xl font-semibold mb-4 text-gray-800">Quantity: {product?.chairAll?.length}</p>
    
                                <div className="flex gap-4">
                                    <button onClick={() => {
                                        navigate(`/bus/${product._id}/reservation`)
                                    }} className="bg-blue-600 w-1/2 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
                                        Book a ticket
                                    </button>
                                    <button onClick={() => {
                                        navigate('/')
                                    }} className="bg-gray-600 w-1/2 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded">
                                        Go Back TO Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        <Navigate to='/' />;
    }

    
}