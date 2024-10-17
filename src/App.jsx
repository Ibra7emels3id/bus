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
import AddCategory from './admin/pages/AddCategory';
import Admin from './admin/Admin';
import Addproduct from './admin/pages/Addproduct';
import Category from './admin/pages/Category';
import UpdateCategory from './admin/pages/UpdateCategory';
import Products from './admin/pages/Products';
import ProductUpdate from './admin/pages/ProductUpdate';
import CategoryDetails from './admin/pages/CategoryDetails';
import Productss from './Pages/productss';
import BusId from './Pages/BusId';
import ProductDetails from './admin/pages/ProductDetails';
import DetailsBusId from './Pages/DetailsBusId';
import About from './Pages/About';
import CheackOut from './Pages/CheackOut';



function App() {
    const [UserData, setUserData] = useState({})
    const Token = localStorage.getItem('token')

    // Fetch Data Api
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SOME_URL}/api/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': Token ? `Bearer ${Token}` : '',
                    },
                    credentials: 'include',
                })
                const data = await response.json();
                if (JSON.stringify(data) !== JSON.stringify(UserData)) {
                    setUserData(data);
                }
                // Navigate based on role after data is updated
                if (data.role === 'admin') {
                    Navigate('/admin');
                } else if (data.role === 'user') {
                    Navigate('/');
                }

            } catch (error) {
                Navigate('/login')
                console.error('Error fetching user data:', error);
            }
        };
        if (Token) {
            fetchUserData();
        }
    }, [Token, UserData, Navigate]);

    console.log('test');

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
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={UserData.token ? <Navigate to='/' /> : <Register />} />
                        <Route path="/portfolio" element={<Portfolio />} />

                        <Route path="/bus" element={<Productss />} />
                        <Route path="/bus/View/Details/:id" element={<DetailsBusId />} />
                        <Route path="/bus/:id/reservation" element={<BusId />} />
                        <Route path="/bus/reservation/checkout" element={<CheackOut />} />
                        <Route path="about" element={<About />} />




                        {/* Admin Pages */}
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/addproduct" element={<Addproduct />} />
                        <Route path="/admin/addcategory" element={<AddCategory />} />
                        <Route path="/admin/category" element={<Category />} />
                        <Route path="/admin/category/update/:id" element={<UpdateCategory />} />
                        <Route path="/admin/products" element={<Products />} />
                        <Route path="/admin/product/update/:id" element={<ProductUpdate />} />
                        <Route path="/admin/product/details/:id" element={<ProductDetails />} />
                        <Route path="/admin/category/details/:id" element={<CategoryDetails />} />

                    </Routes>
                </Router>
            </ContextData.Provider>
        </>
    )
}

export default App
