import Image from 'next/image';
import React from 'react';
import qr_code from '@/public/assets/qr_code.png';

function Getapp() {
    return (
        <div className="flex flex-col bg-[#1D3A76] rounded-md p-4  gap-6">
            {/* Top Section */}
            <div className="flex gap-5 pt-3">
                <div className="w-[65%] flex flex-col space-y-3">
                    <p className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text[22px] font-[600] text-[#ffffff]">
                        Get enquiry details & latest updates on the app
                    </p>
                    <p className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text[22px] font-[400] text-[#ffffff] py-1">
                        Scan the QR code or get the app link on your WhatsApp
                    </p>
                </div>
                <div className='w-[35%]'>
                <Image
                    src={qr_code}
                    alt="QR Code"
                    className="h-[95px] w-[95px] object-cover"
                />
                </div>
               
            </div>

            {/* Bottom Section */}
            <div className="flex gap-2 w-full">
                <input
                    type="number"
                    placeholder=" Enter your mobile number"
                    className="w-[70%] text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] border border-[#878787] rounded-[8px] h-8 2xl:h-9 3xl:h-10 4xl:h-11 pl-2 bg-[#1D3A76] text-[#FFFFFF] font-[600] 
                    focus:outline focus:outline-[#ffffff] appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none 
                    [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                    className="w-[30%] bg-[#53c0ac] text-[#FFFFFF] font-[600] p-1 h-8 2xl:h-9 3xl:h-10 4xl:h-11 text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] rounded-[8px] 
                hover:bg-[#53c0ac]/70 focus:outline-none"
                >
                    Get App
                </button>
            </div>
        </div>
    );
}

export default Getapp;
