'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Userapi from '../api/Userapi'
import { useUserDetails } from '../zustand/useUserDetails'
import Userdatawrapper from './Userdatawrapper'
import { toast } from 'react-toastify'

function Myprofile({ cityList, stateList }) {
    const userInfo = useUserDetails((state) => state.userInfo)
    let user_id = userInfo?.user_id || null
    let access_token = userInfo?.access_token || null
    let user_type = userInfo?.user_type || null

    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const closeErrorModal = () => setErrorModalOpen(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [isLoadingEffect, setIsLoadingEffect] = useState(false);

    const [userDetails, setUserDetails] = useState({})
    async function getUserDetails() {
        Userapi.get('/userdetails', {
            params: {
                user_id: user_id,
                user_type: user_type,
            },
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        })
            .then((response) => {
                let data = response.data;
                if (data.status === 'error') {
                    const finalResponse = {
                        message: data.message,
                    };
                    setIsLoadingEffect(false);
                    setErrorMessages(finalResponse)
                    setErrorModalOpen(true);
                    // toast.error(data.message);
                    return;
                }
                setIsLoadingEffect(false);
                setUserDetails(data?.userDetails || {})
            })
            .catch(error => {
                const errorDetails = {
                    message: error.message,
                };
                setIsLoadingEffect(false);
                setErrorMessages(errorDetails);
                setErrorModalOpen(true);
                // toast.error(error.message);
            });
    }

    const refreshUserDetails = useCallback(() => {
        setIsLoadingEffect(true);
        getUserDetails();
    }, [user_id])

    useEffect(() => {
        setIsLoadingEffect(true);
        getUserDetails();
    }, [user_id])

    return (
        <Userdatawrapper
            userDetails={userDetails}
            cityList={cityList}
            stateList={stateList}
            isLoadingEffect={isLoadingEffect}
            errorModalOpen={errorModalOpen}
            closeErrorModal={closeErrorModal}
            errorMessages={errorMessages}
            refreshUserDetails={refreshUserDetails}
        />
    )
}

export default Myprofile