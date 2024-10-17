import React, { useEffect } from 'react';
import KeenSlider from 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm';

export default function TeamWorks() {
    useEffect(() => {
        const keenSlider = new KeenSlider('#keen-slider', {
            loop: true,
            slides: {
                origin: 'center',
                perView: 1.25,
                spacing: 16,
            },
            breakpoints: {
                '(min-width: 1024px)': {
                    slides: {
                        origin: 'auto',
                        perView: 2.5,
                        spacing: 32,
                    },
                },
            },
        });

        const keenSliderPrevious = document.getElementById('keen-slider-previous');
        const keenSliderNext = document.getElementById('keen-slider-next');

        keenSliderPrevious.addEventListener('click', () => keenSlider.prev());
        keenSliderNext.addEventListener('click', () => keenSlider.next());

        return () => {
            keenSlider.destroy();
        };
    }, []);

    return (
        <section className="bg-gray-50 w-full py-10">
            <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
                <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
                    <h2 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Read about our working team
                    </h2>
                    <div className="mt-8 flex gap-4 lg:mt-0">
                        <button
                            aria-label="Previous slide"
                            id="keen-slider-previous"
                            className="rounded-full border border-violet-600 p-3 text-violet-600 transition hover:bg-violet-600 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5 rtl:rotate-180"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            aria-label="Next slide"
                            id="keen-slider-next"
                            className="rounded-full border  border-violet-600 p-3 text-violet-600 transition hover:bg-violet-600 hover:text-white"
                        >
                            <svg
                                className="size-5 rtl:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 5l7 7-7 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
                    <div id="keen-slider" className="keen-slider">
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
