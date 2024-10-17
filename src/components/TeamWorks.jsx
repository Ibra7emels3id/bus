import React, { useEffect } from 'react';
import KeenSlider from 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm';

export default function TeamWorks() {
    new KeenSlider(
        '#keen-slider-1',
        {
            loop: true,
            slides: {
                origin: 'center',
                perView: 1,
                spacing: 16,
            },
            breakpoints: {
                '(min-width: 750px)': {
                    slides: {
                        origin: 'auto',
                        perView: 2,
                        spacing: 10,
                    },
                },
                '(min-width: 1024px)': {
                    slides: {
                        origin: 'auto',
                        perView: 3,
                        spacing: 30,
                    },
                },
            },
        },
        []
    )

    return (
        <section className="bg-gray-50 w-full py-28">
            <div className="mx-auto max-w-[100%] px-8">
                <div className="w-full items-end justify-between sm:flex sm:pe-6 lg:pe-8">
                    <h2 className="w-[98%] md:w-[40%]  text-center m-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Read about our working team
                    </h2>
                </div>
                <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
                    <div id="keen-slider-1" className="keen-slider">
                        <div className="keen-slider__slide bg-white">
                            <blockquote className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
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
                            </blockquote>
                        </div>
                        <div className="keen-slider__slide bg-white">
                            <blockquote className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
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
                            </blockquote>
                        </div>
                        <div className="keen-slider__slide bg-white">
                            <blockquote className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
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
                            </blockquote>
                        </div>
                        <div className="keen-slider__slide bg-white">
                            <blockquote className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
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
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
