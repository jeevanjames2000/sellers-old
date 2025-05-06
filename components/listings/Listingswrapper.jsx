'use client'
import { IconChevronDown, IconCircle, IconFilter, IconMenu2, IconTrash, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import listingApi from '../api/listingApi';
import { useUserDetails } from '../zustand/useUserDetails';
import { Modal } from '@nayeshdaggula/tailify';
import Propertylists from './parts/Propertylists';
import Propertyapi from '../api/Propertyapi';
import Errorpanel from '../shared/Errorpanel';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function Listingswrapper({ occupancyList }) {
    const userInfo = useUserDetails((state) => state.userInfo)
    const user_id = userInfo?.user_id;
    const access_token = useUserDetails(state => state.access_token);

    const [propertyIn, setPropertyIn] = useState("Residential");
    const updatePropertyIn = (value) => {
        setPropertyIn(value)
        setPropertySubtype('')
        setLocality('')
        if (value === "Commercial") {
            setBhkhide(false)
            setBhk('')
        } else {
            setBhkhide(true)
            setBhk('')
        }
        setPage(1)
        setLimit(10)
        setPropertySubtype('')
        setLocality('')
        setBhkhide(true)
        setBhk('')
        setPropertyFor('')
        setOccupancy('')
        setPropertyId('')
        setPriceRange([0, 100000000])
    }
    
    const [bhkhide, setBhkhide] = useState(true)
    const [propertySubtype, setPropertySubtype] = useState('')
    const updatePropertySubtype = (e) => {
        let value = e.currentTarget.value
        setPropertySubtype(value)
        if (value === 4 || value === 5) {
            setBhkhide(false)
            setBhk('')
        } else {
            setBhkhide(true)
            setBhk('')
        }
    }

    const [locality, setLocality] = useState('')
    const updateLocality = (e) => {
        setLocality(e.currentTarget.value)
    }

    const [propertyFor, setPropertyFor] = useState('')
    const updatePropertyFor = (e) => {
        setPropertyFor(e.currentTarget.value)
        setOccupancy('')
    }

    const [bhk, setBhk] = useState('')
    const updateBhk = (e) => {
        setBhk(e.currentTarget.value)
    }

    const [occupancy, setOccupancy] = useState('')
    const updateOccupancy = (e) => {
        setOccupancy(e.currentTarget.value)
    }

    const [propertyId, setPropertyId] = useState('')
    const updatePropertyId = (e) => {
        setPropertyId(e.currentTarget.value)
    }

    const [priceRange, setPriceRange] = useState([0, 100000000]);
    const handlePriceRange = (value) => {
        setPriceRange(value);
    }

    const [isOpen, setIsOpen] = useState({
        buy: false,
        rent: false,
        pg: false,
    });

    const toggleAccordion = (key) => {
        setIsOpen((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const [isLoadingEffect, setIsLoadingEffect] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const closeErrorModal = () => {
        setErrorModalOpen(false);
    }

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProperties, setTotalProperties] = useState(0);
    const [allListings, setAllListings] = useState([]);
    async function getAllListingsData(newPage, newLimit, newSearchQuery, newPropertyIn, newPropertySubtype, newPropertyFor, newBhk, newOccupancy, newPropertyId, priceRange) {
        listingApi.get('/getalllistings', {
            params: {
                user_id: user_id,
                page: newPage,
                limit: newLimit,
                searchQuery: newSearchQuery,
                property_in: newPropertyIn,
                property_subtype: newPropertySubtype,
                property_for: newPropertyFor,
                bedrooms: newBhk,
                occupancy: newOccupancy,
                unique_property_id: newPropertyId,
                min_price_range: priceRange[0] === 0 ? null : priceRange[0],
                max_price_range: priceRange[1]
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        })
            .then((response) => {
                setIsLoadingEffect(false);
                let data = response.data
                if (data.status === 'error') {
                    let finalresponse = {
                        'message': data.message,
                    }
                    setErrorMessages(finalresponse);
                    setErrorModalOpen(true);
                    return false;
                }
                setAllListings(data?.propertyLists || []);
                setTotalProperties(data?.total_property_lists_count || 0);
                setTotalPages(data?.totalpages || 0);
            }
            )
            .catch((error) => {
                setIsLoadingEffect(false);
                let finalresponse = {
                    'message': error.message,
                }
                console.log('error', error)
                setErrorMessages(finalresponse);
                setErrorModalOpen(true);
            });
    }

    useEffect(() => {
        setIsLoadingEffect(true);
        getAllListingsData(page, limit, locality, propertyIn, propertySubtype, propertyFor, bhk, occupancy, propertyId, priceRange);
        if (user_id) {
            getPropertiesCount();
        }
    }, [user_id, propertyIn, locality, propertySubtype, propertyFor, bhk, occupancy, propertyId, priceRange])

    const handlePageChange = (page) => {
        setPage(page);
        setIsLoadingEffect(true);
        getAllListingsData(page, limit, locality, propertyIn, propertySubtype, propertyFor, bhk, occupancy, propertyId, priceRange);
    };

    const [propertiesCount, setPropertiesCount] = useState({});
    const getPropertiesCount = () => {
        listingApi.get('/propertiesCount', {
            params: {
                user_id: user_id
            },
        })
            .then((response) => {
                let data = response.data
                if (data.status === 'error') {
                    let finalresponse = {
                        'message': data.message,
                    }
                    setErrorMessages(finalresponse);
                    setErrorModalOpen(true);
                    return false;
                }
                setPropertiesCount(data?.propertiesCount || {});
            }
            )
            .catch((error) => {
                let finalresponse = {
                    'message': error.message,
                }
                setErrorMessages(finalresponse);
                setErrorModalOpen(true);
            });
    }

    const refreshListings = () => {
        setIsLoadingEffect(true);
        getAllListingsData(page, limit, locality, propertyIn, propertySubtype, propertyFor, bhk, occupancy, propertyId, priceRange);
    }

    const handleResetFilters = () => {
        setPropertyIn("Residential")
        setPropertySubtype('')
        setLocality('')
        setBhkhide(true)
        setBhk('')
        setPropertyFor('')
        setOccupancy('')
        setPropertyId('')
        setPriceRange([0, 100000000])
    }

    const [deleteModal, setDeleteModal] = useState(false);
    const [singlePropertyId, setSinglePropertyId] = useState(null)
    const openDeleteModal = useCallback((propertyid) => {
        setSinglePropertyId(propertyid);
        setDeleteModal(true);
    }, [])

    const closeDeleteModal = () => {
        setDeleteModal(false);
        setSinglePropertyId(null);
    }

    const handleDeleteProperty = (unique_property_id) => {
        setIsLoadingEffect(true);
        Propertyapi.post(`/deleteProperty`, {
            user_id,
            unique_property_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
            })
            .then((response) => {
                setIsLoadingEffect(false);
                let data = response.data
                if (data.status === 'error') {
                    let finalresponse = {
                        'message': data.message,
                        'server_res': data
                    }
                    setErrorMessages(finalresponse);
                    setErrorModalOpen(true);
                    return false;
                }
                setDeleteModal(false)
                toast.success('Property deleted successfully')
                refreshListings()
                getPropertiesCount()
            }
            )
            .catch((error) => {
                setIsLoadingEffect(false);
                let finalresponse = {
                    'message': error.message,
                }
                setErrorMessages(finalresponse);
                setErrorModalOpen(true);
            });
    }

    const [isShowCategoryFilter, setIsShowCategoryFilter] = useState(false);
    const openCategoryFilter = () => {
        setIsShowCategoryFilter(!isShowCategoryFilter);
    }
    const closeCategoryFilter = () => {
        setIsShowCategoryFilter(false);
    }

    return (
        <>
            <div className={`px-4 md:px-[4vw] lg:px-[6vw] w-full my-5 md:my-16 flex flex-col md:flex-row gap-4 lg:gap-8 ${isShowCategoryFilter ? 'overflow-hidden h-[calc(100vh-120px)] md:overflow-auto' : 'overflow-auto'}`}>
                {/* 20% Width Div */}
                <div className={`${isShowCategoryFilter ? 'absolute w-full h-full bg-black/20 z-50 bottom-0 right-0' : 'hidden'} md:flex md:relative md:w-[25%] lg:w-[18%] h-fit md:bg-transparent`}>
                    <div className={`${isShowCategoryFilter ? 'flex absolute right-0 bottom-0 w-full z-50 max-h-[80%] md:max-h-full overflow-y-auto' : 'hidden'} md:flex md:relative w-full md:h-fit bg-[#FFFFFF] p-3 flex-col space-y-2 md:rounded-md`}>
                        <div className="flex justify-between items-center">
                            <p className="text-[#240000] text-[11px] xs:text-[13px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600]">Show</p>
                            <IconX size={20} onClick={closeCategoryFilter} className='md:hidden' />
                        </div>
                        <div className="flex flex-col mx-auto w-full border-b border-[#D7D8D9] pb-4">
                            <label className="w-full group relative flex cursor-pointer rounded-sm py-2 text-[#1b1b1b] transition focus:outline-none">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Residential"
                                    checked={propertyIn === "Residential"}
                                    onChange={() => updatePropertyIn("Residential")}
                                    className="hidden"
                                />
                                <div className="flex w-full items-center gap-2">
                                    {propertyIn === "Residential" ? (
                                        <IconCircle size={16} className="bg-[#1D3A76] text-white rounded-full" />
                                    ) : (
                                        <IconCircle size={16} color="#b9b9b9" />
                                    )}
                                    <p className={`text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[500] ${propertyIn === "Residential" ? "text-[#1D3A76]" : "text-[#969595]"}`}>
                                        Residential  Properties
                                    </p>
                                </div>
                            </label>
                            <label className="w-full group relative flex cursor-pointer rounded-sm text-[#1b1b1b] transition focus:outline-none">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Commercial"
                                    checked={propertyIn === "Commercial"}
                                    onChange={() => updatePropertyIn("Commercial")}
                                    className="hidden"
                                />
                                <div className="flex w-full items-center gap-2">
                                    {propertyIn === "Commercial" ? (
                                        <IconCircle size={16} className="bg-[#1D3A76] text-white rounded-full " />
                                    ) : (
                                        <IconCircle size={16} color="#b9b9b9" />
                                    )}
                                    <p
                                        className={`text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[500] ${propertyIn === "Commercial"
                                            ? "text-[#1D3A76]"
                                            : "text-[#969595]"
                                            }`}
                                    >
                                        Commercial properties
                                    </p>
                                </div>
                            </label>
                        </div>
                        <p className="text-[#240000] text-[11px] xs:text-[13px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[500] pt-2">Sub - Category</p>
                        <div>
                            <div
                                className={`flex items-center justify-between cursor-pointer h-7 px-1 ${isOpen.buy
                                    ? "bg-[#E2EAED] text-[#1D3A76] border-b-0"
                                    : "text-[#969595] border-b border-[#D7D8D9]"
                                    }`}
                                onClick={() => toggleAccordion("buy")}
                            >
                                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold">Buy</p>
                                <div className="flex flex-row gap-14">
                                    <p className="font-bold text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px]">({propertiesCount?.properties_for_sell})</p>
                                    <IconChevronDown
                                        stroke={1.5}
                                        size={16}
                                        color='#1D3A76'
                                    />
                                </div>
                            </div>
                            {isOpen.buy && (
                                <div className="mt-2 flex flex-col gap-2 pl-3 pb-2">
                                    {/* <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Apartment({propertiesCount?.apartments})
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Independent House({propertiesCount?.independent_house})
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Villa({propertiesCount?.independent_villa})
                                    </Link> */}
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Reported (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Active (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Expired (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Rejected (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Deleted (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Expiring Soon (0)
                                    </Link>
                                </div>
                            )}

                            <div
                                className={`flex items-center justify-between cursor-pointer h-7 px-1 mt-1 ${isOpen.rent
                                    ? "bg-[#E2EAED] text-[#1D3A76] border-b-0"
                                    : "text-[#969595] border-b border-[#D7D8D9]"
                                    }`}
                                onClick={() => toggleAccordion("rent")}
                            >
                                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold">Rent</p>
                                <div className="flex flex-row gap-14">
                                    <p className="font-bold text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px]">({propertiesCount?.properties_for_rent})</p>
                                    <IconChevronDown
                                        stroke={1.5}
                                        size={16}
                                        color='#1D3A76'
                                    />
                                </div>
                            </div>
                            {isOpen.rent && (
                                <div className="mt-2 flex flex-col gap-2 pl-3 pb-2">
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Reported (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Active (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Expired (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Rejected (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Deleted (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Expiring Soon (0)
                                    </Link>
                                </div>
                            )}

                            <div
                                className={`flex items-center justify-between cursor-pointer h-7 px-1 mt-1 ${isOpen.pg
                                    ? "bg-[#E2EAED] text-[#1D3A76] border-b-0"
                                    : "text-[#969595] border-b border-[#D7D8D9]"
                                    }`}
                                onClick={() => toggleAccordion("pg")}
                            >
                                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold">PG</p>
                                <div className="flex flex-row gap-14">
                                    <p className="font-bold text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px]">({propertiesCount?.properties_for_pg})</p>
                                    <IconChevronDown
                                        stroke={1.5}
                                        size={16}
                                        color='#1D3A76'
                                    />
                                </div>
                            </div>
                            {isOpen.pg && (
                                <div className="mt-2 flex flex-col gap-2 pl-3 pb-3">
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        All(0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Reported (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Active (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Expired (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Rejected (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Deleted (0)
                                    </Link>
                                    <Link href="#" className="text-gray-400 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] hover:text-[#1D3A76]">
                                        Under Review (0)
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* 80% Width Div */}
                <Propertylists
                    totalPages={totalPages}
                    totalProperties={totalProperties}
                    allListings={allListings}
                    handlePageChange={handlePageChange}
                    limit={limit}
                    isLoadingEffect={isLoadingEffect}
                    openDeleteModal={openDeleteModal}
                    propertyIn={propertyIn}
                    propertySubtype={propertySubtype}
                    updatePropertySubtype={updatePropertySubtype}
                    locality={locality}
                    updateLocality={updateLocality}
                    bhkhide={bhkhide}
                    bhk={bhk}
                    updateBhk={updateBhk}
                    propertyFor={propertyFor}
                    updatePropertyFor={updatePropertyFor}
                    occupancyList={occupancyList}
                    occupancy={occupancy}
                    updateOccupancy={updateOccupancy}
                    propertyId={propertyId}
                    updatePropertyId={updatePropertyId}
                    handleResetFilters={handleResetFilters}
                    priceRange={priceRange}
                    handlePriceRange={handlePriceRange}
                />
            </div >
            {errorModalOpen &&
                <Modal
                    open={errorModalOpen}
                    onClose={closeErrorModal}
                    size="md"
                    zIndex={9999}
                >
                    <Errorpanel
                        errorMessages={errorMessages}
                        close={closeErrorModal}
                    />
                </Modal>
            }
            {
                deleteModal &&
                <Modal
                    open={deleteModal}
                    onClose={closeDeleteModal}
                    size="md"
                    zIndex={9999}
                    withCloseButton={false}
                >
                    <div className="flex flex-col items-center justify-center gap-2 p-4">
                        <IconTrash size={40} stroke={1.5} color="#1D3A76" />
                        <p className="text-[#706e6e] text-[14px] font-[600]">Are you sure you want to delete this Property {singlePropertyId}?</p>
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => handleDeleteProperty(singlePropertyId)} className="py-2 px-4 bg-[#038AC9] text-white font-[700] text-[14px] rounded-lg">Yes, I'm sure</button>
                            <button onClick={closeDeleteModal} className="py-2 px-4 bg-[#A5413F] text-white font-[700] text-[14px] rounded-lg">No, Cancel</button>
                        </div>
                    </div>
                </Modal>
            }
            <div className='fixed bottom-5 right-5 bg-[#31539A] p-1 rounded-full md:hidden justify-end z-50'>
                <IconFilter size={20} color='#FEFDF8' onClick={openCategoryFilter} />
            </div>

        </>
    );
}

export default Listingswrapper;
