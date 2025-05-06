import Image from 'next/image'
import React from 'react'
import guaranteed_enquiries from '@/public/assets/guaranteed_enquiries.png'
import Link from 'next/link'


function Getgauranteedenquiries() {
    return (
        <div className=' grid grid-cols-3 md:grid-cols-12 items-center justify-between  bg-[#F4EBD7] h-fit w-full rounded-[10px] px-5 py-3  '>
            <div className=' col-span-6 flex flex-col gap-2'>
                <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[700] text-[#5E7796]'>
                    Get Guaranteed <span className=' text-[#1D3A76] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[700]'>THIRTY ENQUIRIES  </span>
                </p>
                <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text[18px] font-[600] text-[#727272] '>
                    With Owner Packages
                </p>
                <div className=' flex gap-2'>
                    <Link href="/packages"
                        className="bg-[#53c0ac] text-white px-3 sm:px-6 py-1 text-[12px] xs:text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] font-[700] rounded-lg focus:outline-none"
                    >
                        Upgrade Now
                    </Link>
                    <Link href="/packages"
                        className="text-[#5E7796] px-3 sm:px-6 py-1 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[600] focus:outline-none"
                    >
                        View more
                    </Link>
                </div>

            </div>

            <div className='col-span-6 h-full w-full '>
                <Image src={guaranteed_enquiries} alt={"guaranteed_enquiries"} className=" ml-auto  object-cover h-28 w-40" />
            </div>
        </div>
    )
}

export default Getgauranteedenquiries