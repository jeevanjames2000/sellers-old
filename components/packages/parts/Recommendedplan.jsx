import Image from 'next/image'
import React from 'react'
import recommended_plan1 from '@/public/assets/enroll_package2.png'
import online_support from '@/public/assets/online_support.png'


function Recommendedplan() {
    return (
        <div>
            <p className=' bg-[#E2EAED] text-[22px] xs:text-[26px] 2xl:text-[30px] 3xl:text-[32px] 4xl:text-[34px] text-[#1D3A76] text-center font-bold py-3 w-full rounded-tl-[10px] rounded-tr-[10px]'>
                What awaits you on Meetowner.in
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 items-center justify-center bg-[#FCFCF3] py-6 md:py-12 gap-5 md:gap-10 lg:gap-16 px-5 sm:px-10 lg:px-40 rounded-bl-[10px] rounded-br-[10px]'>
                <div className='flex flex-col items-center justify-center border-2 rounded-[10px] border-[#909090] px-4 gap-4 py-6 w-full h-full'>
                    <p className="font-[600] text-[#116D85] pb-4 text-[16px] xs:text-[18px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px]">Enhancer of Visibility</p>
                    <Image src={recommended_plan1} alt={"recommended_plan1"} className="object-cover w-fit h-40" />
                    <p className="text-center text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#6D6C6C] font-[400] space-y-2 px-3 md:px-6 lg:px-12">
                        Ad packages to advertise your listings in the best places to attract more inquiries quickly.
                    </p>
                    <button className=' flex items-center justify-center px-4 py-1 rounded-[5px] border-[1.5px] border-[#699BA0] text-[#699BA0] text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[700] hover:text-[#ffffff] hover:bg-[#699BA0]'>
                    See Recommended Plan
                    </button>
                </div>
                <div className='flex flex-col items-center justify-center border-2 rounded-[10px] border-[#909090] px-4 gap-4 py-6 w-full h-full'>
                    <p className="font-[600] text-[#116D85] pb-4 text-[16px] xs:text-[18px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px]">Online support</p>
                    <Image src={online_support} alt={"online_support"} className="object-cover w-fit h-40" />
                    <p className="text-center text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#6D6C6C] font-[400] space-y-2 px-3 md:px-6 lg:px-12">
                    A committed executive will filter your inquiries and tenant profiles.                    </p>
                    <button className=' flex items-center justify-center px-4 py-1 rounded-[5px] border-[1.5px] border-[#699BA0] text-[#699BA0] text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[700] hover:text-[#ffffff] hover:bg-[#699BA0]'>
                    See Recommended Plan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Recommendedplan