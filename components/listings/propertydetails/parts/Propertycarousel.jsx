'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';

function Property({ propertyDetails }) {
    const swiperRef = useRef(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div className="relative w-full">
            <div className='flex flex-wrap justify-between items-center'>
                <div className="flex flex-wrap space-x-2 my-3">
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-semibold text-[#00609E] px-2 py-[2px]">
                        {propertyDetails?.property_in}
                    </p>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-semibold text-[#00609E] border-l-[1.8px] border-r-[1.8px] border-[#8787874F] px-2 py-[2px]">
                        {propertyDetails?.property_for}
                    </p>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-semibold text-[#00609E] py-[2px]">
                        {
                            (propertyDetails?.sub_type !== "Plot" || propertyDetails?.sub_type !== "Land" || propertyDetails?.property_in !== "Commercial") ?
                                `${propertyDetails?.bedrooms || 'No'} BHK ${propertyDetails?.sub_type}`
                                :
                                ''
                        }
                    </p>
                    {
                        (propertyDetails?.sub_type === "Apartment" || propertyDetails?.sub_type === "Independent House" || propertyDetails?.sub_type === "Independent Villa") &&
                        <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-semibold text-[#00609E] border-l-[1.8px]  border-[#8787874F] px-2 py-[2px]">
                            {propertyDetails?.furnished_status ? propertyDetails?.furnished_status === "Unfurnished" ? `${propertyDetails?.furnished_status}` : `${propertyDetails?.furnished_status} Furnished` : ''}
                        </p>
                    }
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-semibold text-[#00609E] border-l-[1.8px]  border-[#8787874F] py-[2px]">
                        {
                            (propertyDetails?.property_for === "Sell") &&
                                (!(propertyDetails?.sub_type === "Plot" || propertyDetails?.sub_type === "Land")) ?
                                `${propertyDetails?.occupancy}`
                                :
                                ''
                        }
                    </p>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-semibold text-[#00609E] px-2 py-[2px]">
                        {propertyDetails?.facing ? `Facing ${propertyDetails?.facing}` : ''}
                    </p>
                    {
                        (propertyDetails?.sub_type === "Plot" || propertyDetails?.sub_type === "Land") &&
                        <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-semibold text-[#00609E] px-2  py-[2px]">
                            {propertyDetails?.possession_status ? ` ${propertyDetails?.possession_status}` : ''}
                        </p>
                    }
                </div>
            </div>
            <Swiper
                modules={[Navigation, Autoplay, FreeMode, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                thumbs={{ swiper: thumbsSwiper }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="w-full h-full"
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
            >
                {
                    propertyDetails?.image?.length > 0 &&
                    propertyDetails?.image.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='h-[300px]'>
                                <Image
                                    src={item}
                                    alt="Property Image"
                                    width={400}
                                    height={280}
                                    className="h-full w-full object-fit"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
            {
                propertyDetails?.image?.length > 0 &&
                <div className="relative flex items-center justify-center w-full pt-4 ">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-0 z-10 transform bg-[#1D3A76] rounded-full focus:outline-none p-[4px]"
                        aria-label="Previous slide"
                    >
                        <IconChevronLeft className="h-4 w-4 text-white" />
                    </button>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={5}
                        slidesPerView={6}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className='w-[80%]'
                    >
                        {
                            propertyDetails?.image?.length > 0 &&
                            propertyDetails?.image.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className='h-[60px] w-[100px] pl-1'>
                                        <Image
                                            key={index}
                                            src={item}
                                            alt="slideflowbtm1"
                                            width={100}
                                            height={100}
                                            className="h-full w-full object-fit rounded-sm"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-0 z-10 transform bg-[#1D3A76] rounded-full p-[4px] focus:outline-none"
                        aria-label="Next slide"
                    >
                        <IconChevronRight className="h-4 w-4 text-white" />
                    </button>
                </div>
            }
        </div>
    );
}

export default Property;
