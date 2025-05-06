"use client";
import { Select, Textinput } from "@nayeshdaggula/tailify";
import React, { useEffect, useState } from "react";
import Authapi from "../api/Authapi";
import { toast } from "react-toastify";
import LoadingOverlay from "../shared/LoadingOverlay";
import Errorpanel from "../shared/Errorpanel";
import { useUserDetails } from "../zustand/useUserDetails";
import { useRouter } from "next/navigation";
import { Modal } from "@nayeshdaggula/tailify";
import OtpModal from "./OtpModal";
import Link from "next/link";

function SignupForm({ usertypedata, cities }) {
  const router = useRouter();
  const updateAuthDetails = useUserDetails((state) => state.updateAuthDetails);
  const [userType, setUserType] = useState("Builder");
  const [isLoadingEffect, setIsLoadingEffect] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const isLogged = useUserDetails((state) => state.isLogged);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const updateName = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const updateMobile = (e) => {
    let value = e.target.value;
    //allow only numbers
    if (isNaN(value)) {
      return false;
    }

    //allow only 10 digits
    if (value.length > 10) {
      return false;
    }

    setMobile(value);
    setMobileError("");
  };

  const [city, setCity] = useState("");
  const updateCity = (value) => {
    setCity(value);
  };

  const [otpModal, setOtpModal] = useState(false);
  const openOtpModal = () => {
    setOtpModal(true);
  };
  const closeOtpModal = () => {
    setOtpModal(false);
  };

  const [otpNumber, setOtpNumber] = useState("");
  const [otpError, setOtpError] = useState("");
  const updateOtpNumber = (value) => {
    setOtpNumber(value);
    setOtpError("");
  };
  const [genratedOtp, setGenratedOtp] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };
  const handleSignupform = (e) => {
    setIsLoadingEffect(true);
    e.preventDefault();
    if (name === "") {
      setIsLoadingEffect(false);
      setNameError("Name is required");
      return false;
    }
    if (mobile === "") {
      setIsLoadingEffect(false);
      setMobileError("Mobile number is required");
      return false;
    }
    if (mobile.length < 10) {
      setIsLoadingEffect(false);
      setMobileError("Mobile number should be 10 digits");
      return false;
    }

    Authapi.post(
      "register",
      {
        name: name,
        mobile: mobile,
        city: city,
        userType: userType,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        let data = response.data;
        if (data.status === "error") {
          console.log("error", data.message);
          let finalresponse = {
            message: data.message,
            server_res: data,
          };
          setErrorMessages(finalresponse);
          setErrorModalOpen(true);
          setIsLoadingEffect(false);
          return false;
        } else if (data.status === "error_user_exists") {
          let finalresponse = {
            message: "User already exists, Please login to Access",
          };
          setErrorMessages(finalresponse);
          setErrorModalOpen(true);
          setIsLoadingEffect(false);
          return false;
        } else {
          sendOTP(mobile);
          setUserDetails(data?.user_details);
          setAccessToken(data?.accessToken);
          setTimeout(() => {
            setIsLoadingEffect(false);
          }, 3000);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        let finalresponse;
        if (error.response !== undefined) {
          finalresponse = {
            message: error.message,
            server_res: error.response.data,
          };
        } else {
          finalresponse = {
            message: error.message,
            server_res: null,
          };
        }
        setErrorMessages(finalresponse);
        setErrorModalOpen(true);
        setIsLoadingEffect(false);
        return false;
      });
  };

  async function sendOTP(mobile_number) {
    Authapi.get("/sendOtp", {
      params: {
        mobile: mobile_number,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data.status === "error") {
          let finalresponse = {
            message: data.message,
          };
          setErrorMessages(finalresponse);
          setErrorModalOpen(true);
          setIsLoadingEffect(false);
          return false;
        } else {
          openOtpModal();
          setGenratedOtp(data?.otp.toString());
          // setOtpNumber(data?.otp.toString()); // for testing purpose
          setTimeout(() => {
            setIsLoadingEffect(false);
          }, 3000);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        let finalresponse = {
          message: error.message,
        };
        setErrorMessages(finalresponse);
        setErrorModalOpen(true);
        setIsLoadingEffect(false);
        return false;
      });
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoadingEffect(true);
    if (otpNumber === "") {
      setIsLoadingEffect(false);
      setOtpError("Please enter OTP number");
      return false;
    }
    if (otpNumber !== genratedOtp) {
      setIsLoadingEffect(false);
      setOtpError("Please enter correct OTP number");
      return false;
    }
    closeOtpModal();
    updateAuthDetails(userDetails, accessToken);
    toast.success("OTP Verified Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      setIsLoadingEffect(false);
    }, 3000);
    router.push("/dashboard");
  };

  useEffect(() => {
    setIsLoadingEffect(true);
    if (isLogged) {
      router.push("/dashboard");
      setIsLoadingEffect(false);
    } else {
      router.push("/signup");
      setIsLoadingEffect(false);
    }
  }, [isLogged]);

  return (
    <div className=" flex flex-row items-center justify-center col-span-12 md:col-span-6 px-3">
      <div className="signupform flex flex-col xxm:w-fit h-fit gap-4 2xl:gap-4">
        <div className="relative flex flex-col">
          <div className="flex">
            {usertypedata.map((type, index) => (
              <div
                key={type.value}
                onClick={() => setUserType(type.label)}
                className={` rounded-tl-[8px] cursor-pointer custom-shadow w-fit ${
                  index !== 0 ? "ml-[-18px]" : ""
                }
          flex items-center justify-center text-[12px] xxm:text-[14px] xs:text-[15px] md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[18px] 3xl:text-[28px] 4xl:text-[32px] text-[#ffffff] font-[600] py-1 md:py-2  xl:py-[3%] 2xl:py-[2%] 3xl:py-[2%] 4xl:py-[2%] px-6 2xl:px-8 rounded-tr-[20px]
          ${
            userType === type.label
              ? "bg-[#FBAF01] text-[#244385]"
              : "bg-[#31539A]"
          }
          ${
            index === usertypedata.length - 1 ? "w-[100%] justify-end p-4" : ""
          }`}
                style={{ zIndex: 50 - index * 10 }}
              >
                {type.label}
              </div>
            ))}
          </div>
          <form onSubmit={handleSignupform}>
            <div className="flex flex-col bg-white rounded-bl-xl rounded-br-xl h-fit py-6 px-3 xl:px-[7%] gap-2 xl:gap-6 lg:gap-6">
              <div className="flex flex-row items-center w-fit gap-[2%]">
                <div className="w-[20%]">
                  <Textinput
                    value="+91"
                    placeholder="+91"
                    inputClassName="text-[#626262] font-[600] text-[12px] md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div className="w-[78%]">
                  <Textinput
                    type="number"
                    placeholder="Enter your Mobile Number"
                    inputClassName="text-[#AEAEAE] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={mobile}
                    onChange={updateMobile}
                    error={mobileError}
                  />
                </div>
              </div>
              <Textinput
                value={name}
                onChange={updateName}
                error={nameError}
                placeholder="Name"
                inputClassName="text-[#AEAEAE] font-[600] text-[12px] md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
              />
              <div className="">
                <Select
                  placeholder="Select City"
                  data={cities}
                  searchable
                  withAsterisk
                  value={city}
                  onChange={updateCity}
                  inputClassName="text-[#374151] font-[600] text-[12px] md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none"
                  className="!m-0 !p-0"
                  dropdownClassName="text-[#AEAEAE] font-[600] text-[12px] md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] min-h-[100px] max-h-[160px] z-50 overflow-y-auto"
                />
              </div>
              <button
                onClick={handleSignupform}
                className="text-[#FFFFFF] font-[600] text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] rounded-md px-4 mt-8 py-2 xl:py-[2%] 2xl:py-[3%] bg-[#1D3A76] w-full"
              >
                Register
              </button>
            </div>
          </form>
          <LoadingOverlay isLoading={isLoadingEffect} />
        </div>
        <div className="flex flex-row items-center justify-center bg-[#1D3A76] rounded-full">
          <p className="text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[24px] 4xl:text-[24px] 5xl:text-[24px] text-[#ffffff] font-[600] py-[8px]">
            Existing user?
          </p>
          <Link
            href="/"
            className=" text-[12px]  md:text-[12px] xl:text-[12px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[28px] px-1 py-1 2xl:py-[3%] text-[#FBAF01] "
          >
            Login
          </Link>
        </div>
      </div>
      {otpModal && (
        <Modal
          open={otpModal}
          onClose={closeOtpModal}
          size="sm"
          zIndex={9999}
          withCloseButton={false}
        >
          <OtpModal
            otpNumber={otpNumber}
            updateOtpNumber={updateOtpNumber}
            handleVerifyOtp={handleVerifyOtp}
            genratedOtp={genratedOtp}
            otpError={otpError}
          />
        </Modal>
      )}
      {errorModalOpen && (
        <Modal
          open={errorModalOpen}
          onClose={closeErrorModal}
          size="md"
          zIndex={9999}
          withCloseButton={false}
        >
          <Errorpanel errorMessages={errorMessages} close={closeErrorModal} />
        </Modal>
      )}
    </div>
  );
}

export default SignupForm;
