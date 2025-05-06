import Image from 'next/image'
import find_planner from '@/public/assets/find_planner.png'
import React from 'react'
import Link from 'next/link'

function Planfinder() {
    return (
        <div className='bg-[#F4EBD7] w-full flex flex-col xs:flex-row rounded-[10px] items-center p-5 gap-2'>
            <div className='xs:w-[30%]'>
                <Image
                    src={find_planner}
                    alt={"find_planner"}
                    className="h-full object-cover rounded-lg"
                />
            </div>
            <div className='xs:w-[70%]'>
                <div className='flex flex-col xs:flex-row items-center gap-1'>
                    <div className="space-y-1 w-full xs:w-[75%] ">
                        <p className="text-[18px] xs:text-[25px] 2xl:text[28px] 3xl:text-[30px] 4xl:text-[32px] font-[700] text-[#6d6c6c]">
                            Not sure which Package is best for you?
                        </p>

                        <p className="text-[12px] xs:text-[14px] 2xl:text[18px] 3xl:text-[20px] 4xl:text-[22px] font-[400] text-[#6d6c6c]">
                            Let us help you out with our interactive plan finder
                        </p>
                    </div>
                        <Link href="/packages"
                            className="w-[100%] mt-2 xs:mt-0 xs:w-[25%] mr-3 bg-[#53c0ac] text-[#ffffff] text-[14px] 2xl:text[18px] 3xl:text-[20px] 4xl:text-[22px] font-[700] py-1 px-1 rounded-[5px]  hover:bg-[#53c0ac]/70 focus:outline-none"
                        >
                            Find plan
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default Planfinder