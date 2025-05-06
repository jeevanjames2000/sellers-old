import React from 'react';
import amenitiesaskdetailslike from '@/public/assets/amenities-askdetails-like.png';
import Image from 'next/image';
import { IconHeart } from '@tabler/icons-react';
import Accordion from '@/components/tailifycomponents/Accordian';
import floor from '@/public/assets/floorandceiling.svg'
import fitting from '@/public/assets/fitting.svg'
import wallandceiling from '@/public/assets/wallandceiling.svg'
function PropertySpecifications({ propertyDetails }) {
    const specifications = [
        {
            name: "Floor & Counter", icon: floor,
            description:
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Living/Dining</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Verified Tiles</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Master Bedroom</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Verified Tiles</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Other Bedroom</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Verified Tiles</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Kitchen</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Verified Tiles</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Toilets</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Anti Skid Ceramic Tiles.</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Balcony</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Anti Skid Ceramic Tiles.</p>
                    </div>
                </div>
        },
        {
            name: "Fitting", icon: fitting,
            description:
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Toilets</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Provision For Exhaust Fan, CP fittings.</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Kitchen</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Granite Platform with stainless steel sink.</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Doors</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Teak Wood Frame.</p>
                    </div>
                </div>
        },
        {
            name: "Wall & Ceiling", icon: wallandceiling,
            description:
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Interior</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Acrylic Emulsion Paint with Putty</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Exterior</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Texture Paint</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Kitchen</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Ceramic Tiles Dado</p>
                    </div>
                    <div className='flex flex-col gap-1 mb-4'>
                        <p className='text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-Montserrat text-[#6E6E6E] font-semibold'>Toilets</p>
                        <p className='text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-Montserrat text-[#434343] font-semibold'>Ceramic Tiles Dado</p>
                    </div>
                </div>
        },
    ]

    return (
        <div className="propertyprice space-y-6">
            <p className="text-[#1d3a76] text-[22px] xs:text-[25px] 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-[600]">{propertyDetails?.property_name?.toUpperCase()} Specifications</p>
            <div className="custom-shadow p-6 space-y-8 bg-[#F3F3F3] rounded-md">
                <div className="flex items-center justify-end gap-[14px]">
                    <IconHeart stroke={2} color="#E28B6D" className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:w-8 4xl:h-8" />
                    <Image
                        src={amenitiesaskdetailslike}
                        alt="amenities-askdetails-like"
                        className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:w-8 4xl:h-8 object-contain"
                    />
                    <button
                        className="bg-[#079E9E] text-[#ffffff] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600] py-1 px-3 rounded-[5px]"
                    >
                        Ask for Details
                    </button>
                </div>
                <Accordion items={specifications} />
            </div>
        </div>
    );
}

export default PropertySpecifications;
