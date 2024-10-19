import { useContext, useEffect, useState } from "react";
import 'swiper/swiper-bundle.css';
import { Rating } from "@mui/material";
import ShowDialog from "./ShowDialog";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import { ContextData } from "../context/ContextApi";
import { useNavigate } from "react-router-dom";

export default function SliderComponent() {
    const [open, setOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const { UserData } = useContext(ContextData);
    const Navigate = useNavigate();


    const GetData = async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/review`);
            setReviews(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        GetData();
    };

    useEffect(() => {
        GetData();
    }, []);

    return (
        <section className="bg-gray-50">
            <div className="mx-auto relative  max-w-[1440px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
                <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
                    <h2 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Read trusted reviews from our customers
                    </h2>
                </div>
                <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={2.5}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 1.5,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1240: {
                                slidesPerView: 2.5,
                            },
                        }}
                    >
                        {reviews?.map((it) => (
                            <SwiperSlide key={it.id} className="">
                                <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-0.5 text-green-500">
                                            <div className="image mr-4">
                                                {/* {UserData?.user?.image ? <img className="object-cover w-20 h-20 rounded-full" src={`${import.meta.env.VITE_SOME_URL}/${UserData?.user.image}`} alt="Image 1" /> : <img className="object-cover w-20 h-20 rounded-full" src={'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg'} alt="Image 1" />} */}
                                                <img loading="lazy" className="object-cover w-20 h-20 rounded-full" src={'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg'} alt="Image 1" />
                                            </div>
                                            <div className="title">
                                                <p className="text-2xl font-bold text-violet-900 sm:text-3xl">{it.name}</p>
                                                <Rating name="size-medium" value={it.star} readOnly />
                                            </div>
                                        </div>
                                        <div className="mt-2 h-42">
                                            <p className="mt-4 leading-relaxed text-gray-700">{it.description.slice(0, 280)}...</p>
                                        </div>
                                    </div>
                                    <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">&mdash; Michael Scott</footer>
                                </blockquote>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mt-8 gap-4 lg:mt-0 z-50 absolute right-48 top-32 hidden lg:flex">
                    <div className="swiper-button-prev border border-violet-700 text-violet-700 hover:bg-violet-600 hover:text-white w-16 h-16 text text-12 rounded-full"></div>
                    <div className="swiper-button-next absolute left-24 border border-violet-700 text-violet-700 hover:bg-violet-600 hover:text-white w-16 h-16 text text-12 rounded-full"></div>
                </div>
            </div>
            <div className="btn pb-16 ">
                {UserData?.user ? (
                    <button className="bg-violet-600 hover:bg-violet-900 w-60 m-auto text-white font-bold rounded-xl h-12 flex items-center justify-center" onClick={handleClickOpen}>
                        Add a Review
                    </button>
                ) : (
                    <button className="bg-violet-600 hover:bg-violet-900 w-60 m-auto text-white font-bold rounded-xl h-12 flex items-center justify-center" onClick={() => Navigate('/login')}>
                        Login Please
                    </button>
                )}
            </div>
            <ShowDialog open={open} handleClose={handleClose} />
        </section>
    );
}
