import React from "react";
import amenitiesaskdetailslike from "@/public/assets/amenities-askdetails-like.png";
import Image from "next/image";
import { IconCheck, IconCheckbox, IconHeart } from "@tabler/icons-react";
import project_area from "@/public/assets/project_area.svg";
import project_size from "@/public/assets/projectsize.png";
import sizes from "@/public/assets/sizes.svg";
import launch_date from "@/public/assets/launch_date.svg";
import possession_starts from "@/public/assets/possession_starts.svg";
import price from "@/public/assets/price.svg";
import configuration from "@/public/assets/configuration.svg";
import balcony from "@/public/assets/balcony.png";
import bathtub from "@/public/assets/bathtub.png";
import house from "@/public/assets/house.png";
import passenger_lifts from "@/public/assets/passenger_lifts.png";
import stair_cases from "@/public/assets/stair_cases.png";
import private_parking from "@/public/assets/private_parking.png";
import public_parking from "@/public/assets/public_parking.png";
import available_from from "@/public/assets/available_from.png";
import maintenance_charge from "@/public/assets/maintenance_charge.png";
import security_deposit from "@/public/assets/security_deposit.png";
import lock_in_period from "@/public/assets/lock_in_period.png";
import brokerage_charge from "@/public/assets/brokerage_charge.png";
import prefered_tenant_type from "@/public/assets/prefered_tenant_type.png";
import possession_status from "@/public/assets/possession_status.png";
import ownership from "@/public/assets/ownership.png";
import suitablefor from "@/public/assets/suitablefor.png";
import zone_type from "@/public/assets/zone_type.png";
import investor_property from "@/public/assets/investor_property.png";
import loan_facility from "@/public/assets/loan_facility.png";
import car_parking from "@/public/assets/car_parking.png";
import bike_parking from "@/public/assets/bike_parking.png";
import open_parking from "@/public/assets/open_parking.png";
import pantry_room from "@/public/assets/pantry_room.png";
import servant_room from "@/public/assets/servant_room.png";

function Propertyoverview({ propertyDetails }) {
  let available_from_date = "N/A";

  if (propertyDetails?.available_from) {
    const available_from = new Date(propertyDetails.available_from);
    if (!isNaN(available_from)) {
      available_from_date = available_from.toISOString().split("T")[0];
    }
  }

  let possession_end_date = "N/A";

  if (propertyDetails?.possession_end_date) {
    const possession_end = new Date(propertyDetails?.possession_end_date);
    if (!isNaN(possession_end)) {
      possession_end_date = possession_end.toISOString().split("T")[0];
    }
  }

  return (
    <div className="propertyprice space-y-6">
      <p className="text-[#1d3a76] text-[22px] xs:text-[25px] 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-[600]">
        {propertyDetails?.property_name?.toUpperCase()} Overview
      </p>
      <div className="custom-shadow p-6 space-y-8 bg-[#F3F3F3] rounded-md">
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {(propertyDetails?.sub_type === "Apartment" ||
            propertyDetails?.sub_type === "Flat") && (
            <>
              <div className="flex items-center p-[10px] gap-4">
                <Image src={bathtub} alt={`bathtub`} className="w-5 h-5" />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Bathroom
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.bathroom || "----"}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-[10px] gap-4">
                <Image src={balcony} alt={`balcony`} className="w-5 h-5" />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Balcony
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.balconies || "----"}
                  </p>
                </div>
              </div>
            </>
          )}
          {(propertyDetails?.sub_type === "Office" ||
            propertyDetails?.sub_type === "Retail Shop" ||
            propertyDetails?.sub_type === "Show Room") && (
            <>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={passenger_lifts}
                  alt={`passenger_lifts`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Passenger Lifts
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.passenger_lifts || "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={passenger_lifts}
                  alt={`passenger_lifts`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Service Lifts
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.service_lifts || "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={stair_cases}
                  alt={`stair_cases`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Stair Cases
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.stair_cases || "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={private_parking}
                  alt={`private_parking`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Private Parking
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.private_parking || "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={public_parking}
                  alt={`public_parking`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Public Parking
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.public_parking || "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image src={bathtub} alt={`bathtub`} className="w-5 h-5" />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Private Washrooms
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.private_washrooms || "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image src={bathtub} alt={`bathtub`} className="w-5 h-5" />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Public Washrooms
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.public_washrooms || "-----"}
                  </p>
                </div>
              </div>
            </>
          )}
          {propertyDetails?.property_for === "Rent" && (
            <div className="flex items-center p-[10px] gap-4">
              <Image
                src={available_from}
                alt={`available_from`}
                className="w-5 h-5"
              />
              <div>
                <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                  Available From
                </p>
                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                  {available_from_date || "----"}
                </p>
              </div>
            </div>
          )}
          {propertyDetails?.occupancy === "Ready to move" && (
            <div className="flex items-center p-[10px] gap-4">
              <Image src={house} alt={`house`} className="w-5 h-5" />
              <div>
                <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                  Age of Property
                </p>
                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                  {propertyDetails?.age_of_property || "----"}
                </p>
              </div>
            </div>
          )}
          {propertyDetails?.occupancy === "Under Construction" && (
            <div className="flex items-center p-[10px] gap-4">
              <Image
                src={available_from}
                alt={`available_from`}
                className="w-5 h-5"
              />
              <div>
                <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                  Possession End
                </p>
                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                  {possession_end_date || "----"}
                </p>
              </div>
            </div>
          )}
          {propertyDetails?.property_for === "Rent" && (
            <>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={maintenance_charge}
                  alt={`maintenance_charge`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Maintenance Charge
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.maintenance
                      ? `₹ ${propertyDetails?.maintenance}`
                      : "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={security_deposit}
                  alt={`security_deposit`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Security Deposit
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.security_deposit
                      ? `${propertyDetails?.security_deposit} Months`
                      : "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={lock_in_period}
                  alt={`lock_in_period`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Lock-in Period
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.lock_in
                      ? `${propertyDetails?.lock_in} Months`
                      : "----"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={brokerage_charge}
                  alt={`brokerage_charge`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Brokarage Charge
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.brokerage_charge
                      ? `${propertyDetails?.brokerage_charge} Days`
                      : "----"}
                  </p>
                </div>
              </div>
              {(propertyDetails?.property_in !== "Commercial" ||
                propertyDetails?.sub_type === "Plot" ||
                propertyDetails?.sub_type === "Land") && (
                <div className="flex items-center p-[10px] gap-4">
                  <Image
                    src={prefered_tenant_type}
                    alt={`prefered_tenant_type`}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                      Prefered Tenant Type
                    </p>
                    <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                      {propertyDetails?.prefered_tenant_types || "----"}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          {(propertyDetails?.sub_type === "Independent House" ||
            propertyDetails?.sub_type === "Independent Villa") && (
            <div className="flex items-center p-[10px] gap-4">
              <Image src={house} alt={`house`} className="w-5 h-5" />
              <div>
                <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                  Pent House
                </p>
                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                  {propertyDetails?.pent_house || "----"}
                </p>
              </div>
            </div>
          )}
          {propertyDetails?.property_for === "Sell" &&
            (propertyDetails?.sub_type === "Plot" ||
              propertyDetails?.sub_type === "Land") && (
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={possession_status}
                  alt={`possession_status`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Possession Status
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.possession_status || "----"}
                  </p>
                </div>
              </div>
            )}
          {propertyDetails?.property_in === "Commercial" &&
            propertyDetails?.property_for === "Sell" && (
              <div className="flex items-center p-[10px] gap-4">
                <Image src={ownership} alt={`ownership`} className="w-5 h-5" />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Ownership
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.ownership_type || "----"}
                  </p>
                </div>
              </div>
            )}
          {propertyDetails?.property_in === "Commercial" && (
            <>
              {propertyDetails?.sub_type === "Warehouse" ||
              propertyDetails?.sub_type === "Plot" ||
              propertyDetails?.sub_type === "Others" ? (
                <div className="flex items-center p-[10px] gap-4">
                  <Image src={house} alt={`house`} className="w-5 h-5" />
                  <div>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                      Plot No
                    </p>
                    <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                      {propertyDetails?.plot_number || "----"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center p-[10px] gap-4">
                  <Image src={house} alt={`house`} className="w-5 h-5" />
                  <div>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                      Flat No
                    </p>
                    <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                      {propertyDetails?.unit_flat_house_no || "----"}
                    </p>
                  </div>
                </div>
              )}
              {propertyDetails?.sub_type === "Retail Shop" ||
              propertyDetails?.sub_type === "Show Room" ||
              propertyDetails?.sub_type === "Plot" ||
              propertyDetails?.sub_type === "Others" ? (
                <div className="flex items-center p-[10px] gap-4">
                  <Image
                    src={suitablefor}
                    alt={`suitablefor`}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                      Suitable For
                    </p>
                    <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                      {propertyDetails?.business_types || "----"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center p-[10px] gap-4">
                  <Image
                    src={zone_type}
                    alt={`zone_type`}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                      Zone Type
                    </p>
                    <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                      {propertyDetails?.zone_types || "----"}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          {propertyDetails?.property_for === "Sell" &&
            (propertyDetails?.sub_type === "Apartment" ||
              propertyDetails?.sub_type === "Independent Villa" ||
              propertyDetails?.sub_type === "Plot") && (
              <div className="flex items-center p-[10px] gap-4">
                <Image
                  src={investor_property}
                  alt={`investor_property`}
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Investor Property
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.investor_property || "----"}
                  </p>
                </div>
              </div>
            )}
          {propertyDetails?.property_for !== "Rent" && (
            <div className="flex items-center p-[10px] gap-4">
              <Image
                src={loan_facility}
                alt={`loan_facility`}
                className="w-5 h-5"
              />
              <div>
                <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                  Loan Facility
                </p>
                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                  {propertyDetails?.loan_facility || "----"}
                </p>
              </div>
            </div>
          )}
          {
            // propertyDetails?.sub_type !== "Plot" &&
            // <>
            //     <div className="flex items-center p-[10px] gap-4" >
            //         <Image src={car_parking} alt={`car_parking`} className="w-5 h-5" />
            //         {/* <IconCheckbox stroke={2} color="#434343" className="h-6 w-6" /> */}
            //         <div>
            //             <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Car Parking</p>
            //             <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">{propertyDetails?.car_parking || '----'}</p>
            //         </div>
            //     </div>
            //     <div className="flex items-center p-[10px] gap-4" >
            //         <Image src={bike_parking} alt={`bike_parking`} className="w-5 h-5" />
            //         <div>
            //             <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Bike Parking</p>
            //             <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">{propertyDetails?.bike_parking || '----'}</p>
            //         </div>
            //     </div>
            //     <div className="flex items-center p-[10px] gap-4" >
            //         <Image src={open_parking} alt={`open_parking`} className="w-5 h-5" />
            //         <div>
            //             <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Open Parking</p>
            //             <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">{propertyDetails?.open_parking || '----'}</p>
            //         </div>
            //     </div>
            // </>
          }
          {propertyDetails?.property_in === "Commercial"
            ? (propertyDetails?.sub_type === "Office" ||
                propertyDetails?.sub_type === "Show Room" ||
                !(
                  propertyDetails?.sub_type === "Retail Shop" ||
                  propertyDetails?.sub_type === "Warehouse" ||
                  propertyDetails?.sub_type === "Plot"
                )) && (
                <div className="flex items-center p-[10px] gap-4">
                  <Image
                    src={pantry_room}
                    alt={`pantry_room`}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                      Pantry Room
                    </p>
                    <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                      {propertyDetails?.pantry_room || "----"}
                    </p>
                  </div>
                </div>
              )
            : !(
                propertyDetails?.sub_type === "Plot" ||
                propertyDetails?.sub_type === "Land"
              ) && (
                <div className="flex items-center p-[10px] gap-4">
                  <Image
                    src={servant_room}
                    alt={`servant_room`}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                      Servant Room
                    </p>
                    <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                      {propertyDetails?.servant_room || "----"}
                    </p>
                  </div>
                </div>
              )}
          <div className=" flex items-center p-[10px] gap-4">
            <Image
              src={project_area}
              alt={`project_area`}
              className="w-5 h-5 object-cover"
            />
            <div>
              <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                Project Area
              </p>
              <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                {propertyDetails?.total_project_area || "----"} Acres
              </p>
            </div>
          </div>
          {(propertyDetails?.sub_type === "Apartment" ||
            propertyDetails?.sub_type === "Flat" ||
            propertyDetails?.sub_type === "Land" ||
            propertyDetails?.sub_type === "Office" ||
            propertyDetails?.sub_type === "Retail Shop" ||
            propertyDetails?.sub_type === "Show Room" ||
            propertyDetails?.sub_type === "Independent House" ||
            propertyDetails?.sub_type === "Independent Villa") && (
            <>
              <div className=" flex items-center p-[10px] gap-4">
                <Image
                  src={project_size}
                  alt={`project_size`}
                  className="w-5 h-5 object-cover"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Built Up Area
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.builtup_area
                      ? `${propertyDetails?.builtup_area} ${propertyDetails?.area_units}`
                      : "" || "N/A"}
                  </p>
                </div>
              </div>
              <div className=" flex items-center p-[10px] gap-4">
                <Image
                  src={project_size}
                  alt={`project_size`}
                  className="w-5 h-5 object-cover"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Carpet Area
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.carpet_area
                      ? `${propertyDetails?.carpet_area} ${propertyDetails?.area_units}`
                      : "" || "N/A"}
                  </p>
                </div>
              </div>
            </>
          )}
          {(propertyDetails?.sub_type === "Plot" ||
            propertyDetails?.sub_type === "Land") && (
            <>
              <div className=" flex items-center p-[10px] gap-4">
                <Image
                  src={project_size}
                  alt={`project_size`}
                  className="w-5 h-5 object-cover"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Length Area
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.length_area
                      ? `${propertyDetails?.length_area} ${propertyDetails?.area_units}`
                      : "" || "N/A"}
                  </p>
                </div>
              </div>
              <div className=" flex items-center p-[10px] gap-4">
                <Image
                  src={project_size}
                  alt={`project_size`}
                  className="w-5 h-5 object-cover"
                />
                <div>
                  <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                    Width Area
                  </p>
                  <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                    {propertyDetails?.width_area
                      ? `${propertyDetails?.width_area} ${propertyDetails?.area_units}`
                      : "" || "N/A"}
                  </p>
                </div>
              </div>
            </>
          )}
          {(propertyDetails?.sub_type === "Independent House" ||
            propertyDetails?.sub_type === "Independent Villa" ||
            propertyDetails?.sub_type === "Plot" ||
            propertyDetails?.sub_type === "Warehouse" ||
            propertyDetails?.sub_type === "Others") && (
            <div className=" flex items-center p-[10px] gap-4">
              <Image
                src={project_size}
                alt={`project_size`}
                className="w-5 h-5 object-cover"
              />
              <div>
                <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">
                  Plot Area
                </p>
                <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">
                  {propertyDetails?.plot_area
                    ? `${propertyDetails?.plot_area} Sq.Yd`
                    : "" || "N/A"}
                </p>
              </div>
            </div>
          )}
          {/* <div className=" flex items-center justify-start  p-[10px] gap-4"
                    >
                        <Image
                            src={sizes}
                            alt={`sizes`}
                            className="w-5 h-5 object-cover"
                        />
                        <div>
                            <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Sizes</p>
                            <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">1890 sq.ft - 2890 sqft.</p>
                        </div>
                    </div>
                    <div className=" flex items-center justify-start  p-[10px] gap-4"
                    >
                        <Image
                            src={launch_date}
                            alt={`launch_date`}
                            className="w-5 h-5 object-cover"
                        />
                        <div>
                            <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Launch Date</p>
                            <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">JAN 2000.</p>
                        </div>
                    </div>
                    <div className=" flex items-center justify-start  p-[10px] gap-4"
                    >
                        <Image
                            src={possession_starts}
                            alt={`possession_starts`}
                            className="w-5 h-5 object-cover"
                        />
                        <div>
                            <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Possession Starts</p>
                            <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">JAN 2025.</p>
                        </div>
                    </div>
                    <div className=" flex items-center justify-start  p-[10px] gap-4"
                    >
                        <Image
                            src={price}
                            alt={`price`}
                            className="w-5 h-5 object-cover"
                        />
                        <div>
                            <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Avg. Price</p>
                            <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">10.45k/sq.ft</p>
                        </div>
                    </div> */}
          {/* <div className=" flex items-center justify-start  p-[10px] gap-4"
                    >
                        <Image
                            src={configuration}
                            alt={`configuration`}
                            className="w-5 h-5 object-cover"
                        />
                        <div>
                            <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] text-[#212529] font-[600] font-Montserrat">Configuration</p>
                            <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#434343] font-[600] font-Montserrat">3 BHK Apartment</p>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
}

export default Propertyoverview;
