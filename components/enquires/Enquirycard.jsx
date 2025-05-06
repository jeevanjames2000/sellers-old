import { IconMail, IconPhone, IconUser } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'
import imageplaceholder from '@/public/assets/imgeplaceholder.jpg';

function Enquirycard({
    image,
    property_name,
    unique_property_id,
    enquiry_from,
    sub_type, property_for, google_address, builtup_area, property_cost, area_units, monthly_rent, user_name, user_email, user_mobile }) {
    const formatPrice = (price) => {
        if (price >= 10000000) {
            return (price / 10000000).toFixed(2) + ' Cr'; // Crores
        } else if (price >= 100000) {
            return (price / 100000).toFixed(2) + ' Lakhs'; // Lakhs
        } else if (price >= 1000) {
            return (price / 1000).toFixed(2) + ' K'; // Thousands
        }
        return price;
    };
    return (
        <div className="grid grid-cols-12 items-start w-full rounded-[10px] border-[1px] border-[#1d3a7652] bg-[#E2EAED] px-2 py-[10px]">
            <div className='col-span-12 sm:col-span-4 flex w-full space-x-2 pt-4'>
                <Image
                    src={image || imageplaceholder}
                    alt={"enquiry_1"}
                    className="object-fit w-16 h-16  border-2 border-[#909090] rounded-full p-[0.05rem]"
                    height={64}
                    width={64}
                />
                <div className=' space-y-1'>
                    <p className='text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] text-[#252525] font-[700]'>
                        {property_name}
                    </p>
                    <p className='text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] text-[#252525] font-[600]'>
                        {unique_property_id}
                    </p>
                    <div className=' space-x-1'>
                        <button className=" text-[#ffffff] text-[8px] xs:text-[8px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] bg-[#1D3A76] font-[600] rounded-[5px] px-2 py-1 focus:outline-none" >
                            Favourites
                        </button>
                        <button className=" text-[#ffffff] text-[8px] xs:text-[8px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] bg-[#1D3A76] font-[600] rounded-[5px] px-2 py-1 focus:outline-none" >
                            View contact
                        </button>
                        <button className=" text-[#ffffff] text-[8px] xs:text-[8px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] bg-[#0392D4] font-[600] rounded-[5px] px-2 py-1 focus:outline-none" >
                            Contact CRM
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-span-12 xxm:col-span-4 sm:col-span-3 flex flex-col items-start justify-start pt-4 space-y-2'>
                {/* <p className='text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] text-[#252525] font-[700]'>
                    {user_name || `N/A`}
                </p> */}

                <div className='flex items-center gap-[4px] justify-start text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] text-[#252525] font-[700]'>
                    <IconUser size={14} />
                    <p>{user_name || `N/A`}</p>
                </div>
                <div className='flex items-center justify-start text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] text-[#252525] font-[600] gap-[4px]'>
                    <IconPhone size={14} />
                    <p>{user_mobile || `N/A`}</p>
                </div>
                <div className='flex items-center justify-start text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] text-[#252525] font-[600] gap-[4px] leading-tight'>
                    <IconMail size={14} />
                    <p>{user_email || `N/A`}</p>
                </div>
            </div>
            <div className='flex flex-col justify-end col-span-12 xxm:col-span-8 sm:col-span-5 space-y-1 xxm:pl-6'>
                <div className='flex flex-row justify-end'>
                    {
                        enquiry_from !== "undefined" &&
                        <p className=' flex flex-row items-center justify-center text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] font-[600] bg-[#53c0ac] text-white rounded-l-full rounded-r-full px-3 py-[3px]'>
                            {enquiry_from}
                        </p>
                    }
                </div>
                <p className=' flex text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text[18px] text-[#252525] font-[600]'>
                    {sub_type} for {property_for}
                </p>
                <p className='w-[80%] truncate flex flex-wrap text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] text-[#252525] font-[400]'>
                    {google_address}
                </p>
                <div className=' flex flex-wrap gap-1'>
                    <div className=' flex flex-row items-center justify-center bg-[#1D3A76] rounded-l-full rounded-r-full px-2 py-1'>
                        <p className=' flex text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] text-[#ffffff] font-[600] border-r border-[#ffffff] pr-1'>
                            Builtup Area
                        </p>
                        {
                            builtup_area ?
                                <p className=' flex text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] text-[#ffffff] font-[600] pl-[2px]'>
                                    {builtup_area} {area_units}
                                </p>
                                :
                                <p className=' flex text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] text-[#ffffff] font-[600] pl-[2px]'>
                                    NA
                                </p>
                        }
                    </div>
                    {
                        property_for === 'Rent' ?
                            <p className=' flex flex-row items-center justify-center text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] font-[600] bg-[#1D3A76] text-white rounded-l-full rounded-r-full px-3 py-[3px]'>
                                Rs. {formatPrice(monthly_rent)} Rent
                            </p>
                            :
                            <p className=' flex flex-row items-center justify-center text-[8px] xs:text-[9px] 2xl:text-[12px] 3xl:text-[14px] 4xl:text[16px] font-[600] bg-[#1D3A76] text-white rounded-l-full rounded-r-full px-3 py-[3px]'>
                                Rs. {formatPrice(property_cost)}
                            </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Enquirycard