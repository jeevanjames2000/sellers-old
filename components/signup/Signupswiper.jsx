'use client'
import React from 'react'
import apartment from '@/public/assets/apartment.jpg'
import apartment1 from '@/public/assets/apartment1.jpg'
import apartment2 from '@/public/assets/apartment2.jpg'
import apartment3 from '@/public/assets/apartment3.jpg'
import apartment4 from '@/public/assets/apartment4.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image'
import '../login/loginstyles.css'

function Signupswiper() {
    return (
        <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            className='w-full  '
            aria-orientation='horizontal'
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide className="w-full h-full">
                <Image
                    src={apartment}
                    alt="banner"
                    className="w-full h-[100vh] object-cover"
                />
            </SwiperSlide>
            <SwiperSlide className="w-full h-full">
                <Image
                    src={apartment1}
                    alt="banner"
                    className="w-full h-[100vh] object-cover"
                />
            </SwiperSlide>
            <SwiperSlide className="w-full h-full">
                <Image
                    src={apartment2}
                    alt="banner"
                    className="w-full h-[100vh] object-cover"
                />
            </SwiperSlide>
            <SwiperSlide className="w-full h-full">
                <Image
                    src={apartment3}
                    alt="banner"
                    className="w-full h-[100vh] object-cover"
                />
            </SwiperSlide>
            <SwiperSlide className="w-full h-full">
                <Image
                    src={apartment4}
                    alt="apartment4"
                    className="w-full h-[100vh] object-cover"
                />
            </SwiperSlide>
        </Swiper>
    )
}

export default Signupswiper