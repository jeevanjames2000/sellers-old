'use client '
import Image from 'next/image'
import React from 'react'
import housepackage from '@/public/assets/house_package.png'

function Housepackage() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 bg-[#ffffff] rounded-lg p-2 xs:p-6'>
            <div className="col-span-1 flex flex-col">
                <p className="text[14px] 2xl:text[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1D3A76] font-[700]">
                    Boost your business with house packages
                </p>
                <Image src={housepackage} alt='logo' className='object-cover object-center' />
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-2 mt-8 p-1 xs:p-4 bg-[#F4EBD7] border-[1.5px] border-[#699BA0] rounded-[10px]">
                <div className="col-span-2 rounded-lg bg-[#ffffff] overflow-hidden">
                    <table className="w-full h-full table-auto">
                        <tbody>
                            {/* Row 1 */}
                            <tr className="bg-[#f5f5f5]">
                                <th className="text-[#6d6c6c] text-[10px] xs:text-[12px] font-medium text-left pl-2 py-2 border-r-2 border-white"></th>
                                <td className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-semibold text-center py-2">Free</td>
                            </tr>

                            {/* Row 2 */}
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <th className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium  text-left pl-2 py-1 border-r-2 border-white">Assured Contacts</th>
                                <td className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium text-center">10</td>
                            </tr>

                            {/* Row 3 */}
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <th className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium  text-left pl-2 py-1 border-r-2 border-white">Enquiries</th>
                                <td className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium text-center">3</td>
                            </tr>

                            {/* Row 4 */}
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <th className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium  text-left pl-2 py-1 border-r-2 border-white">Visibility</th>
                                <td className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium text-center">Low</td>
                            </tr>

                            {/* Row 5 */}
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <th className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium pl-2 py-1 text-left border-r-2 border-white">Listing Expiry</th>
                                <td className="text-[#6d6c6c] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium text-center">15 Days</td>
                            </tr>

                            {/* Row 6 */}
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <th className="text-[#6d6c6c] text-[10px] xs:text-[12px] font-medium pl-2 py-1 border-r-2 border-white"></th>
                                <td className='text-center'>
                                    <button
                                        className="text-[#53C0AC] h-7 py-1 my-1 sm:px-4 text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-[700] rounded-md focus:outline-none"
                                    >
                                        Know more
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-span-1 rounded-lg overflow-hidden bg-white">
                    <table className="w-full h-full table-auto text-center">
                        <tbody>
                            <tr className="bg-[#699BA0]">
                                <td id="house-contacts" className="text-[#ffffff] bg-[#699BA0] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-semibold pl-2 py-2">House Package</td>
                            </tr>
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <td id="house-contacts" className="text-[#6d6c6c] bg-[#f5f5f5] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium pl-2 py-1">10</td>
                            </tr>
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <td className="text-[#6d6c6c] bg-[#f5f5f5] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium pl-2 py-1">Unlimited</td>
                            </tr>
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <td className="text-[#6d6c6c] bg-[#f5f5f5] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium pl-2 py-1">High</td>
                            </tr>
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <td className="text-[#6d6c6c] bg-[#f5f5f5] text-[10px] xs:text-[12px] 2xl:text[16px] 3xl:text-[18px] 4xl:text-[20px] font-medium pl-2 py-1">60 Days</td>
                            </tr>
                            <tr className="bg-[#f5f5f5] border-t-2 border-white">
                                <td>
                                    <button
                                        className="package-btn bg-[#53c0ac] text-[#ffffff] my-1 font-[700] h-5 sm:h-7 2xl:h-auto py-0.5 sm:py-1 px-4 text-[10px] 2xl:text[12px] 3xl:text-[14px] 4xl:text-[16px] rounded-md focus:outline-none"
                                    >
                                        Try Now!
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Housepackage