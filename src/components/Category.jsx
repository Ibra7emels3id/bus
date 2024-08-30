import React from 'react';
import bus from '../assets/bus.png'
import bus1 from '../assets/bus5.png'
import bus2 from '../assets/bus4.png'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Category = () => {
    const Data = [
        {
            image: bus
        },
        {
            image: bus1
        },
        {
            image: bus2
        },
        
    ]
    return (
         <>
            <div className="category p-6 w-[85%] mt-24 mb-24 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl text-[#4f4f4f] font-bold text-start px-5 ">Categories</h1>
                    <button className="text-sm text-[#6d28d9] font-bold text-end pr-12 ">View <ArrowForwardIcon /></button>
                </div>
                <div className="grid grid-cols-3 p-3 mt-8 gap-10">
                    {Data.slice(0, 3).map((it) => {
                        return (
                            <>
                                <div className="box h-72 flex items-center justify-center rounded-2xl bg-[#f5f5f5]">
                                    <img className='w-92' src={it.image} alt="" />
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Category;
