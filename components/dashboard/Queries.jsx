import { IconMail, IconPhone } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

function Queries() {
    return (
        <div className="bg-[#ffffff]  p-6 rounded-lg space-y-8">
            <div className="grid grid-cols-5 grid-rows-1 gap-5 w-full  py-4 ">
                <div className='col-span-5 sm:col-span-2 row-span-1 space-y-3 border-[1.5px] rounded-lg p-6 border-[#699BA0] text-center '>
                    <p className="text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] font-[700] text-[#6d6c6c] ">
                        Have Questions?
                    </p>
                    <p className="text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[600] text-[#878787]  px-6">
                        Explore our FAQ section for commonly asked questions
                    </p>
                    <button
                        className=" bg-[#53c0ac] text-white h-7 2xl:h-8 3xl:h-9 4xl:h-10 w-fit  px-4 rounded-[8px] text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[700] focus:outline-none "
                    >
                        Explore FAQ'S
                    </button>

                </div>
                <div className='col-span-5 sm:col-span-3 row-span-1 w-full space-y-3 border-[1.5px] rounded-lg p-6 border-[#699BA0] text-center '>
                    <p className="text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] font-[700] text-[#878787] ">
                        Customer Support
                    </p>
                    <div className=' flex flex-row items-center justify-center'>
                        <IconPhone size={20} />
                        <Link href="tel:9553919919" className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text[22px] font-[600] text-[#878787] text-center  px-2">
                            +91 9553919919
                        </Link>
                    </div>
                    <div className=' flex flex-row items-center justify-center'>
                        <IconMail size={20} />
                        <Link href="mailto:meetowner.in@gmail.com" className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text[22px] font-[600] text-[#878787] text-center  px-2">
                            meetowner.in@gmail.com
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Queries