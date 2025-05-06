import Image from 'next/image'
import React from 'react'
 import  benefits from '@/public/assets/benefits.png'

function Benefits() {
    return (
        <div className='flex flex-col sm:flex-row items-center justify-center bg-[#FCFCF3] py-6  md:py-12 px-5 sm:px-10 lg:px-20 gap-5 sm:gap-10 lg:gap-12 rounded-[10px]'>
            <p className='text-[22px] xs:text-[26px] 2xl:text-[30px] 3xl:text-[32px] 4xl:text-[34px] text-[#116D85] text-center sm:text-start font-bold  w-full'>
                What are your benefits?
            </p>
            <Image src={benefits} alt={"benefits"} className="object-contain h-auto xl:h-80 2xl:min-h-[500px] " />
        </div>
    )
}

export default Benefits