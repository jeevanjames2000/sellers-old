'use client'
import Getapp from '@/components/enquires/parts/Getapp'
import React, { useEffect, useState } from 'react'
import Listingcard from './Listingcard'
import Pagination from '@/components/tailifycomponents/Pagination'
import { Loadingoverlay } from '@/components/tailifycomponents/Loadingoverlay'
import Propertyapi from '@/components/api/Propertyapi'
import { useUserDetails } from '@/components/zustand/useUserDetails'
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { toast } from 'react-toastify'

function Propertylists({
    totalPages,
    allListings,
    totalProperties,
    limit,
    handlePageChange,
    isLoadingEffect,
    openDeleteModal,
    propertyIn,
    propertySubtype,
    updatePropertySubtype,
    locality,
    updateLocality,
    bhkhide,
    bhk,
    updateBhk,
    propertyFor,
    updatePropertyFor,
    occupancyList,
    occupancy,
    updateOccupancy,
    propertyId,
    updatePropertyId,
    handleResetFilters,
    priceRange,
    handlePriceRange
}) {
    const user_info = useUserDetails((state) => state.userInfo)
    const user_id = user_info?.user_id || null
    const access_token = user_info?.access_token || null

    const [filters, setFilters] = useState(false)
    const updateFilters = () => {
        setFilters(!filters)
    }

    const [allPropertySubTypes, setAllPropertySubTypes] = useState([])
    const getPropertySubTypes = () => {
        Propertyapi.get('getpropertysubtypes', {
            params: {
                user_id: user_id,
                property_in: propertyIn
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then((response) => {
                let data = response.data
                if (data.status === 'error') {
                    let finalResponse = {
                        'message': data.message,
                    }
                    console.log(finalResponse)
                    toast.error(data.message)
                }
                if (data.status === 'success') {
                    setAllPropertySubTypes(data?.property_sub_type || [])
                    return false;
                }
            })
            .catch((error) => {
                console.log(error)
                let finalresponse;
                if (error.response !== undefined) {
                    finalresponse = {
                        'message': error.message,
                        'server_res': error?.response?.data
                    };
                } else {
                    finalresponse = {
                        'message': error.message,
                        'server_res': null
                    };
                }
                toast.error(finalresponse.message)
                return false;
            })
    }

    const [allPropertyFor, setAllPropertyFor] = useState([])
    const getPropertyFor = () => {
        Propertyapi.get('getPropertyFor', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then((response) => {
                let data = response.data
                if (data.status === 'error') {
                    let finalResponse = {
                        'message': data.message,
                        'server_res': data
                    }
                    console.log(finalResponse)
                    toast.error(data.message)
                }
                if (data.status === 'success') {
                    setAllPropertyFor(data?.property_for || [])
                    return false;
                }
            })
            .catch((error) => {
                console.log(error)
                let finalresponse;
                if (error.response !== undefined) {
                    finalresponse = {
                        'message': error.message,
                        'server_res': error.response.data
                    };
                }
                else {
                    finalresponse = {
                        'message': error.message,
                        'server_res': null
                    };
                }
                console.log(finalresponse)
                toast.error(finalresponse.message)
                return false;
            })
    }

    const [allBhk, setAllBhk] = useState([])
    const getBhk = () => {
        Propertyapi.get('getbedroomtypes', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })

            .then((response) => {
                let data = response.data
                if (data.status === 'error') {
                    let finalResponse = {
                        'message': data.message,
                        'server_res': data
                    }
                    console.log(finalResponse)
                    toast.error(data.message)
                }
                if (data.status === 'success') {
                    setAllBhk(data?.bedrooms || [])
                    return false;
                }
            })
            .catch((error) => {
                console.log(error)
                let finalresponse;
                if (error.response !== undefined) {
                    finalresponse = {
                        'message': error.message,
                        'server_res': error?.response?.data
                    };
                }
                else {
                    finalresponse = {
                        'message': error.message,
                        'server_res': null
                    };
                }
                console.log(finalresponse)
                toast.error(finalresponse.message)
                return false;
            })
    }

    useEffect(() => {
        getPropertySubTypes()
        getBhk()
        getPropertyFor()
    }, [propertyIn])


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

    return (
        <>
            <div className="listingfilter w-full md:w-[75%] lg:w-[80%] flex flex-col space-y-4">
                <div className=' grid grid-cols-6 ms:grid-cols-6 rounded-sm gap-8'>
                    <div className='flex flex-wrap col-span-6 lg:col-span-4 bg-[#31539A] rounded-md h-fit w-full p-4 space-y-3'>
                        <div className={`gap-3 grid ${bhkhide ? 'grid-cols-2 xxs:grid-cols-4 sm:grid-cols-7' : 'grid-cols-2 xxs:grid-cols-4 sm:grid-cols-6'}`}>
                            <input
                                type='text'
                                placeholder='Search Location'
                                className='px-4 text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] bg-transparent h-7 border border-[#FEFDF8] rounded-sm focus:outline-none col-span-2'
                                value={locality}
                                onChange={updateLocality}
                            />
                            <div className="col-span-2 flex items-center gap-2 pl-1 border border-[#FEFDF8] rounded-sm cursor-pointer">
                                <label className="flex items-center cursor-pointer">
                                    <select
                                        id="propertyfor"
                                        value={propertyFor}
                                        onChange={updatePropertyFor}
                                        className="text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] bg-transparent outline-none h-7"
                                    >
                                        <option className="text-black" value="" disabled>
                                            Property for
                                        </option>
                                        {
                                            allPropertyFor.length > 0 &&
                                            allPropertyFor.map((item, index) => (
                                                <option className="text-black" key={index} value={item.value}>{item.name}</option>
                                            ))

                                        }
                                    </select>
                                </label>
                            </div>
                            <div className="col-span-2 flex items-center gap-2 pl-1 border border-[#FEFDF8] rounded-sm cursor-pointer">
                                <label className="flex items-center cursor-pointer">
                                    <select
                                        id="propertytrype"
                                        value={propertySubtype}
                                        onChange={updatePropertySubtype}
                                        className="text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] bg-transparent outline-none h-7"
                                    >
                                        <option className="text-black" value="" disabled>
                                            Property Type
                                        </option>
                                        {
                                            allPropertySubTypes.length > 0 &&
                                            allPropertySubTypes.map((item, index) => (
                                                <option className="text-black" key={index} value={item.value}>{item.name}</option>
                                            ))

                                        }
                                    </select>
                                </label>
                            </div>
                            {bhkhide &&
                                <div className="w-fit flex items-center gap-2 px-1 border border-[#FEFDF8] rounded-sm cursor-pointer">
                                    <label className="cursor-pointer">
                                        <select
                                            id="bhk"
                                            value={bhk}
                                            onChange={updateBhk}
                                            className="text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] outline-none h-7 bg-transparent"
                                        >
                                            <option className="text-black" value="" disabled>
                                                BHK
                                            </option>
                                            {
                                                allBhk.length > 0 &&
                                                allBhk.map((item, index) => (
                                                    <option className="text-black" key={index} value={item.value}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </label>
                                </div>
                            }
                            <div className="col-span-2 flex items-center gap-2 pl-1 border border-[#FEFDF8] rounded-sm cursor-pointer">
                                <label className="flex items-center cursor-pointer">
                                    <select
                                        id="verificationStatus"
                                        className="text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] outline-none h-7 bg-transparent"
                                    >
                                        <option value="verificationstatus" className="text-black">
                                            Verification Status
                                        </option>
                                        <option className="text-black" value="verified">Verified</option >
                                        <option className="text-black" value="unverified">Unverified</option  >
                                        <option className="text-black" value="pending">Pending</option>
                                    </select>
                                </label>
                            </div>
                            <input
                                type='text'
                                placeholder='Property ID'
                                className='col-span-2 px-2 text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] bg-transparent  h-7 border border-[#FEFDF8] rounded-sm focus:outline-none'
                                value={propertyId}
                                onChange={updatePropertyId}
                            />
                            {filters && (
                                <>
                                    <div className='col-span-3 gap-y-2 flex flex-col w-full'>
                                        <div className='flex flex-row gap-2 '>
                                            <div className=' w-[100%] flex items-center justify-between gap-2'>
                                                <p className='text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700]'>Min: <span className='pl-1'>₹ {formatPrice(priceRange[0])}</span></p>
                                            </div>
                                            <div className=' w-[100%] flex items-center justify-between gap-2'>
                                                <p className='text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700]'>Max: <span className='pl-1'>₹ {formatPrice(priceRange[1])}</span></p>
                                            </div>
                                        </div>
                                        <div className='w-[90%]'>
                                            <RangeSlider
                                                min={0}
                                                max={100000000}
                                                step={10000}
                                                value={priceRange}
                                                onInput={handlePriceRange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {
                                !filters &&
                                <button onClick={updateFilters} className='col-span-2 flex items-center justify-center  rounded-sm  h-7 bg-[#E2EAED] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] text-[#37474F]  px-4  '>
                                    More Filters
                                </button>
                            }
                        </div>
                        {filters && (
                            <>
                                {/* <div className='gap-y-2 flex flex-col w-full sm:w-[70%]'>
                                    <div className='flex flex-row gap-2 '>
                                        <div className=' w-[50%] xs:w-[28%] flex items-center justify-between gap-2'>
                                            <p className='text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700]'>Min: <span className='pl-1'>₹ {formatPrice(priceRange[0])}</span></p>
                                        </div>
                                        <div className=' w-[50%] xs:w-[28%] flex items-center justify-between gap-2'>
                                            <p className='text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700]'>Max: <span className='pl-1'>₹ {formatPrice(priceRange[1])}</span></p>
                                        </div>
                                    </div>
                                    <div className='w-[50%]'>
                                        <RangeSlider
                                            min={0}
                                            max={100000000}
                                            step={10000}
                                            value={priceRange}
                                            onInput={handlePriceRange}

                                        />
                                    </div>
                                </div> */}
                                <div className='grid grid-cols-1 xxm:grid-cols-2 sm:grid-cols-3 pt-2 gap-3'>
                                    {
                                        parseInt(propertyFor) === 1 &&
                                        <label className="flex w-fit items-center cursor-pointer px-2 border border-[#FEFDF8] rounded-sm">
                                            <select
                                                id="occupancy"
                                                className="text-[#FEFDF8] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700]  outline-none h-7 bg-transparent"
                                                value={occupancy}
                                                onChange={updateOccupancy}
                                            >
                                                <option className=" text-black" value="" disabled>
                                                    Occupancy status
                                                </option>
                                                {
                                                    occupancyList.length > 0 &&
                                                    occupancyList.map((item, index) => (
                                                        <option className=" text-black" key={index} value={item.value}>{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </label>
                                    }
                                    <button onClick={handleResetFilters} className=' rounded-sm  h-7 bg-[#E2EAED] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] text-[#37474F] px-4  '>
                                        Reset
                                    </button>
                                    {
                                        filters &&
                                        <button onClick={updateFilters} className='flex items-center justify-center  rounded-sm  h-7 bg-[#53c0ac] text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] text-[#fff]  px-4  '>
                                            Close Filters
                                        </button>
                                    }
                                </div>
                            </>
                        )}
                    </div>
                    <div className='col-span-2 hidden lg:flex'>
                        {/* <Getapp /> */}
                    </div>
                </div>
                <div className='w-full'>
                    <p className='flex items-center justify-start pl-3 h-9 bg-[#FEFDF8] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#1D3A76] font-[700] rounded-md'>
                        Showing {allListings?.length} out of {totalProperties} Properties
                    </p>
                </div>
                <div className='flex flex-col space-y-4 relative'>
                    {allListings.length > 0 ?
                        allListings.map((item, index) => (
                            <Listingcard
                                key={index}
                                unique_property_id={item.unique_property_id}
                                image={item.image}
                                bedrooms={item?.bhk || '-----'}
                                property_for={item.property_for}
                                property_in={item.property_in}
                                property_cost={item?.property_cost || '-----'}
                                monthly_rent={item?.monthly_rent || '----'}
                                furnished_status={item?.furnished_status || '----'}
                                area="160 sq.ft"
                                enquirescount={item?.all_enquires_count || '0'}
                                last_added_date={item?.last_added_date || '-----'}
                                expiry_date={item?.expiry_date || '-----'}
                                facing={item.facing}
                                property_name={item.property_name}
                                property_subtype={item.property_subtype}
                                description={item.description}
                                property_status={item.property_status}
                                openDeleteModal={openDeleteModal}
                            />
                        ))
                        :
                        <div className='flex items-center justify-center h-[200px] bg-white border border-[#D7D8D9] rounded-md'>
                            <p className='text-[#1D3A76] text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[700]'>No Properties Found</p>
                        </div>
                    }
                    {
                        allListings.length > 0 &&
                        <div className='flex items-center justify-end'>
                            <Pagination
                                total={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    }
                    <Loadingoverlay
                        visible={isLoadingEffect}
                        zIndex={9999}
                    />
                </div>
            </div>
        </>
    )
}

export default Propertylists