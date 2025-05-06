import Image from 'next/image'
import React from 'react'
import kyc_verification from '@/public/assets/kyc_verification.png';
import { IconChevronRight } from '@tabler/icons-react';

function Verifykyc() {
    return (
        <div className="bg-[#FFFFFF] p-4 pt-9 rounded-md">
            <div className="flex gap-4">
                <div className="w-[38%] h-full border-[2px] border-[#909090] rounded-md flex justify-center items-center">
                    <Image src={kyc_verification} alt="Verify Identity" className="w-[110px] h-[110px] object-contain py-3 px-2" />
                </div>
                <div className="w-[62%] space-y-2">
                    <p className="text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] font-[700] text-[#6d6c6c]">Verify Your Identity</p>
                    <p className="text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[400] text-[#6d6c6c]">
                        Complete verification with Aadhar eKYC!
                    </p>
                    <button
                        className="flex items-center text-[#699BA0] ml-auto h-7 2xl:h-8 3xl:h-9 4xl:h-10 py-1 text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[700] rounded-md focus:outline-none bg-transparent hover:bg-[#e6f5f2] transition-all"
                    >
                        Add property
                        <div className="bg-[#699BA0] h-3 w-3 2xl:h-4 3xl:h-5 4xl:h-6 2xl:w-4 3xl:w-5 4xl:w-6 flex items-center justify-center rounded-full ml-2">
                            <IconChevronRight color="#ffffff" stroke={2} className="w-3 h-3 2xl:h-4 3xl:h-5 4xl:h-6 2xl:w-4 3xl:w-5 4xl:w-6" />
                        </div>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Verifykyc