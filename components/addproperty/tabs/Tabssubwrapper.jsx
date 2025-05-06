'use client'
import { IconCheck, IconChevronLeft, IconPhone, IconPointFilled } from '@tabler/icons-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Basicdetailswrapper from './parts/Basicdetailswrapper'
import Addpropertydetails from './parts/Addpropertydetails'
import Addresswrapper from './parts/Addresswrapper'
import Photoswrapper from './parts/Photoswrapper'
import Reviewawrapper from './parts/Reviewawrapper'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Propertyapi from '@/components/api/Propertyapi'
import { useUserDetails } from '@/components/zustand/useUserDetails'
import Link from 'next/link'
import 'swiper/css';
import 'swiper/css/navigation';
import { Modal } from '@nayeshdaggula/tailify'
import Errorpanel from '@/components/shared/Errorpanel'

function Tabssubwrapper({
    propertyInList, propertyForList, transactionTypeList,
    preferedTenantList, bacloniesList, bedroomtypesList,
    businesstypesList, facingList, furnishedtypesList,
    occupancyList, ownershipList, zoneList, areaunitsList
}) {
    const userInfo = useUserDetails(state => state.userInfo);
    const access_token = useUserDetails(state => state.access_token);
    let user_id = userInfo?.user_id || null
    const searchParams = useSearchParams()
    const active_step = searchParams.get('active_step')
    const status = searchParams.get('status')
    const unique_property_id = searchParams.get('unique_property_id') || null
    const router = useRouter()
    const pathname = usePathname();

    const [activeTab, setActiveTab] = useState('basicdetails')
    const updateActiveTab = useCallback((tab, status, propert_id) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("active_step", tab);
        params.set("status", status);
        params.set("unique_property_id", propert_id);

        router.push(`${pathname}?${params.toString()}`);
        setActiveTab(tab)
        if (tab === 'propertydetails') {
            setBasicDetailsStatus('completed')
            setPropertyDetailsStatus(status)
        } else if (tab === 'address') {
            setPropertyDetailsStatus('completed')
            setAddressStatus(status)
        } else if (tab === 'photos') {
            setAddressStatus('completed')
            setPhotosStatus(status)
        } else if (tab === 'review') {
            params.delete("status")
            router.push(`${pathname}?${params.toString()}`);
            setPhotosStatus('completed')
            setReviewsStatus(status)
        }
    }, [router, pathname, activeTab, searchParams])

    const [basicDetailsStatus, setBasicDetailsStatus] = useState('inprogress')
    const [propertyDetailsStatus, setPropertyDetailsStatus] = useState('pending')
    const [addressStatus, setAddressStatus] = useState('pending')
    const [photosStatus, setPhotosStatus] = useState('pending')
    const [reviewsStatus, setReviewsStatus] = useState('pending')

    useEffect(() => {
        if (active_step) {
            setActiveTab(active_step)
        }
        if (active_step === 'basicdetails') {
            getBasicdetails()
            setBasicDetailsStatus(status)
        } else if (active_step === 'propertydetails') {
            getPropertydetails()
            setBasicDetailsStatus('completed')
            setPropertyDetailsStatus(status)
        } else if (active_step === 'address') {
            getAddressdetails()
            setBasicDetailsStatus('completed')
            setPropertyDetailsStatus('completed')
            setAddressStatus(status)
        } else if (active_step === 'photos') {
            setBasicDetailsStatus('completed')
            setAddressStatus('completed')
            setPropertyDetailsStatus('completed')
            setPhotosStatus(status)
        } else if (active_step === 'review') {
            setIsLoadingEffect(true)
            getAllPropertyDetails()
            setBasicDetailsStatus('completed')
            setAddressStatus('completed')
            setPropertyDetailsStatus('completed')
            setPhotosStatus('completed')
            setReviewsStatus(status)
        }

    }, [active_step, status, user_id])

    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const closeErrorModal = () => setErrorModalOpen(false);
    const [errorMessages, setErrorMessages] = useState('');

    const [basicDetails, setBasicDetails] = useState({})
    async function getBasicdetails() {
        Propertyapi.get('/getbasicdetails', {
            params: {
                unique_property_id: unique_property_id,
                user_id: user_id
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then((response) => {
                if (response.data.status === 'error') {
                    let finalResponse = {
                        'message': response.data.message,
                        'server_res': response.data
                    }
                    console.log('finalResponse', finalResponse)
                    setErrorMessages(finalResponse)
                    setErrorModalOpen(true);
                    return false;
                }
                setBasicDetails(response?.data?.property)
            })
            .catch((error) => {
                console.log(error)
                let finalResponse = {
                    'message': error.message,
                }
                setErrorMessages(finalResponse)
                setErrorModalOpen(true);
                return false;
            })
    }

    const [propertyDetails, setPropertyDetails] = useState({})
    async function getPropertydetails() {
        Propertyapi.get('/getpropertydetails', {
            params: {
                unique_property_id: unique_property_id,
                user_id: user_id
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then((response) => {
                if (response.data.status === 'error') {
                    let finalResponse = {
                        'message': response.data.message,
                        'server_res': response.data
                    }
                    console.log('finalResponse', finalResponse)
                    setErrorMessages(finalResponse)
                    setErrorModalOpen(true);
                    return false;
                }
                setPropertyDetails(response?.data?.property)
            })
            .catch((error) => {
                console.log(error)
                let finalResponse = {
                    'message': error.message,
                }
                setErrorMessages(finalResponse)
                setErrorModalOpen(true);
                return false;
            })
    }

    const [addressDetails, setAddressDetails] = useState({})
    async function getAddressdetails() {
        Propertyapi.get('/getaddressdetails', {
            params: {
                unique_property_id: unique_property_id,
                user_id: user_id
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then((response) => {
                if (response.data.status === 'error') {
                    let finalResponse = {
                        'message': response.data.message,
                        'server_res': response.data
                    }
                    console.log('finalResponse', finalResponse)
                    setErrorMessages(finalResponse)
                    setErrorModalOpen(true);
                    return false;
                }
                setAddressDetails(response?.data?.property)
            })
            .catch((error) => {
                console.log(error)
                let finalResponse = {
                    'message': error.message,
                }
                setErrorMessages(finalResponse)
                setErrorModalOpen(true);
                return false;
            })
    }

    const [isLoadingEffect, setIsLoadingEffect] = useState(false)
    const [propertyGallery, setPropertyGallery] = useState([])
    const [allpropertyDetails, setAllPropertyDetails] = useState({})
    async function getAllPropertyDetails() {
        Propertyapi.get('/getsinglepropertydetails', {
            params: {
                unique_property_id: unique_property_id,
                user_id: user_id
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then((response) => {
                setIsLoadingEffect(false)
                if (response.data.status === 'error') {
                    let finalResponse = {
                        'message': response.data.message,
                        'server_res': response.data
                    }
                    console.log('finalResponse', finalResponse)
                    setErrorMessages(finalResponse)
                    setErrorModalOpen(true);
                    return false;
                }
                setAllPropertyDetails(response?.data?.property)
                setPropertyGallery(response?.data?.property?.image || [])
            })
            .catch((error) => {
                setIsLoadingEffect(false)
                console.log(error)
                let finalResponse = {
                    'message': error.message,
                }
                setErrorMessages(finalResponse)
                setErrorModalOpen(true);
                return false;
            })
    }
    let Status;
    if (activeTab === 'basicdetails') {
        Status = 10
    } else if (activeTab === 'propertydetails') {
        Status = 25
    } else if (activeTab === 'address') {
        Status = 50
    } else if (activeTab === 'photos') {
        Status = 75
    } else if (activeTab === 'review') {
        Status = 100
    }


    return (
        <div className='flex flex-col sm:flex-row gap-2 relative'>
            <div className='basis-[25%] bg-white rounded-t-lg hidden sm:block '>
                <div className='flex flex-row justify-center items-center py-3 gap-1 bg-[#E2EAED] '>
                    <IconChevronLeft size={16} color='#1D3A76' />
                    <Link href="/dashboard" className='text-xs text-[#1D3A76] font-medium'>Back to dashboard</Link>
                </div>
                <div className='bg-white px-11 py-2 mb-16'>
                    <p className='text-[#1D3A76] font-semibold text-[14px]'>Post your Property</p>
                    <p className='text-[#1D3A76] text-[11px] font-light'>sell or rent your property </p>

                    <div className="flex items-center space-x-2 my-2">
                        <div className="relative flex-1 bg-[#BACAD5] rounded-full h-1.5">
                            <div className="bg-[#287DB0] h-1.5 rounded-full"
                                style={{ width: `${Status}%`, transition: 'width 0.3s ease-in-out' }}
                            ></div>
                        </div>
                        <p className="text-gray-700 text-sm font-medium">{Status}%</p>
                    </div>

                    {/* tabs */}
                    <div className='my-3'>
                        {
                            activeTab !== 'review' &&
                            <>
                                <div className="flex flex-row items-start gap-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="h-4 w-4 rounded-full border-2 flex items-center justify-center">
                                            {
                                                basicDetailsStatus === 'completed' ? (
                                                    <div className="h-3 w-4 flex flex-row justify-center items-center bg-[#287DB0] rounded-full">
                                                        <IconCheck size={10} color='#fff' />
                                                    </div>
                                                ) : basicDetailsStatus === 'inprogress' ? (
                                                    <div className="h-2 w-2 bg-[#1D3A76] rounded-full"></div>
                                                )
                                                    :
                                                    <div className="h-2 w-2 rounded-full"></div>
                                            }
                                        </div>
                                        <div className="border-l-2 h-10"></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className={`text-[13px] font-bold text-[#1D3A76]`}>Basic Details</p>
                                        <div className="flex flex-row items-center justify-start">
                                            {
                                                basicDetailsStatus === 'completed' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#287DB0" />
                                                        <p className="text-[8px] font-semibold text-[#287DB0]">Completed</p>
                                                    </>
                                                ) : basicDetailsStatus === 'pending' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#1D3A76" />
                                                        <p className="text-[8px] font-semibold text-[#1D3A76]">Pending</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconPointFilled size={16} color="#909090" />
                                                        <p className="text-[8px] font-semibold text-[#909090]">In Progress</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="h-4 w-4 rounded-full border-2 flex items-center justify-center">
                                            {
                                                propertyDetailsStatus === 'completed' ? (
                                                    <div className="h-3 w-4 flex flex-row justify-center items-center bg-[#287DB0] rounded-full">
                                                        <IconCheck size={10} color='#fff' />
                                                    </div>
                                                ) : propertyDetailsStatus === 'inprogress' ? (
                                                    <div className="h-2 w-2 bg-[#1D3A76] rounded-full"></div>
                                                )
                                                    :
                                                    <div className="h-2 w-2 rounded-full"></div>
                                            }
                                        </div>
                                        <div className="border-l-2 h-10"></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className={`text-[13px] font-bold ${activeTab === 'propertydetails' || propertyDetailsStatus === 'completed' ? 'text-[#1D3A76]' : 'text-[#909090]'}`}>Property Details</p>
                                        <div className="flex flex-row items-center justify-start">
                                            {
                                                propertyDetailsStatus === 'completed' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#287DB0" />
                                                        <p className="text-[8px] font-semibold text-[#287DB0]">Completed</p>
                                                    </>
                                                ) : propertyDetailsStatus === 'inprogress' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#1D3A76" />
                                                        <p className="text-[8px] font-semibold text-[#1D3A76]">In Progress</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconPointFilled size={16} color="#909090" />
                                                        <p className="text-[8px] font-semibold text-[#909090]">Pending</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="h-4 w-4 rounded-full border-2 flex items-center justify-center">
                                            {
                                                addressStatus === 'completed' ? (
                                                    <div className="h-3 w-4 flex flex-row justify-center items-center bg-[#287DB0] rounded-full">
                                                        <IconCheck size={10} color='#fff' />
                                                    </div>
                                                ) : addressStatus === 'inprogress' ? (
                                                    <div className="h-2 w-2 bg-[#1D3A76] rounded-full"></div>
                                                )
                                                    :
                                                    <div className="h-2 w-2 rounded-full"></div>
                                            }
                                        </div>
                                        <div className="border-l-2 h-10"></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className={`text-[13px] font-bold ${activeTab === 'address' || addressStatus === 'completed' ? 'text-[#1D3A76]' : 'text-[#909090]'}`}>Address</p>
                                        <div className="flex flex-row items-center justify-center">
                                            {
                                                addressStatus === 'completed' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#287DB0" />
                                                        <p className="text-[8px] font-semibold text-[#287DB0]">Completed</p>
                                                    </>
                                                ) : addressStatus === 'inprogress' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#1D3A76" />
                                                        <p className="text-[8px] font-semibold text-[#1D3A76]">In Progress</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconPointFilled size={16} color="#909090" />
                                                        <p className="text-[8px] font-semibold text-[#909090]">Pending</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="h-4 w-4 rounded-full border-2 flex items-center justify-center">
                                            {
                                                photosStatus === 'completed' ? (
                                                    <div className="h-3 w-4 flex flex-row justify-center items-center bg-[#287DB0] rounded-full">
                                                        <IconCheck size={10} color='#fff' />
                                                    </div>
                                                ) : photosStatus === 'inprogress' ? (
                                                    <div className="h-2 w-2 bg-[#1D3A76] rounded-full"></div>
                                                )
                                                    :
                                                    <div className="h-2 w-2 rounded-full"></div>
                                            }
                                        </div>
                                        <div className="border-l-2 h-10"></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className={`text-[13px] font-bold ${activeTab === 'photos' || photosStatus === 'completed' ? 'text-[#1D3A76]' : 'text-[#909090]'}`}>Photos</p>
                                        <div className="flex flex-row items-center justify-center">
                                            {
                                                photosStatus === 'completed' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#287DB0" />
                                                        <p className="text-[8px] font-semibold text-[#287DB0]">Completed</p>
                                                    </>
                                                ) : photosStatus === 'inprogress' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#1D3A76" />
                                                        <p className="text-[8px] font-semibold text-[#1D3A76]">In Progress</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconPointFilled size={16} color="#909090" />
                                                        <p className="text-[8px] font-semibold text-[#909090]">Pending</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="h-4 w-4 rounded-full border-2 flex items-center justify-center">
                                            {
                                                reviewsStatus === 'completed' ? (
                                                    <div className="h-3 w-4 flex flex-row justify-center items-center bg-[#287DB0] rounded-full">
                                                        <IconCheck size={10} color='#fff' />
                                                    </div>
                                                ) : reviewsStatus === 'inprogress' ? (
                                                    <div className="h-2 w-2 bg-[#1D3A76] rounded-full"></div>
                                                )
                                                    :
                                                    <div className="h-2 w-2 rounded-full"></div>
                                            }
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className={`text-[13px] font-bold ${activeTab === 'review' || reviewsStatus === 'completed' ? 'text-[#1D3A76]' : 'text-[#909090]'}`}>Review</p>
                                        <div className="flex flex-row items-center justify-center">
                                            {
                                                reviewsStatus === 'completed' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#287DB0" />
                                                        <p className="text-[8px] font-semibold text-[#287DB0]">Completed</p>
                                                    </>
                                                ) : reviewsStatus === 'inprogress' ? (
                                                    <>
                                                        <IconPointFilled size={16} color="#1D3A76" />
                                                        <p className="text-[8px] font-semibold text-[#1D3A76]">In Progress</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconPointFilled size={16} color="#909090" />
                                                        <p className="text-[8px] font-semibold text-[#909090]">Pending</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className='px-11 space-y-1 absolute bottom-8 '>
                    <p className='text-[#699BA0] text-xs font-semibold font-sans'>Require Assistance?</p>
                    <div className='flex flex-row items-center gap-1 border-b-2 pb-1 border-[#699BA0]'>
                        <IconPhone size={16} color='#699BA0' />
                        <Link href="tel:9553919919" className='text-[#699BA0] text-xs font-sans'>+91 9553919919</Link>
                    </div>
                </div>
            </div>
            <div className='bg-white px-5 py-1 sm:hidden'>
                <p className='text-[#1D3A76] font-semibold text-[12px]'>Post your Property</p>
                <div className="flex items-center space-x-2 my-1">
                    <div className="relative flex-1 bg-[#BACAD5] rounded-full h-1.5">
                        <div className="bg-[#287DB0] h-1.5 rounded-full"
                            style={{ width: `${Status}%`, transition: 'width 0.3s ease-in-out' }}
                        ></div>
                    </div>
                    <p className="text-gray-700 text-sm font-medium">{Status}%</p>
                </div>
            </div>

            <div className='propertydetails basis-[100%] sm:basis-[75%] lg:basis-[75%] bg-white w-full rounded-t-lg'>
                {
                    activeTab === 'basicdetails' &&
                    <Basicdetailswrapper
                        updateActiveTab={updateActiveTab}
                        basicDetails={basicDetails}
                        unique_property_id={unique_property_id}
                        propertyInList={propertyInList}
                        propertyForList={propertyForList}
                        transactionTypeList={transactionTypeList}
                    />
                }
                {
                    activeTab === 'propertydetails' &&
                    <Addpropertydetails
                        propertyDetails={propertyDetails}
                        updateActiveTab={updateActiveTab}
                        preferedTenantList={preferedTenantList}
                        bacloniesList={bacloniesList}
                        bedroomtypesList={bedroomtypesList}
                        businesstypesList={businesstypesList}
                        facingList={facingList}
                        furnishedtypesList={furnishedtypesList}
                        occupancyList={occupancyList}
                        ownershipList={ownershipList}
                        zoneList={zoneList}
                        areaunitsList={areaunitsList}
                    />
                }
                {
                    activeTab === 'address' &&
                    <Addresswrapper
                        addressDetails={addressDetails}
                        updateActiveTab={updateActiveTab}
                    />
                }
                {
                    activeTab === 'photos' &&
                    <Photoswrapper
                        updateActiveTab={updateActiveTab}
                    />
                }
                {
                    activeTab === 'review' &&
                    <Reviewawrapper
                        allpropertyDetails={allpropertyDetails}
                        propertyGallery={propertyGallery}
                        updateActiveTab={updateActiveTab}
                        isLoadingEffect={isLoadingEffect}
                    />
                }
            </div>

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
        </div>
    )
}

export default Tabssubwrapper
