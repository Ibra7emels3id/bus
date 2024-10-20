import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Herosessone from '../components/Herosessone'
import FormAvilabuil from '../components/FormAvilabuil'
import Category from '../components/Category'
import Offers from '../components/Offers'
import Footer from '../components/Footer'
import TeamWorks from '../components/TeamWorks'
import Reviews from '../components/Reviews'
import Loader from '../components/Loader'

function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    // Get all products
    async function getProducts() {
        setLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_SOME_URL}/api/products`)
            const data = await response.json()
            setProducts(data)
            
        } catch (error) {
            console.error(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }



    // Call getProducts when the component mounts
    React.useEffect(() => {
        getProducts()
    }, [])

    // Render loading message while fetching data
    if (loading) {
        return <Loader />
    }

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