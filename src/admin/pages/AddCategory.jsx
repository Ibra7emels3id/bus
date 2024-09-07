import React, { useEffect, useState } from 'react';
import MainNavbar from '../_Components/MainNavbar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../_Components/Header';

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
const AddCategory = () => {
    const Navigate = useNavigate()
    const [image, setImage] = useState()
    const [categoryData, setCategoryData] = useState({
        title: '',
        image: null,
    })

    // console.log(FormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', categoryData.title);
        formData.append('category', categoryData.category);
        if (categoryData.image) {
            formData.append('image', categoryData.image);
        }

        console.log(formData);

        try {
            const response = await fetch('http://localhost:3000/api/categories', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error Add Category')
            }

            const data = await response.json();
            console.log(data);
            toast.success('Added category successfully')
            setCategoryData({ title: '', image: null })
            setImage(null)
            Navigate('/admin/category')
        } catch (error) {
            console.error('Error Add Category:', error.message);
            toast.error('Category is Not added')

        }
    }


    return (
        <>
            <Header />
            <div className="flex">
                <MainNavbar />
                <div className="form flex w-full h-screen p-5 ">
                    <form className="bg-white w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="title"
                            >
                                Add Title
                            </label>
                            <input
                                className="shadow h-12 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="title"
                                required={true}
                                onChange={(e) => {
                                    setCategoryData({ ...categoryData, title: e.target.value })
                                }}
                                value={categoryData.title}
                            />
                        </div>
                        {image && <div className="image mt-5 h-44 flex items-center justify-center ">
                            <img src={image} className='w-40 rounded-full' alt="" />
                        </div>}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="image"
                            >
                                Add Image
                            </label>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                className='w-full h-12'
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setCategoryData({ ...categoryData, image: e.target.files[0] })
                                        setImage(URL.createObjectURL(file))
                                    }}
                                    multiple
                                />
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleSubmit}
                                className="bg-[#6d28d9] w-full hover:bg-[#43148f] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddCategory;
