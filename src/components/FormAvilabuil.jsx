import React, { useContext } from 'react'
import { ContextData } from '../context/ContextApi'
import { useNavigate } from 'react-router-dom'

export default function FormAvilabuil() {
    const { UserData } = useContext(ContextData)
    const navigate = useNavigate()
    const handleNaveiaget = () => {
        navigate('/login')
    }
    return (
        <>
            <div className="flex flex-col mt-20 ">
                <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-[#f5f5f5] my-10 p-10 w-[95%]  md:w-[80%] m-auto' action="" method="post">
                    <div className="form w-full">
                        <label htmlFor="form">Form</label>
                        <select className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' name="form" id="form">
                            <option hidden value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="to w-full">
                        <label htmlFor="to">To</label>
                        <select className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' name="to" id="to">
                            <option hidden value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="date">
                        <label htmlFor="date">Date</label>
                        <input className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' type="date" id="date" name="date" />
                    </div>
                    <div className="time">
                        <label htmlFor="time">Time</label>
                        <input className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' type="time" id="time" name="time" />
                    </div>
                    <div className="total w-full">
                        <label htmlFor="total">Total Seat</label>
                        <input className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' type="text" id="total" name="total" />
                    </div>
                    <div className="submit w-full">
                        {
                            UserData.token ? <input className='bg-[#6d28d9] mt-6 rounded-lg h-12 text-white w-full' type="submit" value="Submit" /> :
                                <button onClick={handleNaveiaget} className='w-full h-12 bg-[#2196F3] mt-6 text-white rounded-lg hover:bg-[#1e88e5]' type="submit">Login Please</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}
