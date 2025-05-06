import Image from 'next/image'
import React from 'react'
import operate_1 from '@/public/assets/operate_1.png'
import operate_2 from '@/public/assets/operate_2.png'
import operate_3 from '@/public/assets/operate_3.png'
import operate_4 from '@/public/assets/operate_4.png'

function Operates() {
    return (
        <div className='flex flex-col md:flex-row  items-center   bg-[#FCFCF3] py-3 sm:py-5 lg:py-7 px-5 sm:px-10 lg:px-20 w-full gap-4 sm:gap-7 md:gap-14 lg:gap-28 rounded-[10px]'>
            <p className='text-[22px] xs:text-[26px] 2xl:text-[30px] 3xl:text-[32px] 4xl:text-[34px] text-[#116D85] text-center md:text-start font-bold  md:w-[30%]'>
                How It Operates ?
            </p>
            <div className=' grid grid-cols-1 sm:grid-cols-2 grid-rows-2 w-full md:w-[70%] gap-6 md:gap-12'>
                <div className='col-span-1 row-span-1 flex flex-row items-center gap-6 md:gap-12'>
                    <p className='flex items-center  justify-center text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[22px] 4xl:text-[24px] font-bold p-3 border-2 border-[#1D3A76] text-[#1D3A76] rounded-full  h-6 w-6'>
                        1
                    </p>
                    <div className=' flex flex-col mx-auto'>
                        <Image src={operate_1} alt={"operate_1"} className="object-contain h-28 w-full  " />
                        <p className="text-center text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600] text-[#116D85] space-y-2 pt-4">
                            Upload your property
                        </p>
                    </div>

                </div>
                <div className='col-span-1 row-span-1 flex flex-row items-center gap-6 md:gap-12'>
                    <p className='flex items-center  justify-center  text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[22px] 4xl:text-[24px] font-bold p-3 border-2 border-[#1D3A76] text-[#1D3A76] rounded-full  h-6 w-6'>
                        2
                    </p>
                    <div className=' flex flex-col mx-auto'>
                        <Image src={operate_2} alt={"operate_2"} className="object-contain h-28 w-full  " />
                        <p className="text-center text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600] text-[#116D85] space-y-2 pt-4">
                            Choose a package
                        </p>
                    </div>
                </div>
                <div className='col-span-1 row-span-1 flex flex-row items-center gap-6 md:gap-12'>
                    <p className='flex items-center  justify-center text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[22px] 4xl:text-[24px] font-bold p-3 border-2 border-[#1D3A76] text-[#1D3A76] rounded-full  h-6 w-6'>
                        3
                    </p>
                    <div className=' flex flex-col mx-auto'>
                        <Image src={operate_3} alt={"operate_3"} className="object-contain h-28 w-full  " />
                        <p className="text-center text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600] text-[#116D85] space-y-2 pt-4">
                            Property is advertised to attract endless inquiries.

                        </p>
                    </div>
                </div>
                <div className='col-span-1 row-span-1 flex flex-row items-center gap-6 md:gap-12'>
                    <p className='flex items-center  justify-center  text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[22px] 4xl:text-[24px] font-bold p-3 border-2 border-[#1D3A76] text-[#1D3A76] rounded-full  h-6 w-6'>
                        4
                    </p>
                    <div className=' flex flex-col mx-auto'>
                        <Image src={operate_4} alt={"operate_4"} className="object-contain h-28 w-full  " />
                        <p className="text-center text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600] text-[#116D85] space-y-2 pt-4">
                            Only the most relevant inquiries  are filtered out by a dedicated RM for you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Operates