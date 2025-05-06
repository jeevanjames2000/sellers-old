'use client'
import React, { useEffect, useState } from 'react'
import Myenquirestab from './tabs/Myenquirestab'
import Matchingtenanttab from './tabs/Matchingtenanttab'
import Getgauranteedenquiries from './Getgauranteedenquiries'
import Enquiresapi from '../api/Enquiresapi'
import { useUserDetails } from '../zustand/useUserDetails'
import { Modal } from '@nayeshdaggula/tailify'
import Errorpanel from '../shared/Errorpanel'
import { usePathname, useSearchParams } from 'next/navigation'
function Enquirestabswrapper({ unique_property_id }) {
    const userInfo = useUserDetails((state) => state.userInfo)
    const user_id = userInfo?.user_id;
    const access_token = useUserDetails(state => state.access_token);

    // const searchParams = useSearchParams();
    // const params = new URLSearchParams(searchParams.toString());
    // const [unique_property_id, setUnique_property_id] = useState(null);

    // useEffect(() => {
    //     if (params.has('unique_property_id')) {
    //         setUnique_property_id(params.get('unique_property_id'));
    //     } else {
    //         setUnique_property_id(null);
    //     }
    // }, [searchParams]);

    const [activeTab, setActivetab] = useState('myenquires')
    const updateActiveTab = (value) => {
        setActivetab(value)
    }

    const [isLoadingEffect, setIsLoadingEffect] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const closeErrorModal = () => {
        setErrorModalOpen(false);
    }

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEnquires, setTotalEnquires] = useState(0);
    const [allEnquires, setAllEnquires] = useState([]);
    async function getAllEnquires(newPage, newLimit, unique_property_id) {
        Enquiresapi.get('/getallenquires', {
            params: {
                user_id: user_id,
                page: newPage,
                limit: newLimit,
                unique_property_id: unique_property_id || null
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
                    console.log('finalresponse', finalresponse)
                    setErrorMessages(finalresponse);
                    setErrorModalOpen(true);
                    return false;
                }
                setAllEnquires(data?.allEnquires || []);
                setTotalEnquires(data?.totalCount || 0);
                setTotalPages(data?.totalPages || 0);
            })
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

    const handlePageChange = (value) => {
        setPage(value);
        setIsLoadingEffect(true);
        getAllEnquires(value, limit, unique_property_id);
    };

    useEffect(() => {
        setIsLoadingEffect(true);
        getAllEnquires(page, limit, unique_property_id);
    }, [page, limit, unique_property_id])

    return (
        <div className='w-full gap-1 grid grid-cols-12'>
            <div className="w-full col-span-12 sm:col-span-2 bg-[#ffffff] h-full sm:h-96 rounded-[8px] py-5 sm:py-10 space-y-[6px]">
                <div onClick={() => updateActiveTab('myenquires')}
                    className={`cursor-pointer flex items-center justify-start px-2 py-2 text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[600] text-[#1D3A76] ${activeTab === 'myenquires' && 'bg-[#E2EAED]'}`}
                >
                    My Enquiries {`(${totalEnquires || 0})`}
                </div>
                <div onClick={() => updateActiveTab('matchingtenants')}
                    className={` cursor-pointer flex items-center justify-start px-2 py-2 pr-2 text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[600] text-[#1D3A76]
                      ${activeTab === 'matchingtenants' && 'bg-[#E2EAED]'}`}>
                    Matching Tenants(0)
                </div>
            </div>
            <div className="col-span-12 sm:col-span-10 space-y-4 mt-5 sm:mt-0 mb-5 sm:mx-6">

                <p className="flex items-center justify-start px-5 py-[10px] text-[12px] xs:text-[14px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[24px] text-[#ffffff] font-[700] bg-[#31539A] rounded-md">
                    Enquiries
                </p>
                {
                    activeTab === 'myenquires' &&
                    <>
                        <Myenquirestab
                            allEnquires={allEnquires}
                            handlePageChange={handlePageChange}
                            isLoadingEffect={isLoadingEffect}
                            totalPages={totalPages}
                            totalEnquires={totalEnquires}
                        />
                    </>
                }
                {
                    activeTab === 'matchingtenants' &&
                    <Matchingtenanttab />
                }
                <Getgauranteedenquiries />
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

export default Enquirestabswrapper