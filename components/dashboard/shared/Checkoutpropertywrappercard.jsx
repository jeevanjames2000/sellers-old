import Image from 'next/image'
import React from 'react'
import imageplaceholder from '@/public/assets/imgeplaceholder.jpg'
import Link from 'next/link';
function Checkoutpropertywrappercard({
    image, bhk,
    property_subtype,
    google_address, monthly_rent,
    property_cost, property_for,
    area_units,
    builtup_area,
    carpet_area,
    length_area,
    width_area,
}) {
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
        <div className="w-full flex flex-col xs:flex-row border-[1.5px] border-[#699BA0] rounded-lg p-3 mt-6 gap-4">
            {/* Image Section */}
            <div className="w-full xs:w-[30%] h-32 2xl:h-auto relative">
                <Image
                    src={image || imageplaceholder}
                    alt={"property"}
                    className="object-cover rounded-lg border-2 border-[#E2EAED]"
                    fill
                />
            </div>

            {/* Text Content Section */}
            <div className="w-full xs:w-[70%] space-y-1">
                <div className='flex flex-row items-center gap-2'>
                    {
                        (property_subtype === "Apartment" || property_subtype === "Flat" || property_subtype === "Independent House" || property_subtype === "Independent Villa") &&
                        <p className="text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px] font-bold text-[#6D6C6C]">{`${bhk} BHK`}</p>
                    }
                    <p className="w-[80%] truncate text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px] font-bold text-[#6D6C6C]">
                        {property_subtype} in {google_address}</p>
                </div>
                {
                    (property_subtype === "Apartment" || property_subtype === "Flat" || property_subtype === "Land" || property_subtype === "Office" || property_subtype === "Retail Shop" || property_subtype === "Show Room" || property_subtype === "Independent House" || property_subtype === "Independent Villa") ?
                        <p className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[400] text-[#6d6c6c]">{`${builtup_area} ${area_units}`}</p>
                        :
                        <p className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[400] text-[#6d6c6c]">{`${length_area} x ${width_area} ${area_units}`}</p>
                }
                <p className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[400] text-[#6d6c6c] pb-3">
                    {property_for === "Sell" ? `₹ ${formatPrice(property_cost)}` : ` ₹ ${formatPrice(monthly_rent)} Rent`}
                </p>

                {/* Action Section */}
                <div className="flex flex-row items-center justify-between border-t-[1.5px] border-t-[#E2EAED] pt-3">
                    <p className="text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[400] text-[#6d6c6c]">Plan upgrade required</p>
                    <Link href="/packages"
                        className="upgrade-btn bg-[#53c0ac] text-[#ffffff] text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[700] py-1 px-3 rounded-[5px] hover:bg-[#53c0ac]/70 focus:outline-none"
                    >
                        Upgrade Now
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Checkoutpropertywrappercard