import React, { useContext, useState } from 'react'
import { ContextData } from '../context/ContextApi'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


export default function FormAvilabuil() {
    const { UserData } = useContext(ContextData)
    const [DataSearch, setDataSearch] = useState([]);
    const [Data, setData] = useState({
        form: '',
        to: '',
        date: '',
        inTime: '',
        outTime: '',
        total: ''
    });

    const navigate = useNavigate();

    const handleNaveiaget = () => {
        navigate('/login');
    };

    // Handle input changes
    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    // Send data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit', Data);

        try {
            const res = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/listBus`, Data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(res);

            if (res.status === 200) {
                setDataSearch(res.data);
            } else if (res.status === 404) {
                alert('Failed to submit data');
                setDataSearch([]);
            }

        } catch (error) {
            console.error(error.response.data.message);
            setDataSearch([]);
        }
    };

    return (
        <>
            <div className="flex flex-col mt-20">
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-[#f5f5f5] my-10 p-10 w-[95%] md:w-[80%] m-auto' action="" method="post">
                    <div className="form w-full">
                        <label htmlFor="form">Form</label>
                        <select className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' name="form" id="form" onChange={handleChange}>
                            <option hidden>Select Form</option>
                            <option value="alexandria">Alexandria</option>
                            <option value="cairo">Cairo</option>
                            <option value="giza">Giza</option>
                            <option value="elmansora">elmansora</option>
                            <option value="minya">Minya</option>
                        </select>
                    </div>
                    <div className="to w-full">
                        <label htmlFor="to">To</label>
                        <select className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' name="to" id="to" onChange={handleChange}>
                            <option hidden>Select To</option>
                            <option value="alexandria">Alexandria</option>
                            <option value="cairo">Cairo</option>
                            <option value="giza">Giza</option>
                            <option value="elmansora">elmansora</option>
                            <option value="minya">Minya</option>
                        </select>
                    </div>
                    <div className="date">
                        <label htmlFor="date">Date (DD/MM/YYYY):</label>
                        <input placeholder='DD/MM/YYYY' className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' type="text" id="date" name="date" onChange={handleChange} />
                    </div>
                    <div className="time">
                        <label htmlFor="time">InTime</label>
                        <input className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' type="time" id="time" name="inTime" onChange={handleChange} />
                    </div>
                    <div className="time">
                        <label htmlFor="time">OutTime</label>
                        <input className='w-full h-12 rounded-lg outline-none cursor-pointer px-2 bg-[#ebebeb]' type="time" id="time" name="outTime" onChange={handleChange} />
                    </div>
                    <div className="submit w-full">
                        {
                            UserData.token ?
                                <input className='bg-[#6d28d9] cursor-pointer mt-6 rounded-lg h-12 text-white w-full' type="submit" value="Submit" /> :
                                <button onClick={handleNaveiaget} className='w-full h-12 bg-[#2196F3] mt-6 text-white rounded-lg hover:bg-[#1e88e5]' type="button">Login Please</button>
                        }
                    </div>
                </form>
                {DataSearch.length > 0 && <div className="flex bg-[#f5f5f5] w-[80%] m-auto -mt-8">
                    <div className="boxs w-full py-5">
                        <h1 className="text-[#6d28d9] text-center font-bold mt-8 ml-4 my-5">List of Bus Avilability</h1>
                        {/* Display the list of buses here */}
                        {DataSearch.map((it) => {
                            return (
                                <div key={it._id} className="box rounded bg-white m-auto w-[97%] flex items-center justify-between">
                                    <div className="flex">
                                        <img width={100} src={`${import.meta.env.VITE_SOME_URL}/${it.image}`} alt="" />
                                    </div>
                                    <h2 className="text-black text-center font-bold">{it.form} - {it.to}</h2>
                                    <p>Date: {it.date}</p>
                                    <p>In Time: {it.inTime}</p>
                                    <p>Out Time: {it.outTime}</p>
                                    <p>Price: {it.price}</p>
                                    <Link to={`/bus/View/Details/${it._id}`} className='w-12'><RemoveRedEyeIcon /></Link>
                                </div>
                            )
                        })}
                    </div>
                </div>}
            </div>
        </>
    )
}
