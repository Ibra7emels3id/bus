import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../_Components/Header';
import MainNavbar from '../_Components/MainNavbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




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


function Addproduct() {
    const Navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        title: '',
        category: '',
        image: '',
        description: '',
        price: '',
        quantity: '',
    })

    // Handle product Submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        // add product to db
        console.log(product);
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('category', product.category);
        formData.append('image', product.image);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);

        axios.post('http://localhost:3000/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(() => {
            toast.success('Product added successfully')
            Navigate('/admin/products')
            setProduct({
                title: '',
                category: '',
                image: '',
                description: '',
                price: '',
                quantity: '',
            })
        }).catch(function (err) {
            console.log('Error:', err);
            toast.error('Error adding product')
        })
    }

    const FetchCategory = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/categorys')
            setCategories(res.data)
        } catch (error) {
            console.log(error)
        }
    }



    // UseEffects API 
    useEffect(() => {
        FetchCategory()
    }, [])

    return (
        <>
            <Header />
            <div className="flex">
                <MainNavbar />
                <div className="flex w-full items-center justify-center p-5">
                    <div className="mx-auto  shadow-md p-7 w-full">
                        <form>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Title
                                </label>
                                <input
                                    onChange={(e) => {
                                        setProduct({ ...product, title: e.target.value })
                                    }}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your title"
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
                                    console.log(e.target.value);
                                    // fetch category data
                                    setProduct({ ...product, category: e.target.value })
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
                                        setProduct({ ...product, price: e.target.value })
                                    }}
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
                                        setProduct({ ...product, quantity: e.target.value })
                                    }}
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
                                        setProduct({ ...product, description: e.target.value })
                                    }}
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
                                            setProduct({ ...product, image: e.target.files[0] });
                                            setImage(file)
                                        }}
                                        multiple
                                    />
                                </Button>
                            </div>
                            <div>
                                <button onClick={handleSubmit} type='submit' className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addproduct