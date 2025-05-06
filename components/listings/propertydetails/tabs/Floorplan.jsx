import Image from 'next/image'
import React from 'react'
import priceplansftsartitech1 from '@/public/assets/priceplansfts-artitech1.png'
import priceplansftsartitech2 from '@/public/assets/priceplansfts-artitech2.png'

function Floorplan({ price, type }) {
    return (
        <div className='floorplan flex flex-col sm:flex-row gap-8'>
            <div className='w-full sm:w-[60%] space-y-5'>
                <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#492828] font-[600] underline underline-offset-8'>
                    Floor plan
                </p>
                <Image
                    src={priceplansftsartitech1}
                    alt="priceplansfts-artitech1"
                    className='w-full h-64 object-fit'
                />
            </div>
            <div className='w-full sm:w-[40%] space-y-5 sm:mx-5'>
                <div className='flex gap-2'>
                    <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#492828] font-[600] underline underline-offset-8'>
                        Price
                    </p>
                    <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#492828] font-[700] '>{price}</p>
                </div>
                <div className='custom-shadow bg-[#FFFFFF] px-6 pb-2 rounded-lg'>
                    <div className='flex items-center justify-between'>
                        <p className='text-[22px] xs:text-[25px] 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-semibold font-sans text-[#492828]'>
                            TYPE
                        </p>
                        <p className='text-[38px] xs:text-[40px] 2xl:text-[44px] 3xl:text-[46px] 4xl:text-[48px] text-[#878787] font-[700]'>{type}</p>
                    </div>
                    <Image
                        src={priceplansftsartitech2}
                        alt="priceplansfts-artitech1"
                        className='w-full h-48 object-contain mx-auto '
                    />
                </div>
            </div>
        </div>
    )
}

export default Floorplan