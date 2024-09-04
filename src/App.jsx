import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Portfolio from './Pages/Portfolio';
import { ContextData } from './context/ContextApi';
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
    const [UserData, setUserData] = useState({})

    const Token = localStorage.getItem('token')

    // Fetch Data Api
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': Token ? `Bearer ${Token}` : '',
                    },
                    credentials: 'include',
                })
                const data = await response.json();
                console.log(data);
                setUserData(data);
                Navigate('/portfolio')
            } catch (error) {
                Navigate('/login')
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [Token]);

    // Handle Remove Item Token
    setTimeout(() => {
        localStorage.removeItem('token');
    }, 60 * 60 * 1000)

    return (
        <>
            <ToastContainer />
            <ContextData.Provider value={{ UserData, setUserData }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={UserData.token ? <Navigate to='/' /> : <Login />} />
                        <Route path="/register" element={UserData.token ? <Navigate to='/' /> : <Register />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Routes>
                </Router>
            </ContextData.Provider>
        </>
    )
}

export default App
