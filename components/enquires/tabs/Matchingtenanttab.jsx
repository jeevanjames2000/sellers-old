import React from 'react'

import { IconChevronLeft, IconChevronRight, IconDownload } from '@tabler/icons-react';
import enquiry_1 from '@/public/assets/enquiry_1.png';
import enquiry_2 from '@/public/assets/enquiry_2.png';
import Link from 'next/link';
import Matchingtenantcard from '../Matchingtenantcard';
function Matchingtenanttab() {
  const property = [
    {
      id: 1,
      image: enquiry_1,
      lakescape: 'Lakescape',
      id_number: '(MD-240102165030)',
      date: 'August-12-2024',
      trade: 'Apartment for sell',
      location: 'Lakescape, Kondapur, Telangana, India',
      area: '1250 yards',
      price: '2 cr'
    },
    {
      id: 2,
      image: enquiry_2,
      lakescape: 'Skyline Heights',
      id_number: '(MD-240102165031)',
      date: 'September-05-2024',
      trade: 'Independent Villa for rent',
      location: 'Lakescape, Kondapur, Telangana, India',
      area: '2500 sq. ft.',
      price: '2 cr'
    },

  ];
  return (
    <>
      {/* {property.length == 0 ? (
        property.map((item) => (
          <Matchingtenantcard
            key={item.id}
            image={item.image}
            lakescape={item.lakescape}
            id_number={item.id_number}
            date={item.date}
            trade={item.trade}
            location={item.location}
            area={item.area}
            price={item.price}
          />
        ))
      ) : (
        <p className="text-[16px] 2xl:text-[20px] 3xl:text[22px] 4xl:text-[24px]">No properties available</p> // Fallback message
      )}

      <p className="flex items-center justify-start px-5 py-[10px] text-[14px] text-[#ffffff] font-[700] bg-[#31539A] rounded-md">
        No matching Tenants
      </p> */}

      <div className='flex items-center justify-center h-[200px] bg-white border border-[#D7D8D9] rounded-md'>
        <p className='text-[#1D3A76] text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[700]'>No Matching Tenants Found</p>
      </div>

    </>
  )
}

export default Matchingtenanttab