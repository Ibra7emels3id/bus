import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainNavbar from '../_Components/MainNavbar';
import Header from '../_Components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import ChairAltIcon from '@mui/icons-material/ChairAlt';


const ProductDetails = () => {
    const { id } = useParams()
    const Navigate = useNavigate()
    const [product, setProduct] = React.useState([]);


    console.log(product);


    // Fetch the products
    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
    }

    // Delete the item Product
    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await axios.delete(`http://localhost:3000/api/product/delete/${id}`)
                    .then(() => {
                        toast.warn('successfully Delete product')
                        return Navigate(`/admin/products`);
                    }).catch(err => {
                        console.error('Error deleting product:', err);
                    })
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
        // Navigate(`/admin/products`);
    };

    // useEffects
    useEffect(() => {
        fetchProducts();
    }, []);



    return (
        <>
            <Header />
            <div className="flex">
                <MainNavbar />
                <div className=" w-calc-100-80 md:w-calc-100-280">
                    <div className='p-5 w-full'>
                        <h1 className='py-4 text-3xl text-[#6d28d9] font-medium'>Products Details</h1>
                        <div className="item">
                            <div className="flex">
                                <div className="image w-1/2 flex items-center justify-center">
                                    <img className='rounded-xl my-5 w-[350px]' src={`${import.meta.env.VITE_SOME_URL}/${product?.image}`} alt={product?.name} />
                                </div>
                                <div className="text w-1/2 flex flex-col gap-10">
                                    <p className="text-3xl font-bold mb-2">{product?.category}</p>
                                    <p className="text-gray-600 mb-4 text-start">{product?.date}</p>
                                    <p className="text-gray-600 mb-4 text-start">{product?.form} - {product?.to}</p>
                                    <p className="text-gray-600 mb-4 text-start">{product?.inTime} - {product?.outTime}</p>

                                </div>
                            </div>
                            <div className="chairs w-full flex gap-7 flex-wrap my-10">
                                {product?.chairAll?.map((it) => {
                                    return (
                                        <button key={it._id} type='button' className={`w-14 h-14 rounded-lg ${it.chair === 'reservation' ? 'bg-green-950' : 'bg-red-700' } bg-red-500 flex items-center justify-center text-white`}><ChairAltIcon /></button>
                                    )
                                })}
                            </div>
                            <h2 className="text-2xl font-medium mb-2">{product?.name}</h2>
                            <p className="text-gray-600 mb-4 text-center">{product?.description}</p>
                            <div className="flex justify-around my-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">Price: </span>
                                    <span className="text-xl font-medium">{product?.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">Quantity: </span>
                                    <span>{product?.quantity}</span>
                                </div>
                            </div>
                            <div className="btn flex justify-around">
                                <button onClick={() => {
                                    Navigate(`/admin/product/update/${id}`)
                                }} className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Product</button>
                                <button onClick={() => {
                                    deleteProduct(product?._id)
                                }} className="bg-red-950 text-white px-4 py-2 rounded-md">Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
