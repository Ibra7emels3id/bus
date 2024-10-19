import React from 'react';
import HearoBus from '../assets/bus3.png'

const Herosessone = () => {
    return (
        <>
            <div  className="Herosessone overflow-hidden w-full h-[calc(100vh-0px)] bg-cover bg">
                <div className="flex h-[100%]  w-[90%] m-auto items-center justify-around">
                    <div className="w-full  lg:w-1/2 items-center justify-center text-center lg:items-start lg:text-start flex flex-col gap-5">
                        <h1 className="md:text-8xl text-[55px] font-bold  text-white">Reserve Your <br/>
                            Bus <span className='text-[#6d28d9]'>Tickets</span><br/>
                            Now
                        </h1>
                        <p className="text-xl  text-stone-400">Find and book your bus tickets with clicks. We offers a wide range of bus routes and schedules to suit your needs</p>
                        <button className='bg-[#6d28d9] text-white py-4 w-[180px]'>Reserve Seat Now</button>
                    </div>
                    <div className=" hidden lg:flex items-end h-full -mr-96 justify-center   ">
                        <img src={HearoBus} alt="Background Hero" className="object-cover mb-10 w-[90%] h-" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Herosessone;
