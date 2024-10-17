import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../_Components/Header';
import MainNavbar from '../_Components/MainNavbar';
import { Button, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const ProductUpdate = () => {
    const { id } = useParams()
    const Navigate = useNavigate()
    const [image, setImage] = React.useState(null);
    const [categories, setCategories] = React.useState([]);
    const [ProductUpdate, setProductUpdate] = React.useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null,
        quantity: 0,
    })


    // Fetch the products
    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        const data = await response.json();
        setProductUpdate(data);
        setImage(`http://localhost:3000/${data.image}`);
    }


    // Get Category 
    const FetchCategory = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/categorys')
            setCategories(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Handle Update Product Data 
    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', ProductUpdate.title);
        formData.append('description', ProductUpdate.description);
        formData.append('price', ProductUpdate.price);
        formData.append('quantity', ProductUpdate.quantity);
        formData.append('category', ProductUpdate.category);
        if (ProductUpdate.image) {
            formData.append('image', ProductUpdate.image);
        }

        try {
            axios.put(`http://localhost:3000/api/product/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Product updated successfully')
            Navigate('/admin/products')
            setProductUpdate({
                title: '',
                description: '',
                price: '',
                category: '',
                image: null,
                quantity: 0,
            })
        } catch (error) {
            console.log(error)
            toast.error('Error updating product')
        }


    }


    // UseEffects
    useEffect(() => {
        FetchCategory()
        fetchProducts()
    }, [])



    return (
        <>
            <Header />
            <div className="flex">
                <MainNavbar />
                <div className="form flex w-full  p-10  ">
                    <form className='w-full shadow-xl rounded-lg  p-4'>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Title
                            </label>
                            <input
                                onChange={(e) => {
                                    setProductUpdate({ ...ProductUpdate, title: e.target.value })
                                }}
                                value={ProductUpdate.title}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your title"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                                <label>Date (DD/MM/YYYY):</label>
                                <input
                                    onChange={(e) => {
                                        setProductUpdate({ ...ProductUpdate, date: e.target.value })
                                    }}
                                    required
                                    type="text"
                                    name="date"
                                    value={ProductUpdate.date}
                                    id="date"
                                    placeholder="Date (DD/MM/YYYY)"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Select Category
                            </label>
                            <select onChange={(e) => {
                                // fetch category data
                                setProductUpdate({ ...ProductUpdate, category: e.target.value })
                            }} className='w-full h-12 outline-none cursor-pointer border rounded border-1' name="" id="">
                                <option hidden>Select Category</option>
                                {categories.map((it) => {
                                    return <option key={it._id} value={it.title}>{it.title}</option>
                                })}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="number"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Price
                            </label>
                            <input
                                onChange={(e) => {
                                    setProductUpdate({ ...ProductUpdate, price: e.target.value })
                                }}
                                value={ProductUpdate.price}
                                type="number"
                                name="number"
                                id="number"
                                placeholder="Enter your number"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="number"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                quantity
                            </label>
                            <input
                                onChange={(e) => {
                                    setProductUpdate({ ...ProductUpdate, quantity: e.target.value })
                                }}
                                value={ProductUpdate.quantity}
                                min={1}
                                type="number"
                                name="number"
                                id="number"
                                placeholder="Enter your number"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="message"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Description
                            </label>
                            <textarea
                                onChange={(e) => {
                                    setProductUpdate({ ...ProductUpdate, description: e.target.value })
                                }}
                                value={ProductUpdate.description}
                                rows={4}
                                name="message"
                                id="message"
                                placeholder="Type your message"
                                className="w-full h-24 resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={""}
                            />
                        </div>
                        <div className="image mb-5 flex items-center justify-center">
                            <img className='w-[200px] rounded-xl' src={image} alt="" />
                        </div>

                        <div className="mb-5">
                            <Button
                                className='w-full h-12'
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(e) => {
                                        const file = URL.createObjectURL(e.target.files[0])
                                        setProductUpdate({ ...ProductUpdate, image: e.target.files[0] });
                                        setImage(file)
                                    }}
                                    multiple
                                />
                            </Button>
                        </div>
                        <div>
                            <button onClick={handleUpdateProduct} type='submit' className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductUpdate;
