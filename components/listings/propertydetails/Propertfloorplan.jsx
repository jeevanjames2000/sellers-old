'use client'
import React, { useState } from 'react'
import Floorplan from './tabs/Floorplan';
import Image from 'next/image';

function Propertfloorplan({ propertyDetails }) {
    const [activetab, setactivetab] = useState("plan1");

    const updateSetactivetab = (value) => {
        setactivetab(value);
    }

    let available_from_date = 'N/A';

    if (propertyDetails?.available_from) {
        const available_from = new Date(propertyDetails.available_from);
        if (!isNaN(available_from)) {
            available_from_date = available_from.toISOString().split('T')[0];
        }
    }

    const formatPrice = (price) => {
        if (price >= 10000000) {
            return (price / 10000000).toFixed(2) + ' Cr'; // Crores
        } else if (price >= 100000) {
            return (price / 100000).toFixed(2) + ' Lac'; // Lakhs
        } else if (price >= 1000) {
            return (price / 1000).toFixed(2) + ' K'; // Thousands
        }
        return price;
    };

    let new_price;

    if (propertyDetails?.property_for === "Sell") {
        new_price = `₹ ${formatPrice(propertyDetails?.property_cost)}`;
    }
    else {
        new_price = ` ₹ ${formatPrice(propertyDetails?.monthly_rent)} Rent`;
    }
    return (
        <>
            {
                propertyDetails?.floorplans_images.length > 0 &&
                <div className='propertyprice space-y-6'>
                    <p className="text-[#1d3a76] text-[22px] xs:text-[25px] 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-[600]">
                        {propertyDetails?.property_name?.toUpperCase()} Floor Plan
                    </p>
                    <div className='custom-shadow bg-[#F3F3F3] p-6 space-y-8'>
                        {/* <div className='flex flex-col xxm:flex-row items-center gap-6'>
                    <div className='w-full md:w-[20%] custom-apartmentshadow py-2 flex flex-col items-center justify-center rounded-sm'>
                        <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#434343] font-[700] font-Montserrat'>
                            {
                                (propertyDetails?.sub_type !== "Plot" || propertyDetails?.sub_type !== "Land" || propertyDetails?.property_in !== "Commercial") &&
                                    propertyDetails?.bedrooms ? `${propertyDetails?.bedrooms} BHK` : 'No BHK'
                            }
                        </p>
                        <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1d3a76] font-[600] font-Montserrat'>
                            {propertyDetails?.sub_type}
                        </p>
                    </div>
                    <div className='w-full md:w-[20%] custom-apartmentshadow py-2 flex flex-col items-center justify-center rounded-sm'>
                        <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#434343] font-[700] font-Montserrat'>{propertyDetails?.facing}</p>
                        <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1d3a76] font-[600] font-Montserrat'>
                            Facing
                        </p>
                    </div>
                    {
                        (propertyDetails?.sub_type === "Plot" || propertyDetails?.sub_type === "Land") &&
                        <div className='w-full md:w-[20%] custom-apartmentshadow py-2 flex flex-col items-center justify-center rounded-sm'>
                            <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#434343] font-[700] font-Montserrat'>
                                Possession Status
                            </p>
                            <p className='text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1d3a76] font-[600] font-Montserrat'>
                                {propertyDetails?.possession_status || 'N/A'}
                            </p>
                        </div>
                    }
                </div>
                <div className='flex items-center justify-start gap-10 border-b-[1.8px] border-[#E2E2E2] '>
                    {
                        (propertyDetails?.sub_type === "Apartment" || propertyDetails?.sub_type === "Flat" || propertyDetails?.sub_type === "Land" || propertyDetails?.sub_type === "Office" || propertyDetails?.sub_type === "Retail Shop" || propertyDetails?.sub_type === "Show Room" || propertyDetails?.sub_type === "Independent House" || propertyDetails?.sub_type === "Independent Villa") &&
                        <>
                            <button
                                onClick={() => updateSetactivetab("plan1")}
                                className={`text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#0d6efd] font-[700] pb-[8px] font-Montserrat ${activetab === 'plan1' ? 'text-[#1d3a76] border-b-[1.8px] border-[#1d3a76]' : 'text-[#434343]'}`}>
                                {propertyDetails?.builtup_area ? `${propertyDetails?.builtup_area} sq.ft(builtup_area)` : ''}
                            </button>
                            <button
                                onClick={() => updateSetactivetab("plan2")}
                                className={`text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#0d6efd] font-[700] pb-[8px] font-Montserrat ${activetab === 'plan2' ? 'text-[#1d3a76] border-b-[1.8px] border-[#1d3a76]' : 'text-[#434343]'}`}>
                                {propertyDetails?.carpet_area ? `${propertyDetails?.carpet_area} sq.ft(carpet_area)` : ''}
                            </button>
                        </>
                    }
                    {
                        (propertyDetails?.sub_type === "Plot" || propertyDetails?.sub_type === "Land") &&
                        <>
                            <button
                                onClick={() => updateSetactivetab("plan3")}
                                className={`text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#0d6efd] font-[700] pb-[8px] font-Montserrat ${activetab === 'plan3' ? 'text-[#1d3a76] border-b-[1.8px] border-[#1d3a76]' : 'text-[#434343]'}`}>
                                {propertyDetails?.length_area ? `${propertyDetails?.length_area} sq.ft(length_area)` : ''}
                            </button>
                            <button
                                onClick={() => updateSetactivetab("plan4")}
                                className={`text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#0d6efd] font-[700] pb-[8px] font-Montserrat ${activetab === 'plan4' ? 'text-[#1d3a76] border-b-[1.8px] border-[#1d3a76]' : 'text-[#434343]'}`}>
                                {propertyDetails?.width_area ? `${propertyDetails?.width_area} sq.ft(width_area)` : ''}
                            </button>
                        </>
                    }
                    {
                        (propertyDetails?.sub_type === "Independent House" || propertyDetails?.sub_type === "Independent Villa" || propertyDetails?.sub_type === "Plot" || propertyDetails?.sub_type === "Warehouse" || propertyDetails?.sub_type === "Others") &&
                        <button
                            onClick={() => updateSetactivetab("plan5")}
                            className={`text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#0d6efd] font-[700] pb-[8px] font-Montserrat ${activetab === 'plan5' ? 'text-[#1d3a76] border-b-[1.8px] border-[#1d3a76]' : 'text-[#434343]'}`}>
                            {propertyDetails?.plot_area ? `${propertyDetails?.plot_area} sq.ft(plot_area)` : ''}
                        </button>
                    }
                </div>
                <div>
                    {activetab === 'plan1' &&
                        <Floorplan
                            price={new_price}
                            type="1"
                        />
                    }
                    {activetab === 'plan2' &&
                        <Floorplan
                            price={new_price}
                            type="2"
                        />
                    }
                    {activetab === 'plan3' &&
                        <Floorplan
                            price={new_price}
                            type="3"
                        />
                    }
                    {activetab === 'plan4' &&
                        <Floorplan
                            price={new_price}
                            type="4"
                        />
                    }
                    {activetab === 'plan5' &&
                        <Floorplan
                            price={new_price}
                            type="5"
                        />
                    }
                </div> */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                            {
                                propertyDetails?.floorplans_images.length > 0 ?
                                    propertyDetails?.floorplans_images?.map((img, index) => (
                                        <Image
                                            key={index}
                                            src={img || placeholderimage}
                                            alt={`property image ${index + 1}`}
                                            className='h-[180px] w-[180px] rounded-lg object-cover'
                                            width={200}
                                            height={200}
                                        />
                                    ))
                                    :
                                    <div className='flex items-center justify-center w-full h-[150px] bg-[#F3F3F3] rounded-lg'>
                                        <p className='text-[#1d3a76] text-[14px] font-[700] font-Montserrat'>No Floorplan Available</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Propertfloorplan;
