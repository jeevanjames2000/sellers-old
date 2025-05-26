"use client";
import { useEffect, useState } from "react";
import trouble from "@/public/assets/trouble.svg";
import explore_packages from "@/public/assets/explore_packages.svg";
import Image from "next/image";
import { useUserDetails } from "../zustand/useUserDetails";
import { useRouter } from "next/navigation";
import { Modal, Select } from "@nayeshdaggula/tailify";
import Errorpanel from "../shared/Errorpanel";
import PricingCards from "./tabs/PricingCards";
import CustomPricing from "./tabs/CustomPricing";
import Generalapi from "../api/Generalapi";

function Packagestabswrapper() {
  const router = useRouter();
  const userInfo = useUserDetails((state) => state.userInfo);
  let access_token = userInfo?.access_token;

  const [isLoadingEffect, setIsLoadingEffect] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };
  const [subscription, setSubscription] = useState("");

  const fetchSubscription = async () => {
    setIsLoadingEffect(true);
    setSubscription("");
    try {
      const response = await fetch(
        `https://api.meetowner.in/packages/v1/getSubscriptionDetails?user_id=${userInfo?.user_id}`
      );
      const data = await response.json();
      if (response.ok) {
        setSubscription(data.data);
      } else {
        throw new Error("Failed to fetch plans");
      }
    } catch (error) {
    } finally {
      setIsLoadingEffect(false);
    }
  };
  const [plans, setPlans] = useState([]);
  const [city, setCity] = useState(4);
  const [allCities, setAllCities] = useState([]);
  const selectedCityObj = allCities.find((c) => c.value === parseInt(city));
  const cityName = selectedCityObj ? selectedCityObj.label : userInfo?.city;

  const fetchPlans = async () => {
    const packageForMap = {
      1: "admin",
      2: "user",
      3: "builder",
      4: "agent",
      5: "owner",
      6: "channel_partner",
    };

    const package_for = packageForMap[userInfo?.user_type];
    setIsLoadingEffect(true);
    setPlans([]);
    try {
      const response = await fetch(
        `https://api.meetowner.in/packages/v1/getAllPackages?package_for=${package_for}&city=${cityName}`
      );
      const data = await response.json();
      if (response.ok) {
        setPlans(data);
      } else {
        throw new Error("Failed to fetch plans");
      }
    } catch (error) {
    } finally {
      setIsLoadingEffect(false);
    }
  };
  const [customPackage, setCustomPackage] = useState([]);

  const fetchCustomPackages = async () => {
    try {
      const response = await fetch(
        `https://api.meetowner.in/packages/v1/getCustomPackages?user_id=${userInfo.user_id}&city=${cityName}`
      );
      const data = await response.json();
      if (response.ok) {
        setCustomPackage(data.customPackages[0]);
      } else {
        throw new Error("Failed to fetch plans");
      }
    } catch (error) {
    } finally {
      setIsLoadingEffect(false);
    }
  };
  useEffect(() => {
    fetchPlans();
    fetchSubscription();
    fetchCustomPackages();
    getAllCities();
  }, [cityName]);

  const getAllCities = () => {
    Generalapi.get("getcities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        let data = response.data;
        if (data.status === "error") {
          let finalResponse = {
            message: data.message,
            server_res: data,
          };
          setErrorMessages(finalResponse);
          setErrorModalOpen(true);
        }
        if (data.status === "success") {
          setAllCities(data?.cities || []);
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
        return false;
      });
  };
  const updateCity = (value) => {
    setCity(value);
  };
  return (
    <>
      <div className="flex flex-col gap-6 px-6 bg-[#ffffff] rounded-bl-[10px] rounded-br-[10px]">
        <div className="flex flex-col md:flex-row items-center justify-between py-2 md:py-4 mt-4 md:mt-8 gap-3 md:gap-0">
          <p className="text-[22px] xs:text-[26px] 2xl:text-[30px] 3xl:text-[32px] 4xl:text-[34px] text-[#699BA0] font-[700]">
            GET 30% off Valid Till
            <span className="block text-center text-[#116D85]">
              AUG - 15TH - 2025
            </span>
          </p>
          <div className="w-[20%]">
            <Select
              label="City"
              labelClassName="!text-[#1D3A76] text-[13px] font-medium font-sans"
              data={allCities}
              searchable
              withAsterisk
              value={city}
              onChange={updateCity}
              inputClassName="focus:ring-blue-500 focus:border-blue-500"
              className="!m-0 !p-0"
              dropdownClassName="min-h-[100px] max-h-[200px] z-50 overflow-y-auto"
            />
          </div>
        </div>
        {userInfo?.user_type === 3 || customPackage ? (
          <CustomPricing
            userInfo={userInfo}
            customPackage={customPackage}
            subscription={subscription}
            cityName={cityName}
          />
        ) : (
          <PricingCards
            isLoadingEffect={isLoadingEffect}
            plans={plans}
            userInfo={userInfo}
            cityName={cityName}
            subscription={subscription}
            fetchPlans={fetchPlans}
          />
        )}

        <div className="flex flex-row w-fit gap-4 pb-8">
          <div className=" cursor-pointer  flex flex-col  items-center justify-center border-[1.5px] border-[#699BA0] rounded-[10px] px-3 pb-1 ">
            <Image src={trouble} alt={"trouble"} className="object-cover p-2" />
            <p className="text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold text-[#699BA0]">
              Explore Commercial Pakages
            </p>
          </div>
          <div className=" cursor-pointer  flex flex-col  items-center justify-center border-[1.5px] border-[#699BA0] rounded-[10px] px-3 pb-1 ">
            <Image
              src={explore_packages}
              alt={"explore_packages"}
              className="object-cover p-2"
            />
            <p className="text-[10px] xs:text-[11px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-bold text-[#699BA0]">
              Having a Trouble? Request a callback
            </p>
          </div>
        </div>
      </div>
      {errorModalOpen && (
        <Modal
          open={errorModalOpen}
          onClose={closeErrorModal}
          size="md"
          zIndex={9999}
        >
          <Errorpanel errorMessages={errorMessages} close={closeErrorModal} />
        </Modal>
      )}
    </>
  );
}

export default Packagestabswrapper;
