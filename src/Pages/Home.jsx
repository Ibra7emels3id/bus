import React from 'react'
import Navbar from '../components/Navbar'
import Herosessone from '../components/Herosessone'
import FormAvilabuil from '../components/FormAvilabuil'
import Category from '../components/Category'
import Offers from '../components/Offers'
import Footer from '../components/Footer'

function Home() {
    return (
        <>
            <Navbar />
            <Herosessone />
            <FormAvilabuil />
            <Category />
            <Offers />
            <Footer/>
        </>
    )
}

export default Home