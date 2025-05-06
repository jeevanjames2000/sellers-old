'use client'
import { IconAsterisk, IconSearch } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation.js';
import Propertyapi from '@/components/api/Propertyapi';
import { useUserDetails } from '@/components/zustand/useUserDetails';
import { toast } from 'react-toastify';
import Errorpanel from '@/components/shared/Errorpanel';
import { Modal, Select } from '@nayeshdaggula/tailify';
import { usePropertyDetails } from '@/components/zustand/usePropertyDetails';
import Generalapi from '@/components/api/Generalapi';
import { Loadingoverlay } from '@/components/tailifycomponents/Loadingoverlay';

function Basicdetailswrapper({ updateActiveTab, unique_property_id, basicDetails, propertyInList, propertyForList, transactionTypeList }) {
    const userInfo = useUserDetails((state) => state.userInfo)
    const access_token = useUserDetails(state => state.access_token);
    let user_id = userInfo?.user_id || null
    let user_type = userInfo?.user_type || null
    const updatePropertyDetails = usePropertyDetails(state => state.updatePropertyDetails)
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isLoadingEffect, setIsLoadingEffect] = useState(false)
    const [errorMessages, setErrorMessages] = useState('')
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const closeErrorModal = () => {
        setErrorModalOpen(false);
    }

    const [propertyType, setPropertyType] = useState('')
    const [propertyTypeError, setPropertyTypeError] = useState('')
    const updatePropertyType = (type) => {
        setPropertyType(type)
        setPropertyTypeError('')
    }
    const [lookingTo, setLookingTo] = useState('')
    const [lookingToError, setLookingToError] = useState('')
    const updateLookingTo = (type) => {
        setTransactionType('')
        setLookingTo(type)
        if (type !== 'Sell') {
            setTransactionType('')
        }
        setLookingToError('')
    }

    const [showDropdown, setShowDropdown] = useState(false);
    const [transactionType, setTransactionType] = useState('')
    const [transactionTypeError, setTransactionTypeError] = useState('')
    const updateTransactionType = (value) => {
        setTransactionType(value)
        setTransactionTypeError('')
    }
    const [location, setLocation] = useState('')
    const [locationError, setLocationError] = useState('')
    const updateLocation = (value) => {
        setLocationError('')
        if (value.length > 2) {
            getPlacesFromGoogle({ input: value })
            setShowDropdown(true)
        } else {
            setAllLocations([])
        }
        if (value === '') {
            setAllLocations([])
            setShowDropdown(false)
        }
        setLocation(value)
    }

    const updateBasicdetails = () => {
        setIsLoadingEffect(true)
        if (propertyType === '') {
            setPropertyTypeError('Please select Property type')
            toast.error('Please select Property type', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setIsLoadingEffect(false)
            return
        }
        if (lookingTo === '') {
            setLookingToError('Please select looking to')
            toast.error('Please select looking to', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setIsLoadingEffect(false)
            return
        }
        if (lookingTo === 1 && transactionType === '') {
            setTransactionTypeError('Please select transaction type')
            toast.error('Please select transaction type', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setIsLoadingEffect(false)
            return
        }
        if (location === '') {
            toast.error('Please Select location', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setLocationError('Please Select location')
            setIsLoadingEffect(false)
            return
        }


        Propertyapi.post('/addbasicdetails', {
            property_in: propertyType,
            property_for: lookingTo,
            transaction_type: transactionType,
            user_id: parseInt(user_id),
            unique_property_id: unique_property_id,
            user_type: user_type,
            google_address: location
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then((response) => {
                let data = response.data
                if (data.status === 'error') {
                    let finalresponse = {
                        'message': data.message,
                        'server_res': data
                    }
                    setErrorMessages(finalresponse);
                    setErrorModalOpen(true);
                    setIsLoadingEffect(false);
                    return false;
                }
                toast.success('basic details added successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                let property_id = data?.property?.unique_property_id
                updateActiveTab('propertydetails', 'inprogress', property_id)
                updatePropertyDetails({
                    property_in: data?.property?.property_in,
                    property_for: data?.property?.property_for,
                    property_sub_type: null
                })
            })
            .catch((error) => {
                console.log(error)
                let finalresponse;
                if (error.response !== undefined) {
                    finalresponse = {
                        'message': error.message,
                        'server_res': error.response.data
                    };
                } else {
                    finalresponse = {
                        'message': error.message,
                        'server_res': null
                    };
                }
                setErrorMessages(finalresponse);
                setErrorModalOpen(true);
                setIsLoadingEffect(false);
                return false;
            })
    }

    useEffect(() => {
        if (basicDetails) {
            setPropertyType(basicDetails?.property_in || '')
            setLookingTo(basicDetails?.property_for || '')
            setTransactionType(basicDetails?.transaction_type || '')
            setLocation(basicDetails?.google_address || '')
        }
    }, [basicDetails])

    const [allLocations, setAllLocations] = useState([])
    function getPlacesFromGoogle({ input }) {
        Generalapi.get('/getgoogleplaces', {
            params: {
                input: input
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                let data = response.data;
                if (data.status === 'error') {
                    let finalresponse = {
                        'message': data.message,
                        'server_res': data
                    }
                    setErrorMessages(finalresponse);
                    setErrorModalOpen(true);
                    return false;
                }
                setAllLocations(data.places);
                return false;
            }).catch((error) => {
                console.log(error)
                let finalresponse;
                if (error.response !== undefined) {
                    finalresponse = {
                        'message': error.message,
                        'server_res': error.response.data
                    };
                } else {
                    finalresponse = {
                        'message': error.message,
                        'server_res': null
                    };
                }
                setErrorMessages(finalresponse);
                setErrorModalOpen(true);
                return false;
            })
    }

    const handleLocationSelect = (locationName) => {
        setLocation(locationName);
        setShowDropdown(false);
    };


    return (
        <>
            <div className='py-2 bg-[#E2EAED]'>
                <p className='text-md md:text-lg font-bold text-[#1D3A76] text-center'>ADD BASIC DETAILS</p>
            </div>
            <div className='relative p-5 sm:p-10 h-[calc(100vh-260px)] sm:h-[calc(100vh-220px)] overflow-y-auto'>
                <>
                    <div className='flex gap-1 mb-4'>
                        <p className='text-[#1D3A76] text-[13px] font-sans font-medium'>Property Type</p>
                        <IconAsterisk size={8} color='#FF0000' />
                    </div>
                    <div className='flex flex-row items-center gap-4 sm:gap-6'>
                        {
                            propertyInList.length > 0 &&
                            propertyInList.map((property, index) => {
                                return (
                                    <div key={index} onClick={() => updatePropertyType(property.value)} className={`group cursor-pointer px-4 py-1 sm:px-8 sm:py-2 rounded-md  ${propertyType === property.value ? 'border border-[#1D3A76] bg-[#1D3A76]' : 'border border-[#909090]  hover:bg-[#1D3A76]'}`}>
                                        <p className={`${propertyType === property.value ? 'text-white text-[10px]' : 'text-[#1D3A76] text-[10px] font-semibold group-hover:text-white'}`}>{property.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {propertyTypeError && <p className='text-red-500 text-[10px] mt-2'>{propertyTypeError}</p>}
                </>
                <>
                    <div className='flex gap-1 mb-4 mt-8'>
                        <p className='text-[#1D3A76] text-[13px] font-sans font-medium'>Looking to</p>
                        <IconAsterisk size={8} color='#FF0000' />
                    </div>
                    <div className='flex flex-row items-center gap-3 sm:gap-6 flex-wrap'>
                        {
                            propertyForList.length > 0 &&
                            propertyForList.map((property, index) => {
                                return (
                                    <div key={index} onClick={() => updateLookingTo(property.value)} className={`group cursor-pointer px-4 py-1 sm:px-8 sm:py-2 rounded-md  ${lookingTo === property.value ? 'border border-[#1D3A76] bg-[#1D3A76]' : 'border border-[#909090]  hover:bg-[#1D3A76]'}`}>
                                        <p className={`${lookingTo === property.value ? 'text-white text-[10px]' : 'text-[#1D3A76] text-[10px] font-semibold group-hover:text-white'}`}>{property.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {lookingToError && <p className='text-red-500 text-[10px] mt-2'>{lookingToError}</p>}
                    {
                        lookingTo === 1 && (
                            <div className='my-5 w-full sm:w-[40%]'>
                                <Select
                                    label=' Transaction Type'
                                    labelClassName='!text-[#1D3A76] text-[13px] font-medium font-sans'
                                    data={transactionTypeList}
                                    searchable
                                    withAsterisk
                                    value={transactionType}
                                    onChange={updateTransactionType}
                                    inputClassName='focus:ring-blue-500 focus:border-blue-500 p-[3px] sm:p-2'
                                    className='!m-0 !p-0'
                                    dropdownClassName='min-h-[100px] max-h-[200px] z-[9999999999] overflow-y-auto'

                                />
                                {transactionTypeError && <p className='text-red-500 text-[10px] mt-2'>{transactionTypeError}</p>}
                            </div>
                        )
                    }
                </>
                <div className='flex flex-row items-center mt-10 sm:mt-16 mb-4 h-2 sm:h-4 '>
                    <div className='bg-[#1D3A76] flex items-center justify-center px-3 rounded-s-lg py-2 '>
                        <IconSearch size={20} color='#fff' />
                    </div>
                    <input
                        type='text'
                        value={location}
                        onChange={(e) => updateLocation(e.target.value)}
                        placeholder='Search location'
                        className='w-full border border-[#1D3A76] rounded-r-md px-3 py-[5px]  focus:outline-none focus:ring-1 focus:ring-[#1D3A76] focus:border-[#1D3A76]'
                    />
                </div>
                {locationError && <p className='text-red-500 text-[10px] mt-2'>{locationError}</p>}
                {
                    showDropdown &&
                    allLocations.length > 0 && (
                        <ul className='w-full bg-white border border-[#1D3A76] rounded-md shadow-lg max-h-48 overflow-auto z-50'>
                            {allLocations.map((loc, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleLocationSelect(loc.value)}
                                    className='px-4 py-2 cursor-pointer hover:bg-[#1D3A76] hover:text-white'
                                >
                                    {loc.label}
                                </li>
                            ))}
                        </ul>
                    )}
                <Loadingoverlay
                    visible={isLoadingEffect}
                />
            </div>
            <div className='flex flex-row justify-end items-center mb-3'>
                <div onClick={updateBasicdetails} className='border border-[#1D3A76] bg-[#1D3A76] px-8 py-2 mr-2 rounded-md cursor-pointer'>
                    <p className='text-white text-[11px] font-bold'>Next: Add Property Details</p>
                </div>
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
        </>
    )
}

export default Basicdetailswrapper