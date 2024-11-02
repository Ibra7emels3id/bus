import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Buss() {
    const [products, setProducts] = useState([])


    // Get all products
    async function getProducts() {
        try {
            const response = await fetch(`${import.meta.env.VITE_SOME_URL}/api/products`)
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            console.error(error)
        }
    }



    // Call getProducts when the component mounts
    React.useEffect(() => {
        getProducts()
    }, [])





    return (
        <>
            <Navbar />
            <section>
                <div className="mx-auto max-w-screen-3xl px-4 py-24 sm:px-12 ">
                    <header>
                        <h2 className="text-xl font-bold text-violet-600 sm:text-3xl">Collection Bus </h2>

                        <p className="mt-4 max-w-md text-gray-400">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
                            dicta incidunt est ipsam, officia dolor fugit natus?
                        </p>
                    </header>

                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {products?.map((it) => {
                            return (
                                <li key={it._id} className='bg-slate-900 border'>
                                    <Link to="/" className="group block overflow-hidden">
                                        <div className="img h-[350px]">
                                        <img
                                            src={`${import.meta.env.VITE_SOME_URL}/${it.image}`}
                                            alt={it.title}
                                            className="transition duration-500 group-hover:scale-105"
                                        />
                                        </div>
                                        <div className="relative bg-white pt-3 pb-2 px-3">
                                            <h3 className="text-xl text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                {it.title}
                                            </h3>
                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>
                                                <span className="tracking-wider text-gray-900"> £{it.price} GBP </span>
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                        )}

                    </ul>
                </div>
            </section>
            <Footer />
        </>
    )
}
