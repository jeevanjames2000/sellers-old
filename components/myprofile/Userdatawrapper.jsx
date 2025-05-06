'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Myprofilemodal from './Myprofilemodal'
import { Loadingoverlay } from '../tailifycomponents/Loadingoverlay'
import { Modal } from '@nayeshdaggula/tailify'
import Errorpanel from '../shared/Errorpanel'
import my_profile from '@/public/assets/profile_pic.jpg'
import { IconEdit } from '@tabler/icons-react'
import UserprofileModal from './UserprofileModal'
import LoadingOverlay from '../shared/LoadingOverlay'

function Userdatawrapper({ userDetails, isLoadingEffect, errorModalOpen, closeErrorModal, errorMessages, cityList, stateList, refreshUserDetails }) {
    const [userProfileModal, setUserProfileModal] = useState(false)
    const openUserPropfileModal = () => setUserProfileModal(true)
    const closeUserProfileModal = () => setUserProfileModal(false)
    return (
        <>
            <div className='relative items-center justify-center  px-4 md:px-[4vw] lg:px-[6vw] grid grid-cols-12 w-full gap-[2%] py-6 md:py-12'>
                <div className="w-full col-span-12 sm:col-span-3 h-full py-5 space-y-[3px] md:space-y-[6px] bg-[#ffffff] rounded-[8px] flex flex-col items-center justify-center">
                    <div className='relative'>
                        <Image
                            src={userDetails?.photo || my_profile}
                            alt='my_profile'
                            width={100}
                            height={100}
                            className='h-40 w-40 rounded-full border border-[#AEAEAE]/40 object-cover relative'
                        />
                        <button onClick={openUserPropfileModal} className='absolute bottom-2 right-2 border-[#AEAEAE] border-[1px] bg-[#fff] rounded-full p-1 '><IconEdit color='#1D37A6' size={18} /></button>
                    </div>
                    <p className='text-[#252525] pt-2 text-[18px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-bold '>
                        {userDetails?.name || ''}
                    </p>
                    <p className="bg-[#1D3A76] px-4 py-1 text-[#ffffff] text-[12px] md:text-[14px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[400] rounded-[6px]">
                        {userDetails?.user_type || ''}
                    </p>
                </div>
                <div className='flex flex-col md:flex-row pb-6 w-full col-span-12 sm:col-span-9 h-full bg-[#FFF] rounded-[8px] pt-5 px-4 space-y-[6px]'>
                    <div className='flex flex-col space-y-3'>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            Name :<span className='pl-1 text-[#252525]/70 font-[600]' >{userDetails?.name || ''}</span>
                        </p>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            Phone Number :<span className='pl-1 text-[#252525]/70 font-[600]' >{userDetails?.mobile || ''}</span>
                        </p>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            Email Address :<span className='pl-1 text-[#252525]/70 font-[600]'>{userDetails?.email || 'N/A'}</span>
                        </p>
                        <p className=' text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            Address :<span className='inline-block pl-1 text-[#252525]/70 font-[600]'>{userDetails?.address || 'N/A'}</span>
                        </p>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            City :<span className='pl-1 text-[#252525]/70 font-[600]'>{userDetails?.city || 'N/A'}</span>
                        </p>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            State :<span className='pl-1 text-[#252525]/70 font-[600]'>{userDetails?.state || 'N/A'}</span>
                        </p>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            Pin Code :<span className='pl-1 text-[#252525]/70 font-[600]'>{userDetails?.pincode || 'N/A'}</span>
                        </p>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            GST Number :<span className='pl-1 text-[#252525]/70 font-[600]'>{userDetails?.gst_number || 'N/A'}</span>
                        </p>
                        <p className='text-[#1D3A76] font-[600] text-[12px] md:text-[14px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                            RERA Number :<span className='pl-1 text-[#252525]/70 font-[600]'>{userDetails?.rera_number || 'N/A'}</span>
                        </p>
                    </div>
                    <Myprofilemodal
                        cityList={cityList}
                        stateList={stateList}
                        userDetails={userDetails}
                        refreshUserDetails={refreshUserDetails}
                    />
                </div>
                <LoadingOverlay isLoading={isLoadingEffect} />
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
            {
                userProfileModal &&
                <Modal
                    open={userProfileModal}
                    onClose={closeUserProfileModal}
                    size="md"
                    zIndex={999}
                    withCloseButton={false}
                >
                    <UserprofileModal
                        closeUserProfileModal={closeUserProfileModal}
                        refreshUserDetails={refreshUserDetails}
                        userDetails={userDetails}
                    />
                </Modal>
            }
        </>
    )
}

export default Userdatawrapper