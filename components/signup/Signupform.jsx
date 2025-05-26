"use client";
import { useEffect, useRef, useState } from "react";
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
    if (isNaN(value)) {
      return false;
    }

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
          setTimeout(() => {
            setIsLoadingEffect(false);
          }, 3000);
          return false;
        }
      })
      .catch((error) => {
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
      router.push("/");
      setIsLoadingEffect(false);
    }
  }, [isLogged]);
  const SearchableSelect = ({ data, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredCities, setFilteredCities] = useState(data);
    const wrapperRef = useRef();
    useEffect(() => {
      setFilteredCities(
        data.filter((item) =>
          item.label.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, data]);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
      <div
        className="w-full border border-gray-300 rounded-full relative bg-white px-4 py-3"
        ref={wrapperRef}
      >
        <div
          className="cursor-pointer text-gray-400 font-medium text-[16px] placeholder-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? data.find((c) => c.value === value)?.label : "Select City"}
        </div>
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg z-50 shadow-lg p-2">
            <input
              type="text"
              placeholder="Search city..."
              className="w-full p-2 text-sm border border-gray-200 rounded mb-2 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="max-h-40 overflow-y-auto text-sm">
              {filteredCities.length > 0 ? (
                filteredCities.map((item) => (
                  <li
                    key={item.value}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                    onClick={() => {
                      onChange(item.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                  >
                    {item.label}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 p-2">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };
  const inputClass =
    "w-full border border-gray-300 rounded-full bg-transparent text-gray-400 placeholder-gray-400 font-medium" +
    " px-4 py-3 mb-4 text-[16px]";
  return (
    <div
      className="flex flex-row items-start justify-start w-full sm:w-full md:w-full lg:w-full overflow-auto
    bg-white rounded-lg shadow-md h-fit max-w-[100%] 2xl:w-full
    p-4 xs:p-5 sm:p-6 md:p-3 lg:p-4 xl:p-18 2xl:p-10 max-h-[100vh] md:max-h-[85vh]  lg:max-h-[90vh]  xl:max-h-[100vh] "
    >
      <div className="signupform flex flex-col w-full">
        <div className="relative flex flex-col">
          <p
            className="text-[#1D3A76] font-bold leading-tight 
          text-[14px] xs:text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]"
          >
            Your property will sell or rent faster online in MeetOwner
          </p>
          <p
            className="text-[#AEAEAE] font-semibold mt-2 mb-2 
          text-[12px] xs:text-[13px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
          >
            Are you
          </p>
          <div className="flex flex-wrap gap-2 items-start leading-none max-h-[40px] mb-1">
            {usertypedata.map((type, index) => (
              <div
                key={type.value}
                onClick={() => setUserType(type.label)}
                className={`cursor-pointer w-auto flex items-center justify-center rounded-lg 
        text-[10px] xs:text-[11px] sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] 
        px-2 xs:px-2.5 sm:px-3 md:px-3 lg:px-3 xl:px-4 2xl:px-4 
        py-2 xs:py-2 sm:py21 md:py-3 lg:py-3 xl:py-4 2xl:py-4
        whitespace-nowrap leading-none
        ${
          userType === type.label
            ? "bg-[#1D3A76] text-[#FFFFFF]"
            : "bg-[#E5E7EB] text-[#374151]"
        }`}
                style={{ zIndex: 50 - index * 10 }}
              >
                <span className="block">{type.label}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSignupform}>
            <div className="flex flex-col mt-6">
              <div className="flex flex-col">
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  value={mobile}
                  onChange={updateMobile}
                  className={inputClass}
                />
                {mobileError && (
                  <span className="ml-2 text-red-500 text-sm">
                    {mobileError}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={updateName}
                  className={inputClass}
                />
                {nameError && (
                  <span className="ml-2 text-red-500 text-sm">{nameError}</span>
                )}
              </div>
              <div className="mb-2">
                <SearchableSelect
                  data={cities}
                  value={city}
                  onChange={updateCity}
                />
              </div>
              <button
                onClick={handleSignupform}
                className="text-white font-semibold rounded-md w-full 
        text-[16px] px-5 mt-6 py-3 bg-[#1D3A76]"
              >
                Start Now
              </button>
            </div>
          </form>
          <div
            className="flex flex-row items-center justify-start ml-2
          mt-3 xs:mt-3 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-5 2xl:mt-5"
          >
            <p
              className="text-black font-medium  
            text-[12px] xs:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px] 2xl:text-[16px]"
            >
              Already existing user?
            </p>
            <div
              className="bg-[#1D3A76] rounded-lg ml-2 items-center justify-center
            px-2 xs:px-2 sm:px-3 md:px-3 lg:px-3 xl:px-4 2xl:px-4 
            py-1 xs:py-1 sm:py-1 md:py-1 lg:py-1 xl:py-1.5 2xl:py-1.5"
            >
              <Link
                href="/login"
                className="text-white font-medium items-center justify-center flex
              text-[10px] xs:text-[11px] sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
              >
                Login
              </Link>
            </div>
          </div>
          <LoadingOverlay isLoading={isLoadingEffect} />
        </div>
      </div>
      {otpModal && (
        <Modal
          open={otpModal}
          onClose={closeOtpModal}
          size="xs"
          zIndex={9999}
          withCloseButton={true}
        >
          <OtpModal
            otpNumber={otpNumber}
            updateOtpNumber={updateOtpNumber}
            handleVerifyOtp={handleVerifyOtp}
            genratedOtp={genratedOtp}
            otpError={otpError}
            closeOtpModal={closeOtpModal}
          />
        </Modal>
      )}
      {errorModalOpen && (
        <Modal
          open={errorModalOpen}
          onClose={closeErrorModal}
          size="sm"
          zIndex={9999}
          withCloseButton={true}
        >
          <Errorpanel errorMessages={errorMessages} close={closeErrorModal} />
        </Modal>
      )}
    </div>
  );
}
export default SignupForm;
