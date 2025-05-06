import React from 'react';
import international_schools from '@/public/assets/international_schools.svg';
import Image from 'next/image';
import hospitals from '@/public/assets/hospitals.svg';
import supermarkets_malls from '@/public/assets/supermarkets_malls.svg';
import sports_arena from '@/public/assets/sports_arena.svg';
import airport_travel from '@/public/assets/airport_travel.svg';
import parks_walkers_zone from '@/public/assets/parks_walkers_zone.svg';

function Propertylocation({ propertyDetails }) {
    return (
        <div className="propertyprice space-y-6">
            <div>
                <p className="text-[#1d3a76] text-[22px] xs:text-[25px] 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-[600]">Property Location</p>
                <p className="text-[#00609E] text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[400]">{propertyDetails?.google_address}</p>
            </div>
            {
                propertyDetails?.total_places_around_property.length > 0 &&
                <div className="custom-shadow bg-[#F3F3F3] p-6 space-y-8">
                    <p className="text-[#00609E] text-[16px] xs:text-[18px] 2xl:text-[22px] 3xl:text-[24px] 4xl:text-[26px] font-[600] text-center">Around This Property</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {
                            propertyDetails?.total_places_around_property.length > 0 ?
                                propertyDetails?.total_places_around_property.map((item, index) => (
                                    <div
                                        key={index}
                                        className="custom-shadow flex bg-[#FFFFFF] rounded-md items-center justify-start  p-[10px] gap-2"
                                    >
                                        {/* <Image
                                    src={amenity.image}
                                    alt={amenity.name}
                                    height={30}
                                    width={30}
                                    className="object-fit"
                                /> */}
                                        <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#00609E] font-[400]">{item.place}</p>
                                        <p className="text-[#ffffff] text-center text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] bg-[#1F3C88] font-[600] px-3 py-[4px] rounded-md ml-auto">
                                            {item.distance}
                                        </p>
                                    </div>
                                ))
                                :
                                <p className="text-[#00609E] text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[400]">No data</p>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Propertylocation;
