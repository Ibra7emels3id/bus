import React, { useEffect } from 'react';
import bus from '../assets/bus.png'
import bus1 from '../assets/bus5.png'
import bus2 from '../assets/bus4.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'

const Category = () => {
    const [category, setCategory] = React.useState([])
    const Navigate = useNavigate()

    // Fetch categories from the API endpoint
    const FetchCategory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/categorys`)
            setCategory(res.data)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }


    useEffect(() => {
        FetchCategory()
    }, [])


    if (!category) {
        return <Loader/>; // Show loading while fetching product data
    }



    return (
        <>
            <div className="category p-6 w-full m-auto md:w-[85%] mt-24 mb-24 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl text-[#4f4f4f] font-bold text-start px-5 ">Categories</h1>
                    <button onClick={() => {
                        Navigate('/bus')
                    }} className="text-sm text-[#6d28d9] font-bold text-end pr-12 ">View All Bus <ArrowForwardIcon /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-3 mt-8 gap-10">
                    {category?.slice(0, 3).map((it) => {
                        return (
                            <div key={it._id} className="box h-72 flex items-center justify-center rounded-2xl bg-[#f5f5f5]">
                                <img className='w-[300px]' src={`${import.meta.env.VITE_SOME_URL}/${it.image}`} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Category;
