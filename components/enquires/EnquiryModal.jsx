import Image from 'next/image';
import React from 'react'

import imagplaceholder from '@/public/assets/imgeplaceholder.jpg';

function EnquiryModal({ singleEnquiry, closeEnquiryModal }) {

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
        <div>
            {singleEnquiry &&
                <>
                    <div className='border border-[#D7D8D9] rounded-md'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
                            <div className='flex flex-col space-y-3'>
                                <p className='font-bold text-[#1D3A76]'>User Details</p>
                                <p className='text-[#1D3A76] font-semibold text-xs'>Name :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.name || ''}</span></p>
                                <p className='text-[#1D3A76] font-semibold text-xs'>Phone Number :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.mobile || ''}</span></p>
                                <p className='text-[#1D3A76] font-semibold text-xs'>Email Address :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.email || ''}</span></p>
                            </div>
                            <div className='flex flex-col space-y-3'>
                                <p className='font-bold text-[#1D3A76]'>Property Details</p>
                                <Image
                                    src={singleEnquiry?.property_details?.image || imagplaceholder}
                                    alt={'Property Image'}
                                    width={200}
                                    height={150}
                                    className='rounded-md'
                                />
                                <p className='text-[#1D3A76] font-semibold text-xs'>Property Id :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.property_details?.unique_property_id || ''}</span></p>
                                <p className='text-[#1D3A76] font-semibold text-xs'>Property Name :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.property_details?.property_name || ''}</span></p>
                                <p className='text-[#1D3A76] font-semibold text-xs'>Property In :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.property_details?.property_in || ''}</span></p>
                                <p className='text-[#1D3A76] font-semibold text-xs'>Property For :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.property_details?.property_for || ''}</span></p>
                                <p className='text-[#1D3A76] font-semibold text-xs'>Property Type :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.property_details?.sub_type || ''}</span></p>
                                {
                                    singleEnquiry?.property_details?.property_for === 'Sell' ?
                                        <p className='text-[#1D3A76] font-semibold text-xs'>Property Cost :<span className='pl-1 text-[#252525]/70 font-semibold'>{formatPrice(singleEnquiry?.property_details?.property_cost) || ''}</span></p>
                                        :
                                        <p className='text-[#1D3A76] font-semibold text-xs'>Monthly Rent :<span className='pl-1 text-[#252525]/70 font-semibold'>Rs. {formatPrice(singleEnquiry?.property_details?.monthly_rent) || ''} Rent</span></p>
                                }
                                <p className='text-[#1D3A76] font-semibold text-xs'>Builtup Area :<span className='pl-1 text-[#252525]/70 font-semibold'>{singleEnquiry?.property_details?.builtup_area || ''} {singleEnquiry?.property_details?.area_units}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-end mt-4'>
                        <button onClick={closeEnquiryModal} className='bg-[#1D3A76] font-semibold text-xs text-white px-4 py-2 rounded-md'>Close</button>
                    </div>
                </>
            }
        </div>

    )
}

export default EnquiryModal