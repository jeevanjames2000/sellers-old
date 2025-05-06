'use client'
import React, { useEffect, useState } from 'react'
import Propertybanner from './Propertybanner'
import Propertyamenities from './Propertyamenities'
import Propertfloorplan from './Propertfloorplan'
import Propertylocation from './Propertylocation'
import Propertyoverview from './Propertyoverview'
import PropertySpecifications from './PropertySpecifications'
import listing_3 from '@/public/assets/listings_3.png'
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from '@nayeshdaggula/tailify'
import GoogleMapView from '@/components/shared/GoogleMapView'
import { useUserDetails } from '@/components/zustand/useUserDetails';
import { useRouter } from 'next/navigation'
import listingApi from '@/components/api/listingApi'
import Errorpanel from '@/components/shared/Errorpanel'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import placeholderimage from '@/public/assets/imgeplaceholder.jpg'

function Propertydetailswrapper({ propertyDetails }) {
    const userInfo = useUserDetails((state) => state.userInfo)
    const user_id = userInfo?.user_id;
    const access_token = useUserDetails(state => state.access_token);

    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    const images = propertyDetails?.image || [];

    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const closeErrorModal = () => setErrorModalOpen(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [isLoadingEffect, setIsLoadingEffect] = useState(false);

    const [propertyList, setPropertyList] = useState([]);
    async function getPropertyList() {
        listingApi.get('getpropertydetails', {
            params: {
                user_id: user_id,
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
                    // toast.error(finalresponse.message);
                    return false;
                }
                // setPropertyList(data?.propertiesData || []);
                // set only two properties
                setPropertyList(data?.propertiesData.slice(0, 2) || []);
            }
            )
            .catch((error) => {
                setIsLoadingEffect(false);
                let finalresponse = {
                    'message': error.message,
                }
                // toast.error(finalresponse.message);
                setErrorMessages(finalresponse);
                setErrorModalOpen(true);
            });
    }

    useEffect(() => {
        setIsLoadingEffect(true);
        getPropertyList();
    }, [user_id])

    const [blobUrl, setBlobUrl] = useState(null);
    useEffect(() => {
        const fetchVideo = async () => {
            if (!propertyDetails?.videos || propertyDetails?.videos.length === 0) return;

            let videoUrl = propertyDetails.videos[0]; // Define the variable properly
            try {
                const response = await fetch(videoUrl);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const blob = await response.blob();
                setBlobUrl(URL.createObjectURL(blob));
            } catch (error) {
                console.error('Error loading video:', error);
            }
        };

        fetchVideo(); // Call function immediately
    }, [propertyDetails]);

    return (
        <>
            <div className='flex flex-col lg:flex-row bg-[#ffffffe6] px-4 md:px-[4vw] lg:px-[6vw] py-6 gap-3 lg:gap-6'>
                <div className="w-full lg:w-[68%] space-y-14">
                    <Propertybanner
                        propertyDetails={propertyDetails}
                    />
                    <Propertfloorplan
                        propertyDetails={propertyDetails}
                    />
                    <Propertyamenities
                        propertyDetails={propertyDetails}
                    />
                    <Propertylocation
                        propertyDetails={propertyDetails}
                    />
                    <Propertyoverview
                        propertyDetails={propertyDetails}
                    />
                    {/* <PropertySpecifications
                        propertyDetails={propertyDetails}
                    /> */}
                    <div>
                        <p className="text-[#1d3a76] text-[22px] xs:text-[25px] 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-[600] mb-3">EXPLORE - MAP view</p>
                        <GoogleMapView
                            propertiesData={propertyDetails}
                        />
                    </div>
                </div>
                <div className='w-full lg:w-[25%] lg:fixed lg:right-3 p-2 bg-white h-fit shadow-[0_0px_10px_0px_rgba(0,0,0,0.2)] rounded-lg space-y-4'>
                    {/* {propertyDetails?.videos[0] ?
                        <video
                            src={propertyDetails?.videos[0]}
                            className="w-full h-40 object-cover rounded"
                            controls
                        />
                        :
                        <p className='text-[#1d3a76] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold text-center pt-4'>No Video Available</p>
                    } */}
                    {blobUrl ? (
                        <video src={blobUrl} controls className="w-full h-40 object-cover rounded" />
                    ) : (
                        <p className='text-[#1d3a76] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold text-center pt-4'>
                            No Video Available
                        </p>
                    )}
                    <div className='flex gap-2'>
                        {images?.slice(0, 2).map((img, index) => (
                            <Image
                                key={index}
                                src={img || placeholderimage}
                                alt={`Property image ${index + 1}`}
                                className='rounded-lg'
                                width={100}
                                height={100}
                                style={{ height: '100px' }}
                            />
                        ))}
                        {images.length > 2 && (
                            <button onClick={openModal} className='cursor-pointer flex flex-col justify-center items-center gap-2 bg-[#00000033] p-2 text-[#ffffff] font-bold text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px]'>
                                +{images.length - 2} More Pics
                            </button>
                        )}
                    </div>
                    <div className='bg-[#F0F0F0] p-3 relative'>
                        <p className='font-sans font-semibold text-[#434343] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px]'>More Properties by <span className='text-[#1d3a76] font-bold'>{userInfo?.name}</span></p>
                        <div className='flex flex-col md:flex-row items-center justify-center gap-3 mt-2'>
                            {
                                propertyList.length !== 0 ?
                                    propertyList.map((item, index) => (
                                        <div key={index} className='flex flex-row border border-[#1d3a76] h-auto w-full rounded-md overflow-hidden'>
                                            <Image
                                                src={item?.image || placeholderimage}
                                                alt='property owner'
                                                className='h-[100%] w-[60%] object-fit'
                                                width={100}
                                                height={100}
                                            />
                                            <div className='w-[40%] flex flex-col justify-center items-center gap-[2px]'>
                                                {
                                                    item.property_for === 'Sell' ?
                                                        <p className='text-[#1d3a76] font-bold text-[12px] lg:text-[7px] 2xl:text-[10px] 3xl:text-[12px] 4xl:text-[14px]'>₹ {item.property_cost}</p>
                                                        :
                                                        <p className='text-[#1d3a76] font-bold text-[12px] lg:text-[7px] 2xl:text-[10px] 3xl:text-[12px] 4xl:text-[14px]'>₹ {item.monthly_rent}</p>
                                                }
                                                <p className='text-[#1d3a76] font-bold text-[12px] lg:text-[7px] 2xl:text-[10px] 3xl:text-[12px] 4xl:text-[14px]'>{item.bhk ? `${item.bhk} BHK` : ''}</p>
                                                <p className='text-[#1d3a76] font-bold text-[12px] lg:text-[7px] 2xl:text-[10px] 3xl:text-[12px] 4xl:text-[14px]'>{item.builtup_area} sq.ft</p>
                                            </div>
                                        </div>
                                    )
                                    )
                                    :
                                    <div className=' mt-3 flex items-center justify-center h-[100px] bg-white border border-[#D7D8D9] rounded-md p-2'>
                                        <p className='text-[#1D3A76] text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[700]'>No Properties Found</p>
                                    </div>
                            }
                            <Link href="/listings" className='text-[#00609E] text-[10px] xs:text-[10px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-center font-semibold'>See all Properties</Link>
                        </div>
                        <LoadingOverlay isLoading={isLoadingEffect} />
                    </div>
                </div>
            </div>
            <Modal
                open={modal}
                onClose={closeModal}
                size="md"
                zIndex={9999}
            >
                <div className='w-full overflow-y-auto pr-3 h-[calc(100vh-280px)] sm:h-[calc(100vh-220px)]'>
                    <div className='grid grid-cols-3 gap-2'>
                        {images?.slice(2).map((img, index) => (
                            <Image
                                key={index}
                                src={img || placeholderimage}
                                alt={`Modal property image ${index + 1}`}
                                className='rounded-lg'
                                width={150}
                                height={150}
                                style={{ height: '100px' }}
                            />
                        ))}
                    </div>
                </div>
            </Modal>
            {
                errorModalOpen &&
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

export default Propertydetailswrapper