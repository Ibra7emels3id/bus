import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const UpdateCategory = () => {
    const { id } = useParams()
    const Navigate = useNavigate()
    const [categoryData, setCategoryData] = useState({
        title: '',
        image: ''
    });
    const [image, setImage] = useState(null);

    console.log(categoryData);
    // get category data
    const getCategory = async () => {
        const response = await fetch(`http://localhost:3000/api/category/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategoryData(data);
        setImage(`http://localhost:3000/${data.image}`);
    }



    // Handle Submit Update
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', categoryData.title);

        if (categoryData.image) {
            formData.append('image', categoryData.image);
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/category/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Category updated successfully')
            setCategoryData({ title: '', image: null });
            setImage(null);
            Navigate('/admin/category')
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Error updating category')
        }

    }

    // UseEffects
    React.useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
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
                                onClick={handleUpdateCategory}
                                className="bg-[#6d28d9] w-full hover:bg-[#43148f] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Update Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateCategory;
