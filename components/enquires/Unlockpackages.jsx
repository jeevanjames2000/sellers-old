import Image from 'next/image'
import React from 'react'
import unlock_package from '@/public/assets/unlock_package.png'

function Unlockpackages() {
    return (
        <div className="flex flex-col items-center justify-center  bg-[#ffffff] p-3 px-6 rounded-[10px]">
            <Image src={unlock_package} alt={"unlock_package"} className=' w-fit h-10 object-cover' />
            <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text[22px] text-[#6D6C6C] font-[700] text-center pt-2 '>
                You can view only 3 enquiries
            </p>
            <p className='text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] text-[#6D6C6C] font-[400] text-center py-3'>
                View more enquiries by getting our owner package now
            </p>
            <button
                    className=" bg-[#53c0ac] text-white py-1 px-4 h-7 2xl:h-8 3xl:h-9 4xl:h-10 text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[600] rounded-[5px]
                    hover:bg-[#53c0ac]/70 focus:outline-none"
                >
                  Continue
                </button>
        </div>
    )
}

export default Unlockpackages