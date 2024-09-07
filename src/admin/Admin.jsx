import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from './_Components/Header'
import MainNavbar from './_Components/MainNavbar'

function Admin() {
    return (
        <>
            <Header/>
            <div className="flex">
                <MainNavbar />
                
            </div>
        </>
    )
}

export default Admin