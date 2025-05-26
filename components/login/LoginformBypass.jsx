"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingOverlay from "../shared/LoadingOverlay";
import Authapi from "../api/Authapi";
import { useRouter } from "next/navigation";
import { useUserDetails } from "../zustand/useUserDetails";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { IconUserFilled, IconLock } from "@tabler/icons-react";
function LoginformBypass() {
  const router = useRouter();
  const updateAuthDetails = useUserDetails((state) => state.updateAuthDetails);
  const [isLoadingEffect, setIsLoadingEffect] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const userInfo = useUserDetails((state) => state.userInfo);
  const isLogged = useUserDetails((state) => state.isLogged);
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
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const ENV_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const handleLoginform = (e) => {
    setIsLoadingEffect(true);
    e.preventDefault();
    if (adminPassword !== ENV_PASSWORD) {
      setErrorMessages({
        message: "Incorrect admin password",
      });
      setIsLoadingEffect(false);
      return;
    }
    if (mobile === "") {
      setMobileError("Mobile number is required");
      setIsLoadingEffect(false);
      return false;
    } else if (mobile.length < 10) {
      setMobileError("Mobile number should be 10 digits");
      setIsLoadingEffect(false);
      return false;
    }
    Authapi.post("/login", {
      mobile: mobile,
    })
      .then((response) => {
        const data = response.data;
        if (data.status === "error") {
          let finalresponse = {
            message: data.message,
          };
          setErrorMessages(finalresponse);
          setIsLoadingEffect(false);
          return false;
        } else if (data.status === "error_user_not_found") {
          let finalresponse = {
            message: data.message,
          };
          setErrorMessages(finalresponse);
          setIsLoadingEffect(false);
          return false;
        } else {
          setTimeout(() => {
            setIsLoadingEffect(false);
          }, 3000);
          updateAuthDetails(data?.user_details, data?.accessToken);
          router.push("/dashboard");
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
        setIsLoadingEffect(false);
        return false;
      });
  };
  useEffect(() => {
    setIsLoadingEffect(true);
    if (isLogged) {
      router.push("/dashboard");
      setIsLoadingEffect(false);
    } else {
      router.push("/admin");
      setIsLoadingEffect(false);
    }
  }, [isLogged]);
  return (
    <div className="flex flex-col items-center justify-center px-8 py-8 bg-white shadow-md rounded-lg  ">
      <div className="flex flex-col w-full max-w-full sm:max-w-md h-fit gap-4 xl:gap-6 2xl:gap-6 4xl:gap-8">
        <div className="relative flex flex-col">
          <p className="text-[#1D3A76] font-bold text-[18px]">Admin Login</p>
          <form
            onSubmit={handleLoginform}
            className="flex flex-col w-full max-w-md py-4 md:py-4 lg:py-4 xl:py-4 4xl:py-8 px-[3%] gap-2 md:gap-2 lg:gap-4"
          >
            <div className="flex items-center w-full border border-gray-300 rounded-lg">
              <div className="bg-gray-100 rounded-[5px] p-2 inline-flex items-start justify-start mr-2">
                <IconUserFilled size={40} className="text-gray-500" />
              </div>
              <input
                type="number"
                placeholder="Enter Mobile Number"
                className="w-full py-4 text-gray-700 text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] bg-transparent placeholder-gray-500 font-[600] border-none focus:outline-none"
                value={mobile}
                onChange={updateMobile}
              />
            </div>

            <div className="flex items-center bg-white w-full shadow-sm relative border border-gray-300 rounded-lg">
              <div className="bg-gray-100 rounded-[5px] p-2 inline-flex items-start justify-start mr-2">
                <IconLock size={40} className="text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                className="w-full py-4 text-gray-700 text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] bg-white placeholder-gray-500 font-[600] border-none focus:outline-none"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IconEye size={20} />
                ) : (
                  <IconEyeOff size={20} />
                )}
              </div>
            </div>

            {errorMessages.message && (
              <div className="text-red-500 text-[12px] md:text-[12px] xl:text-[14px] lg:text-[14px] 2xl:text-[14px] 3xl:text-[20px] 4xl:text-[22px] mt-2">
                {errorMessages.message}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] font-[600] rounded-[30px] px-6 py-2 bg-[#ffd119] w-[30%] max-w-md"
              >
                Login
              </button>
            </div>
          </form>
          <LoadingOverlay isLoading={isLoadingEffect} />
          <div className="flex justify-center ">
            <div className="flex items-center space-x-2">
              <p className="text-white-700 text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] font-[600]">
                Don't have an Account?
              </p>
              <div className="bg-[#ffd119] rounded-[30px] px-4 py-2 flex items-center space-x-2">
                <Link
                  href="/signup"
                  className="text-black hover:underline text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] font-[600]"
                >
                  Signup
                </Link>
                <span className="text-black text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] font-[600]">
                  /
                </span>
                <Link
                  href="/login"
                  className="text-black hover:underline text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] font-[600]"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginformBypass;
