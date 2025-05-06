import Image from 'next/image'
import React from 'react'
import enroll_package2 from '@/public/assets/enroll_package2.png'
import enroll_package1 from '@/public/assets/enroll_package1.png'


function Enrollpackages() {
    return (
        <div className='bg-[#FCFCF3] grid grid-cols-1 md:grid-cols-2 grid-rows-1 px-3 md:px-6 py-4 md:py-8 gap-5 md:gap-32 rounded-[10px]'>
            <div className=' flex flex-col col-span-1 row-span-1 w-full h-full gap-4 items-start justify-center'>
                <p className="text-[14px] xs:text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] text-[#6D6C6C] font-[400]">
                    <span className="font-[600] text-[#116D85]">Enroll</span> in one of our
                    <span className="font-[600] text-[#116D85]"> premium packages </span> to receive
                    <span className="font-[600] text-[#116D85]"> exclusive benefits </span> and sell or rent your
                    <span className="font-[600] text-[#116D85]"> property quickly</span>.
                </p>
                <p className="text-[14px] xs:text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] text-[#6D6C6C] font-[400]">
                    <span className="font-[600] text-[#116D85]">Promote your property</span> to more than several lakh home buyers on
                    <span className="font-[600] text-[#116D85]"> Meetowner</span>
                </p>
                <ul className="list-disc pl-8 text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text[22px] text-[#6D6C6C] font-[400] space-y-2">
                    <li>These packages are only applicable to residential listings. To view commercial packages, please go to the commercial tab.</li>

                    <li>Plans are not eligible for PG listings.</li>
                    <li>
                        The guarantee package is only available for listings with a rent of less than
                        <span className="font-[600] text-[#116D85]"> 50001</span>.
                    </li>
                </ul>
                <button className=" flex items-center justify-center bg-[#53C0AC] text-[#ffffff] h-10 w-fit  px-4 text-[14px] xs:text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] font-[700] rounded-md focus:outline-none ">
                    Upgrade Now
                </button>

            </div>
            <div className=' flex flex-col  mt-auto col-span-1 row-span-1 w-full h-full'>
                <Image src={enroll_package2} alt={"enroll_package2"} className="object-cover px-12" />
                <Image src={enroll_package1} alt={"enroll_package1"} className="object-cover" />
            </div>
        </div>
    )
}

export default Enrollpackages