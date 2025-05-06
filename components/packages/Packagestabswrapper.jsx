"use client";
import { useEffect, useState } from "react";
import trouble from "@/public/assets/trouble.svg";
import explore_packages from "@/public/assets/explore_packages.svg";
import Image from "next/image";
import { useUserDetails } from "../zustand/useUserDetails";
import { useRouter } from "next/navigation";
import { Modal } from "@nayeshdaggula/tailify";
import Errorpanel from "../shared/Errorpanel";
import PricingCards from "./tabs/PricingCards";
function Packagestabswrapper() {
  const router = useRouter();
  const userInfo = useUserDetails((state) => state.userInfo);
  const [isLoadingEffect, setIsLoadingEffect] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };
  const [plans, setPlans] = useState([]);
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
  const fetchPlans = async () => {
    setIsLoadingEffect(true);
    setPlans([]);
    try {
      const response = await fetch(
        `https://api.meetowner.in/packages/v1/getAllPackages`
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
  useEffect(() => {
    fetchSubscription();
    fetchPlans();
  }, []);
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
        </div>
        <PricingCards
          isLoadingEffect={isLoadingEffect}
          plans={plans}
          userInfo={userInfo}
          subscription={subscription}
          fetchPlans={fetchPlans}
        />
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
