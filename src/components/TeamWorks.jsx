import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';

// Import Swiper styles and modules if needed
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';

export default function TeamWorks() {
    return (
        <section className="wow animate__animated animate__fadeInUp bg-gray-50 w-full py-28">
            <div className="mx-auto max-w-[100%] px-8">
                <div className="w-full items-end justify-between sm:flex sm:pe-6 lg:pe-8">
                    <h2 className="w-[98%] md:w-[40%] text-center m-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Read about our working team
                    </h2>
                </div>
                <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={16}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            750: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        pagination={{ clickable: true }}
                    // navigation={true}
                    >
                        <SwiperSlide>
                            <div className="bg-white p-6 shadow-sm sm:p-8 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                        className="size-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="mt-0.5 text-2xl font-bold text-gray-900">Paul Starr</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 ">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                                    consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                                    error officiis atque voluptates magnam!
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="bg-white p-6 shadow-sm sm:p-8 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                        className="size-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="mt-0.5 text-2xl font-bold text-gray-900">Paul Starr</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 ">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                                    consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                                    error officiis atque voluptates magnam!
                                </p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="bg-white p-6 shadow-sm sm:p-8 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                        className="size-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="mt-0.5 text-2xl font-bold text-gray-900">Paul Starr</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 ">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                                    consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                                    error officiis atque voluptates magnam!
                                </p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="bg-white p-6 shadow-sm sm:p-8 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                        className="size-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="mt-0.5 text-2xl font-bold text-gray-900">Paul Starr</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 ">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                                    consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                                    error officiis atque voluptates magnam!
                                </p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                        <div className="bg-white p-6 shadow-sm sm:p-8 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                        className="size-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="mt-0.5 text-2xl font-bold text-gray-900">Paul Starr</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 ">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a
                                    consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus
                                    error officiis atque voluptates magnam!
                                </p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
