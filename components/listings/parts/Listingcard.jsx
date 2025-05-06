import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import list_icon from "@/public/assets/list.svg";
import tenantsimage from "@/public/assets/tenants_image.svg";
import imageplacholder from "@/public/assets/imgeplaceholder.jpg";
import Link from "next/link";
import Image from "next/image";
function Listingcard({
  unique_property_id,
  image,
  openDeleteModal,
  bedrooms,
  property_cost,
  property_subtype,
  property_name,
  furnished_status,
  enquirescount,
  last_added_date,
  expiry_date,
  facing,
  property_for,
  monthly_rent,
  property_status,
}) {
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(2) + " Cr"; // Crores
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2) + " L"; // Lakhs
    } else if (price >= 1000) {
      return (price / 1000).toFixed(2) + " K"; // Thousands
    }
    return price;
  };

  let updated_date;
  if (last_added_date) {
    let lastupdateddate = new Date(last_added_date);
    if (!isNaN(lastupdateddate.getTime())) {
      updated_date = lastupdateddate.toISOString().split("T")[0];
    } else {
      updated_date = "N/A";
    }
  }

  return (
    <div className="bg-[#FFFFFF] rounded-[8px]">
      <div className="px-1 sm:px-4 py-2 flex items-center justify-between border-b border-[#D7D8D9] flex-wrap">
        <p className="text-[#455A64] font-[600] text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px]">
          ID : {unique_property_id}
        </p>
        <div className="flex gap-4 lg:gap-10 w-full xs:w-fit justify-between">
          <Link
            href={`/enquiry?unique_property_id=${unique_property_id}`}
            className="text-[#1D3A76] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600]"
          >
            View Enquiries
          </Link>
          <button className="text-[#1D3A76] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600]">
            + Advanced Details
          </button>
          <Link
            href={`/propertydetails/${unique_property_id}`}
            className="flex items-center gap-2 text-[#1D3A76] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600]"
          >
            <Image
              src={list_icon}
              alt="list_icon"
              className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8 sm:mr-6"
            />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-6 lg:grid-cols-12 w-full">
        <div className=" flex flex-col xxm:flex-row col-span-6 h-full gap-3">
          <Link href={`/propertydetails/${unique_property_id}`}>
            <Image
              src={image || imageplacholder}
              alt={"property"}
              className="object-cover h-36 w-52 rounded-bl-[8px]"
              height={100}
              width={150}
            />
          </Link>
          {/* Text Content Section */}
          <div className="px-2 xxm:px-0 space-y-2 py-2">
            <p className="text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[700] text-[#6d6c6c]">
              {property_name || ""}
            </p>
            <p className="text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[700] text-[#6d6c6c]">
              {property_for === "Sell"
                ? `₹ ${formatPrice(property_cost)}`
                : ` ₹ ${formatPrice(monthly_rent)} Rent`}
            </p>
            <div className="flex flex-row items-center gap-2">
              {(property_subtype === "Apartment" ||
                property_subtype === "Flat" ||
                property_subtype === "Independent House" ||
                property_subtype === "Independent Villa") && (
                <p className="text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[700] text-[#6d6c6c]">
                  {`${bedrooms} BHK`}{" "}
                </p>
              )}
              <p className=" flex-wrap text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[700] text-[#6d6c6c]">
                {property_subtype || ""}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              {(property_subtype === "Apartment" ||
                property_subtype === "Independent House" ||
                property_subtype === "Independent Villa") && (
                <p className="text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[600] text-[#757575]">
                  {furnished_status
                    ? furnished_status === "Unfurnished"
                      ? `${furnished_status}`
                      : `${furnished_status} Furnished`
                    : ""}
                </p>
              )}
              <p className="text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[600] text-[#757575]">
                <span className="">
                  {facing ? `${facing} facing` : "-----"}
                </span>
              </p>
            </div>
            <div className=" flex flex-row items-center justify-start gap-2 pt-2">
              <Image
                src={tenantsimage}
                alt={"tenantsimage"}
                className="object-cover h-4 w-4"
                height={100}
                width={100}
              />
              <p className="text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[400] text-[#1D3A76] pt-1">
                {enquirescount} Enquires
              </p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col col-span-6 py-3 justify-between">
          <div className="flex px-2 lg:px-0 gap-2 pr-4">
            <p className=" flex flex-col text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[400] text-[#6d6c6c] ">
              Last Updated
              <span className="font-[600] block pt-2"> {updated_date}</span>
            </p>
            <p className=" flex flex-col text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[400] text-[#6d6c6c] border-l-[0.09rem] border-r-[0.09rem] border-[#909090] px-3 mx-4 ">
              Expiry on
              <span className="font-[600] block pt-2"> {expiry_date}</span>
            </p>
            <p className="text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[400] text-[#6d6c6c]">
              Visibility
              <span className="block font-[400] pt-2 text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] text-[#BC405E]">
                Low{" "}
                <span className="text-[#6d6c6c] font-[600]">(Freeplan)</span>
              </span>
            </p>
            {property_status === 1 ? (
              <p className="flex items-center text-[7px] xs:text-[9px] 2xl:text-[13px] 3xl:text-[15px] 4xl:text-[17px] font-[700] justify-end text-[#ffffff] bg-[#038AC9] h-4 2xl:h-5 3xl:h-6 4xl:h-7 px-2 2xl:px-3 3xl:px-4 4xl:px-5 rounded-l-full rounded-r-full">
                Active
              </p>
            ) : property_status === 2 ? (
              <p className="flex items-center text-[7px] xs:text-[9px] 2xl:text-[13px] 3xl:text-[15px] 4xl:text-[17px] font-[700] justify-end text-[#ffffff] bg-[#ff8d00] h-4 2xl:h-5 3xl:h-6 4xl:h-7 px-2 2xl:px-3 3xl:px-4 4xl:px-5 rounded-l-full rounded-r-full">
                Review
              </p>
            ) : (
              <p className="flex items-center text-[7px] xs:text-[9px] 2xl:text-[13px] 3xl:text-[15px] 4xl:text-[17px] font-[700] justify-end text-[#ffffff] bg-[#ea352e] h-4 2xl:h-5 3xl:h-6 4xl:h-7 px-2 2xl:px-3 3xl:px-4 4xl:px-5 rounded-l-full rounded-r-full">
                Pending
              </p>
            )}
          </div>
          <div className="flex px-2 lg:px-0 flex-wrap items-center justify-center pt-1 lg:pt-0 xxm:justify-start gap-4 ">
            <Link
              href={`/addproperty?active_step=basicdetails&status=completed&unique_property_id=${unique_property_id}`}
              className="flex items-center justify-center text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] text-[#ffffff] bg-[#038AC9] h-5 2xl:h-6 3xl:h-7 4xl:h-8 px-3 2xl:px-4 3xl:px-5 4xl:px-6 rounded-l-full rounded-r-full gap-2"
            >
              Edit
              <IconEdit size={14} stroke={1.5} />
            </Link>
            <button
              onClick={() => openDeleteModal(unique_property_id)}
              className="flex items-center justify-center  text-[8px] xs:text-[10px] 2xl:text-[14px] 3xl:text-[16px] 4xl:text-[18px] font-[700] text-[#ffffff]  bg-[#A5413F] h-5 2xl:h-6 3xl:h-7 4xl:h-8 px-3 2xl:px-4 3xl:px-5 4xl:px-6 rounded-l-full rounded-r-full gap-2"
            >
              Delete
              <IconTrash size={14} stroke={1.5} />
            </button>
            <button className="py-1 h-7 rounded-[2px] flex flex-row items-center justify-center text-[#ffffff] px-4  bg-[#59788E]  text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[700] ml-3">
              View Analytics
            </button>
            <button className="py-1 h-7 rounded-[2px] flex flex-row items-center justify-center text-[#ffffff] px-4  bg-[#59788E]  text-[9px] xs:text-[11px] 2xl:text-[15px] 3xl:text-[17px] 4xl:text-[19px] font-[700]">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listingcard;
