'use client';
import React, { useRef } from 'react'; // Correctly importing useRef
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IconArrowLeft, IconArrowRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import agreement1 from '@/public/assets/agreement1.png'
import agreement2 from '@/public/assets/agreement2.png'
import Agreementcard from './Agreementcard';
function Agreement() {
    const swiperRef = useRef(null); // Correct use of useRef

    const agreement = [

        {
            id: 1,
            image: agreement2,
            online_agreement: 'Instant Online Rent Agreement',
            description: 'Completely legal with lowest price guarantee'


        },

        {
            id: 2,
            image: agreement2,
            online_agreement: 'Instant Online Rent Agreement',
            description: 'Completely legal with lowest price guarantee'


        },

    ];

    return (
        <div className=' flex flex-col space-y-6'>
            <div className=" relative "> {/* Added relative positioning */}
                <Swiper
                    modules={[Navigation, Autoplay]} // Add Autoplay to modules
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000, // Delay between slides (in milliseconds)
                        disableOnInteraction: false, // Continue autoplay after user interaction
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className="w-full h-full"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {agreement.length > 0 ? (
                        agreement.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Agreementcard
                                    image={item.image}
                                    online_agreement={item.online_agreement}
                                    description={item.description}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className='text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px]'>No data</p>
                    )}
                </Swiper>

            </div>

            <div className=' flex flex-row items-start justify-between px-3'>
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className=" bg-[#1D3A76] rounded-full p-1 focus:outline-none border border-gray-300"
                    aria-label="Previous slide"
                >
                    <IconArrowLeft className=" h-4 w-8 2xl:h-5 2xl:w-10 3xl:h-6 4xl:h-7 3xl:w-12 4xl:w-14 text-[#ffffff]" />
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className=" bg-[#1D3A76] rounded-full p-1 focus:outline-none border border-gray-300"
                    aria-label="Next slide"
                >
                    <IconArrowRight className=" h-4 w-8 2xl:h-5 2xl:w-10 3xl:h-6 4xl:h-7 3xl:w-12 4xl:w-14 text-[#ffffff]" />
                </button>
            </div>
        </div>
    );
}



export default Agreement