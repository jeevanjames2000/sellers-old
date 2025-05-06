import React, { useCallback, useEffect, useState } from 'react'
import { IconDownload } from '@tabler/icons-react';
import Enquirycard from '../Enquirycard';
import { Loadingoverlay, Modal } from '@nayeshdaggula/tailify';
import Pagination from '@/components/tailifycomponents/Pagination';
import EnquiryModal from '../EnquiryModal';
import LoadingOverlay from '@/components/shared/LoadingOverlay';
function Myenquirestab({ allEnquires, handlePageChange, isLoadingEffect, totalPages, totalEnquires }) {

    const [enquiryModal, setEnquiryModal] = useState(false);
    const [enquiryModalId, setEnquiryModalId] = useState(null);
    const openEnquiryModal = useCallback((enquiry_id) => {
        setEnquiryModal(true);
        setEnquiryModalId(enquiry_id);
        console.log('open enquiry modal', enquiry_id)
    }, [])

    const closeEnquiryModal = () => {
        setEnquiryModalId(null);
        setEnquiryModal(false);
    }

    const [singleEnquiry, setSingleEnquiry] = useState(null);
    useEffect(() => {
        if (enquiryModalId !== null) {
            setSingleEnquiry(allEnquires[enquiryModalId]);
        }
    }, [enquiryModalId]);

    return (
        <>
            <div className="flex items-center justify-between sm:px-5">
                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] text-[#252525] font-[600]">
                    Displaying {allEnquires?.length} out of {totalEnquires} Enquiries
                </p>
                <button
                    className="flex items-center text-[#252525] border-[0.09rem] border-[#B5B5B5] rounded-full py-[3px] px-2 text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-semibold focus:outline-none bg-transparent hover:bg-[#1D3A76] hover:text-white"
                >
                    Download
                    <IconDownload stroke={2} className="ml-2 w-3 h-3 2xl:h-4 2xl:w-4 3xl:h-5 3xl:w-5 4xl:w-6 4xl:h-6" />
                </button>
            </div>
            <div className='relative flex flex-col gap-2'>
                {allEnquires.length !== 0 ?
                    allEnquires.map((item, index) => (
                        <div onClick={() => openEnquiryModal(index)} className="cursor-pointer" key={`enquiry-${index}${item.id}`}>
                            <Enquirycard
                                key={`enquiry-${index}${item.id}`}
                                property_id={index}
                                enquiry_from={item?.enquiry_from}
                                image={item?.property_details?.image}
                                property_name={item?.property_details?.property_name}
                                unique_property_id={item?.property_details?.unique_property_id}
                                property_in={item?.property_details?.property_in}
                                property_for={item?.property_details?.property_for}
                                sub_type={item?.property_details?.sub_type}
                                google_address={item?.property_details?.google_address}
                                builtup_area={item?.property_details?.builtup_area}
                                length_area={item?.property_details?.length_area}
                                widt_area={item?.property_details?.widt_area}
                                property_cost={item?.property_details?.property_cost}
                                monthly_rent={item?.property_details?.monthly_rent}
                                area_units={item?.property_details?.area_units}
                                user_name={item?.name}
                                user_email={item?.email}
                                user_mobile={item?.mobile}
                            />
                        </div>
                    ))
                    :
                    <div className='flex items-center justify-center h-[200px] bg-white border border-[#D7D8D9] rounded-md'>
                        <p className='text-[#1D3A76] text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[700]'>No Enquires Found</p>
                    </div>
                }

                {
                    allEnquires.length > 0 &&
                    <div className='flex items-center justify-end'>
                        <Pagination
                            total={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                }
                <LoadingOverlay
                    isLoading={isLoadingEffect}
                    zIndex={9999}
                    overlayBg="rgba(255, 255, 255, 0.6)"
                />
            </div>
            {
                (enquiryModal) &&
                <Modal
                    open={enquiryModal}
                    onClose={closeEnquiryModal}
                    size="lg"
                    zIndex={9999}
                    withCloseButton={false}
                >
                    <EnquiryModal
                        singleEnquiry={singleEnquiry}
                        closeEnquiryModal={closeEnquiryModal}
                    />

                </Modal>
            }

        </>
    )
}

export default Myenquirestab