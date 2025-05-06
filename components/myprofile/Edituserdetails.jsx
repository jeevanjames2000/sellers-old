import { Select, Textinput } from '@nayeshdaggula/tailify'
import React, { useState } from 'react'
import Userapi from '../api/Userapi';
import { useUserDetails } from '../zustand/useUserDetails';
import { toast } from 'react-toastify';
import LoadingOverlay from '../shared/LoadingOverlay';

function Edituserdetails({ cityList, stateList, userDetails, closeUserEditModal, refreshUserDetails }) {
    const userInfo = useUserDetails((state) => state.userInfo)
    let user_id = userInfo?.user_id || null
    let access_token = userInfo?.access_token || null
    let user_type = userInfo?.user_type || null

    const [isLoadingEffect, setIsLoadingEffect] = useState(false);
    const [name, setName] = useState(userDetails?.name || '');
    const [nameError, setNameError] = useState('');
    const updateName = (e) => {
        setName(e.target.value);
        setNameError('');
    }

    const [mobile, setMobile] = useState(userDetails?.mobile || '');
    const [mobileError, setMobileError] = useState('');
    const updateMobile = (e) => {
        let value = e.target.value;
        if (isNaN(value)) {
            return false;
        }
        setMobile(value);
        setMobileError('');
    }

    const [email, setEmail] = useState(userDetails?.email || '');
    const [emailError, setEmailError] = useState('');
    const updateEmail = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    }

    const [address, setAddress] = useState(userDetails?.address || '');
    const [addressError, setAddressError] = useState('');
    const updateAddress = (e) => {
        setAddress(e.target.value);
        setAddressError('');
    }

    const [city, setCity] = useState(userDetails?.city_id || '');
    const [cityError, setCityError] = useState('');
    const updateCity = (value) => {
        setCity(value);
        setCityError('');
    }

    const [state, setState] = useState(userDetails?.state_id || '');
    const [stateError, setStateError] = useState('');
    const updateState = (value) => {
        setState(value);
        setStateError('');
    }

    const [pincode, setPincode] = useState(userDetails?.pincode || '');
    const [pincodeError, setPincodeError] = useState('');
    const updatePincode = (e) => {
        let value = e.target.value;
        if (isNaN(value)) {
            return false;
        }
        setPincode(value);
        setPincodeError('');
    }

    const [gstNumber, setGstNumber] = useState(userDetails?.gst_number || '');
    const [gstNumberError, setGstNumberError] = useState('');
    const updateGstNumber = (e) => {
        const value = e.target.value
        setGstNumber(value);
        setGstNumberError('');
        // const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[0-9A-Z]{1}$/;
        // if (value && !gstRegex.test(value)) {
        //     setGstNumberError('Invalid GST Number');
        // }
    }

    const [reraNumber, setReraNumber] = useState(userDetails?.rera_number || '');
    const [reraNumberError, setReraNumberError] = useState('');
    const updateReraNumber = (e) => {
        const value = e.target.value
        setReraNumber(value);
        setReraNumberError('');
        // const reraRegex = /^[A-Z0-9-]+$/i;
        // if (value && !reraRegex.test(value)) {
        //     setReraNumberError('Invalid RERA Number');
        // }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setIsLoadingEffect(true);
        if (name === '') {
            setIsLoadingEffect(false);
            setNameError('Name is required');
            return false;
        }
        if (mobile === '') {
            setIsLoadingEffect(false);
            setMobileError('Mobile number is required');
            return false;
        }
        if (email === '') {
            setIsLoadingEffect(false);
            setEmailError('Email is required');
            return false;
        }
        if (address === '') {
            setIsLoadingEffect(false);
            setAddressError('Address is required');
            return false;
        }
        if (city === '') {
            setIsLoadingEffect(false);
            setCityError('City is required');
            return false;
        }
        if (state === '') {
            setIsLoadingEffect(false);
            setStateError('State is required');
            return false;
        }
        if (pincode === '') {
            setIsLoadingEffect(false);
            setPincodeError('Pincode is required');
            return false;
        }
        if (gstNumber === '') {
            setIsLoadingEffect(false);
            setGstNumberError('GST Number is required');
            return false;
        }
        // const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[0-9A-Z]{1}$/;
        // if (!gstRegex.test(gstNumber)) {
        //     setGstNumberError('Invalid GST Number');
        //     setIsLoadingEffect(false);
        //     return false;
        // }
        if (reraNumber === '') {
            setIsLoadingEffect(false);
            setReraNumberError('RERA Number is required');
            return false;
        }
        // const reraRegex = /^[A-Z0-9-]+$/i;
        // if (!reraRegex.test(reraNumber)) {
        //     setReraNumberError('Invalid RERA Number');
        //     setIsLoadingEffect(false);
        //     return false;
        // }

        Userapi.post('/updateuserdetails', {
            user_id: user_id,
            user_type: user_type,
            name: name,
            mobile: mobile,
            email: email,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            gst_number: gstNumber,
            rera_number: reraNumber
        }, {
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
                    setErrorMessages(finalResponse)
                    setErrorModalOpen(true);
                    setIsLoadingEffect(false);
                    return;
                }
                setIsLoadingEffect(false);
                closeUserEditModal();
                refreshUserDetails();
                toast.success('User details updated successfully');
            })
            .catch(error => {
                const errorDetails = {
                    message: error.message,
                };
                setIsLoadingEffect(false);
                setErrorMessages(errorDetails);
                setErrorModalOpen(true);
            });
    }


    return (
        <div className='relative  h-full w-full  rounded-sm '>
            <div className='overflow-y-auto h-[400px] flex flex-col space-y-2 bg-[#edf3f8] p-3 mt-4'>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        Name
                    </p>
                    <div className='w-full'>
                        <Textinput
                            type='text'
                            value={name}
                            onChange={updateName}
                            error={nameError}
                            placeholder="Enter Name"
                            inputClassName='bg-[#ffffff] rounded-[10px] text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-[4px] focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]'
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        Phone Number
                    </p>
                    <div className='w-full'>
                        <Textinput
                            type='number'
                            placeholder="Enter Phone Number"
                            inputClassName='bg-[#ffffff] rounded-[10px] text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-[4px] focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]'
                            value={mobile}
                            onChange={updateMobile}
                            error={mobileError}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        Email
                    </p>
                    <div className='w-full'>
                        <Textinput
                            placeholder="Enter Email"
                            inputClassName='bg-[#ffffff] rounded-[10px] text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-[4px] focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]'
                            value={email}
                            onChange={updateEmail}
                            error={emailError}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        Address
                    </p>
                    <div className='w-full'>
                        <Textinput
                            placeholder="Enter Address"
                            inputClassName='bg-[#ffffff] rounded-[10px] text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-[4px] focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]'
                            value={address}
                            onChange={updateAddress}
                            error={addressError}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        City
                    </p>
                    <div className='w-full'>
                        <Select
                            placeholder='select city'
                            data={cityList}
                            searchable
                            withAsterisk
                            value={city}
                            onChange={updateCity}
                            error={cityError}
                            inputClassName='focus:ring-blue-500 focus:border-blue-500'
                            className='!m-0 !p-0'
                            dropdownClassName='min-h-[100px] max-h-[200px] z-50 overflow-y-auto'
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        State
                    </p>
                    <div className='w-full'>
                        <Select
                            placeholder='select state'
                            data={stateList}
                            searchable
                            withAsterisk
                            value={state}
                            onChange={updateState}
                            error={stateError}
                            inputClassName='focus:ring-blue-500 focus:border-blue-500'
                            className='!m-0 !p-0'
                            dropdownClassName='min-h-[100px] max-h-[200px] z-50 overflow-y-auto'
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        PinCode
                    </p>
                    <div className='w-full'>
                        <Textinput
                            placeholder="Enter PinCode"
                            inputClassName='bg-[#ffffff] rounded-[10px] text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-[4px] focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]'
                            value={pincode}
                            onChange={updatePincode}
                            error={pincodeError}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        GST Number
                    </p>
                    <div className='w-full'>
                        <Textinput
                            placeholder="Enter GST Number"
                            inputClassName='bg-[#ffffff] rounded-[10px] text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-[4px] focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]'
                            value={gstNumber}
                            onChange={updateGstNumber}
                            error={gstNumberError}
                        />
                    </div>
                </div>
                <div className='flex flex-row items-center w-full gap-[2%]'>
                    <p className=' w-[30%] text-[#1D37A6] px-2 font-[600] text-[12px] md:text-[12px]  2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px]'>
                        RERA Number
                    </p>
                    <div className='w-full'>
                        <Textinput
                            placeholder="Enter RERA Number"
                            inputClassName='bg-[#ffffff] rounded-[10px] text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-[4px] focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]'
                            value={reraNumber}
                            onChange={updateReraNumber}
                            error={reraNumberError}
                        />
                    </div>
                </div>
                <button onClick={handleSubmitForm}
                    className="bg-[#1D37A6] text-[#ffffff] px-4 py-1 text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text[20px] font-[400] rounded-[6px] ml-auto">
                    Submit
                </button>
            </div>
            <LoadingOverlay isLoading={isLoadingEffect} />
        </div>
    )
}

export default Edituserdetails