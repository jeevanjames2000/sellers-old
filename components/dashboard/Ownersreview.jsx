'use client';
import React, { useRef } from 'react'; // Correctly importing useRef
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IconChevronLeft, IconChevronRight, IconStarFilled } from '@tabler/icons-react';
import dynamic from 'next/dynamic';

const Ownersreviewcard = dynamic(() => import('./shared/Ownersreviewcard'));
import owner_1 from '@/public/assets/owner_1.png';
import owner_2 from '@/public/assets/owner_2.png';

function Ownersreview() {
    const swiperRef = useRef(null); // Correct use of useRef

    const ownersreview = [
        {
            id: 1,
            image: owner_1,
            owner_name: 'Sreya Vishwanadh',
            review_headline: 'Got lot of buyers',
            review: 'I bought the premium plus package to sell my property. I got so many buyers that I could easily finalize the deal at high profit.',
            
            
        },
        {
            id: 2,
            image: owner_2,
            owner_name: 'Sreya Vishwanadh',
            review_headline: 'Got lot of buyers',
            review: 'I bought the premium plus package to sell my property. I got so many buyers that I could easily finalize the deal at high profit.',
        },
        {
            id: 1,
            image: owner_1,
            owner_name: 'Smrithi jyosh',
            review_headline: 'Got lot of buyers',
            review: 'I bought the premium plus package to sell my property. I got so many buyers that I could easily finalize the deal at high profit.',
        },
        {
            id: 2,
            image: owner_2,
            owner_name: 'Ananya divi',
            review_headline: 'Got lot of buyers',
            review: 'I bought the premium plus package to sell my property. I got so many buyers that I could easily finalize the deal at high profit.',
        },
    ];

    return (
        <div className="bg-[#F4EBD7] w-full h-fit pt-5 px-6 pb-8 rounded-lg space-y-8">
        <p className="text-[#1D3A76] text-[16px] font-[700] pl-6 2xl:text[20px] 3xl:text-[22px] 4xl:text-[24px]">Owners Speak</p>
        <div className="relative px-2">
            <Swiper
                modules={[Navigation]}
                spaceBetween={1} // Adjusts the space between slides
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    }
                }}
                loop={true}
                className="w-full h-full" // Makes Swiper responsive
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {ownersreview.length > 0 ? (
                    ownersreview.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Ownersreviewcard
                                image={item.image}
                                owner_name={item.owner_name}
                                review_headline={item.review_headline}
                                review={item.review}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <p className='text-[16px] 2xl:text[20px] 3xl:text-[22px] 4xl:text-[24px]'>No data</p> // Fallback message if no reviews
                )}
            </Swiper>
    
            {/* Custom Navigation Buttons */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 -left-2.5 2xl:-left-[1%] z-10 transform -translate-y-1/2 bg-[#1D3A76] rounded-full p-1 focus:outline-none"
                aria-label="Previous slide"
            >
                <IconChevronLeft className="h-3 w-3 2xl:h-4 3xl:h-5 4xl:h-6 2xl:w-4 3xl:w-5 4xl:w-6 text-[#ffffff]" />
            </button>
    
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 -right-2.5 2xl:-right-[1%] z-10 transform -translate-y-1/2 bg-[#1D3A76] rounded-full p-1 focus:outline-none"
                aria-label="Next slide"
            >
                <IconChevronRight className="h-3 w-3 2xl:h-4 3xl:h-5 4xl:h-6 2xl:w-4 3xl:w-5 4xl:w-6 text-[#ffffff]" />
            </button>
        </div>
    </div>
    
    );
}

export default Ownersreview;
