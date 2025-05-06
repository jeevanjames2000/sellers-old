import LoadingOverlay from "@/components/shared/LoadingOverlay";
import React, { useState } from "react";

function Forcommercial({ commercialPackages, isLoadingEffect }) {
  const [plan, setPlan] = useState("Prime");

  const updatePlan = (selectedPlan) => {
    setPlan(selectedPlan);
  };

  return (
    <div className="flex flex-basis pt-10 overflow-x-auto">
      <div className="text-[#6D6C6C] text-[10px] xs:text-[11px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[600] space-y-3 min-w-[160px] basis-[25%] pt-14">
        <p>Non-Commercial</p>
        <p>Number Of Listings</p>
        <p>Response Rate</p>
        <p>Position On Search</p>
        <p>Buyers Visibility</p>
        <p>Verified Tag</p>
        <p>Visibility on Best Details</p>
        <p>Visibility on Latest Details</p>
        <p>Land Page AD</p>
        <p>Land Page Banner</p>
        <p>Listings Page Small ADS</p>
        <p>Dedicated Agent Support</p>
        <p>Creatives</p>
        <p>Listing Support</p>
        <p>Meta ADS</p>
        <p>Prime Promotion</p>
        <p>CRM</p>
      </div>
      <div className="flex basis-[75%] w-full gap-6 relative">
        {commercialPackages.length > 0 ?
          commercialPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => updatePlan(pkg.id)}
              className={`relative basis-[25%] border min-w-[120px] border-[#909090] rounded-[10px] px-2 sm:px-4 py-3 cursor-pointer ${(plan === pkg.id || (pkg.is_popular === "Yes" && plan === "Prime")) ? "bg-[#1D3A76] text-[#ffffff]" : "bg-white text-[#6D6C6C]"
                }`}
            >
              {pkg.is_popular === "Yes" && (
                <button className="absolute -top-11 2xl:-top-12 3xl:-top-13 4xl:-top-14 flex mx-auto mt-4 bg-[#699BA0]  text-[#ffffff] font-[700] h-7 2xl:h-8 3xl:h-9 4xl:h-10 py-[6px] px-3 md:px-6 xl:px-12 text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] rounded-t-md focus:outline-none ">
                  Popular
                </button>
              )}
              <p
                className={`text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-center font-[700] underline underline-offset-4 ${plan === pkg.id ? "text-[#ffffff]" : "text-[#1D3A76]"
                  }`}
              >
                {pkg.package_name}
              </p>
              <div className="text-center text-[10px] xs:text-[11px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] font-[600] space-y-3 pt-5">
                <p>{pkg.package_days ? `${pkg.package_days} days` : `${pkg.package_monhts} ${pkg.package_monhts > 1 ? "Months" : "Month"}`} {pkg.package_cost && `(${pkg.package_cost}+18%GST)`}</p>
                <p>{pkg.number_of_listings}</p>
                <p>{pkg.response_rate}</p>
                <p>{pkg.search_position}</p>
                <p>{pkg.buyers_visibility}</p>
                <p>{pkg.verified_tag}</p>
                <p>{pkg.visibility_best_details}</p>
                <p>{pkg.visibility_latest_details}</p>
                <p>{pkg.land_page_ad}</p>
                <p>{pkg.land_page_banner}</p>
                <p>{pkg.listings_page_ads}</p>
                <p>{pkg.dedicated_agent_support}</p>
                <p>{pkg.creatives}</p>
                <p>{pkg.listing_support}</p>
                <p>{pkg.meta_ads}</p>
                <p>{pkg.prime_promotion}</p>
                <p>{pkg.crm_support}</p>
              </div>
              <button className="flex mx-auto mt-4 items-center justify-center bg-[#699BA0] text-[#ffffff] h-7 py-1 px-2 lg:px-4 text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[700] rounded-md focus:outline-none">
                Get It Now
              </button>
            </div>
          ))
          :
          <p className="h-full w-full text-center justify-center flex align-middle items-center text-[12px] xs:text-[14px] 2xl:[18px] 3xl:[20px] 4xl:[22px] ">No packages available</p>
        }
        <LoadingOverlay isLoading={isLoadingEffect} />
      </div>
    </div>
  );
}

export default Forcommercial;