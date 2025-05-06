"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingOverlay from "../shared/LoadingOverlay";
import Authapi from "../api/Authapi";
import { useRouter } from "next/navigation";
import { useUserDetails } from "../zustand/useUserDetails";
import { Textinput } from "@nayeshdaggula/tailify";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

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
    <>
      <div className="flex flex-col w-full xl:w-fit h-fit gap-4 xl:gap-6 2xl:gap-6 4xl:gap-8 px-4 md:px-0">
        <div className="relative flex flex-col">
          <form onSubmit={handleLoginform}>
            <div className="rounded-md flex flex-col bg-white h-fit py-4 md:py-4 lg:py-4 xl:py-4  4xl:py-8 px-[3%] gap-2  md:gap-2 lg:gap-4">
              <p className="text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[18px] 3xl:text-[26px] 4xl:text-[28px] font-semibold">
                Mobile Number
              </p>
              <div className="flex flex-row items-center">
                <div className="w-[15%] xxxs:w-[20%] sm:w-[10%] md:w-[15%] lg:w-[15%] xl:w-[15%]">
                  <Textinput
                    value="+91"
                    placeholder="+91"
                    inputClassName="text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div className="w-[85%] xxxs:w-[80%] sm:w-[90%] md:w-[85%] lg:w-[85%] xl:w-[85%]">
                  <Textinput
                    type="number"
                    placeholder="Enter Mobile Number"
                    inputClassName="text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={mobile}
                    onChange={updateMobile}
                    error={mobileError}
                  />
                </div>
              </div>
              <div className="w-full relative">
                <Textinput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  inputClassName="w-full pr-10 text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] 5xl:text-[24px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  error={mobileError}
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

              <button
                onClick={handleLoginform}
                className="text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px] rounded-md px-4 py-2  bg-[#ffd119] w-full"
              >
                Login
              </button>
            </div>
          </form>
          <LoadingOverlay isLoading={isLoadingEffect} />
        </div>
        <div className="flex flex-row items-center justify-center bg-[#1D3A76] rounded-full px-4 py-2 space-x-2">
          <p className="text-white text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px]">
            Don't have an Account?
          </p>

          <Link
            href="/signup"
            className="text-[#FBAF01] hover:underline text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px]"
          >
            Signup
          </Link>

          <span className="text-white text-[16px] 3xl:text-[26px] 4xl:text-[28px]">
            /
          </span>

          <Link
            href="/"
            className="text-[#FBAF01] hover:underline text-[12px] md:text-[12px] xl:text-[16px] lg:text-[16px] 2xl:text-[16px] 3xl:text-[26px] 4xl:text-[28px]"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
export default LoginformBypass;
