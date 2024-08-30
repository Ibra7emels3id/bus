import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import offer from '../assets/save.png'
export default function Offers() {

    return (
        <>
            <div className="category p-6 w-[85%] mt-24 mb-24 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl text-[#4f4f4f] font-bold text-start px-5 ">Special Offers</h1>
                </div>
                <div className="grid grid-cols-2 p-3 mt-8 gap-10">
                    <div className="box bg-[#f5f5f5] p-5 flex items-center ">
                        <div className="image">
                            <img className='w-60' src={offer} alt="" />
                        </div>
                        <div className="text flex flex-col gap-5">
                            <h3 className='font-medium text-2xl'>Get Up To 30% off On Bus Booking</h3>
                            <div className="flex items-center justify-start">
                                <p className='bg-[#612bb837] p-2 mr-2 rounded-lg text-[#6d28d9]'>HSDOE23</p>
                                <ContentCopyIcon className=' cursor-pointer' sx={{ color: '#6d28d9' }} />
                            </div>
                            <p className='text-sm text-zinc-400'>Valid Till: 45st March</p>
                        </div>
                    </div>
                    <div className="box bg-[#f5f5f5] p-5 flex items-center ">
                        <div className="image">
                            <img className='w-60' src={offer} alt="" />
                        </div>
                        <div className="text flex flex-col gap-5">
                            <h3 className='font-medium text-2xl'>Get Up To 30% off On Bus Booking</h3>
                            <div className="flex items-center justify-start">
                                <p className='bg-[#612bb837] p-2 mr-2 rounded-lg text-[#6d28d9]'>HSDOE23</p>
                                <ContentCopyIcon sx={{ color: '#6d28d9' , cursor:'pointer' }} />
                            </div>
                            <p className='text-sm text-zinc-400'>Valid Till: 45st March</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
