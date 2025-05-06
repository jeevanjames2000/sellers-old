import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import person_with_laptop from "@/public/assets/person_with_laptop.png";

function Authpagecontent() {
  return (
    <div className="col-span-5 space-y-3 hidden md:block">
      <p className="heading1  text-[#ffffff] text-md font-[600] font-sans">
        Free Listings for Builders & Partners!
      </p>
      <div className="space-y-2">
        <p className="heading2 text-[#ffffff] font-[600] font-sans text-[14px]">
          Attention Builders & Channel Partners!{" "}
        </p>
        <p className="heading3 text-[#ffffff] font-[400] font-sans text-[13px]">
          Meet Owner is offering FREE PROPERTY LISTINGS to help you showcase
          your projects to the right audience.
        </p>
      </div>
      <div className="space-y-1">
        <p className="heading3 text-[#ffffff] font-[400] font-sans text-[13px]">
          Why Choose Meet Owner?
        </p>
        <p className="heading3 text-[#ffffff] text-[13px] font-[400] font-sans">
          <IconArrowRight size={20} className="mr-[8px] inline-flex" />
          Direct connections with buyers & tenants
        </p>
        <p className="heading3 text-[#ffffff] text-[13px] font-[400] font-sans">
          <IconArrowRight size={20} className="mr-[8px] inline-flex" />
          Showcase your properties with ease
        </p>
        <p className="heading3 text-[#ffffff] text-[13px] font-[400] font-sans">
          <IconArrowRight size={20} className="mr-[8px] inline-flex" />
          Don’t wait! Start listing your properties today!
        </p>
      </div>
      <div className="pt-0 2xl:pt-[4%]">
        <Image
          src={person_with_laptop}
          alt="Person with Laptop"
          className="mt-6 md:w-[70%] 2xl:h-fit 2xl:w-[90%] 3xl:h-fit 3xl:w-[80%] object-cover"
          height={200}
          width={300}
        />
      </div>
    </div>
  );
}

export default Authpagecontent;
