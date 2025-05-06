'use client'
import { Modal } from '@nayeshdaggula/tailify';
import { IconEdit } from '@tabler/icons-react';
import React, { useState } from 'react'
import Edituserdetails from './Edituserdetails';
function Myprofilemodal({ cityList, stateList, userDetails, refreshUserDetails }) {
    const [userEditModal, setUserEditModal] = useState(false);
    const openUsereditModal = () => setUserEditModal(true);
    const closeUserEditModal = () => setUserEditModal(false);

    return (
        <>
            <button
                onClick={openUsereditModal}
                className="text-[#ffffff] text-[12px] md:text-[14px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[400] cursor-pointer h-fit flex ml-auto px-3 py-1 items-center justify-center bg-[#1D3A76] rounded-md gap-1">
                Update profile <IconEdit size={18} color='#ffffff' stroke={1.5} />
            </button>
            {userEditModal && (
                <Modal
                    open={userEditModal}
                    onClose={closeUserEditModal}
                    size="md"
                    zIndex={9999}
                >
                    <Edituserdetails
                        closeUserEditModal={closeUserEditModal}
                        cityList={cityList}
                        stateList={stateList}
                        userDetails={userDetails}
                        refreshUserDetails={refreshUserDetails}
                    />
                </Modal>
            )}
        </>
    )
}

export default Myprofilemodal


