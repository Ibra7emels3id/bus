import React from 'react'
import Navbar from '../components/Navbar'
import Herosessone from '../components/Herosessone'
import FormAvilabuil from '../components/FormAvilabuil'
import Category from '../components/Category'
import Offers from '../components/Offers'
import Footer from '../components/Footer'
import TeamWorks from '../components/TeamWorks'
import Reviews from '../components/Reviews'

function Home() {
    return (
        <>
            <div className="w-full">
                <Navbar />
                <Herosessone />
                <FormAvilabuil />
                <Category />
                <Offers />
                <TeamWorks />
                <Reviews />
                <Footer />
            </div>
        </>
    )
}

export default Home