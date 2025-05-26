import React from "react";
import { IconCheckbox } from "@tabler/icons-react";
import Image from "next/image";
import person_with_laptop from "@/public/assets/signup_image1.png";

function AuthpageContentSignup() {
  return (
    <div className="w-full space-y-3 pt-2 sm:pt-3 md:pt-4 lg:pt-5 hidden sm:block">
      <p className="heading1 text-[#1D3A76] font-[600] font-sans text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">
        Free Listings for Builders & Partners!
      </p>

      <div className="space-y-2">
        <p className="heading2 text-[#1D3A76] font-[600] font-sans text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
          Attention Builders & Channel Partners!
        </p>
        <p className="heading3 text-black font-[400] font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px]">
          Meet Owner is offering FREE PROPERTY LISTINGS to help you showcase
          your projects to the right audience.
        </p>
      </div>

      <div className="space-y-1">
        <p className="heading3 text-[#1D3A76] font-[400] font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px]">
          Why Choose Meet Owner?
        </p>
        <p className="heading3 text-black font-[400] font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px]">
          Direct connections with buyers & tenants
          <IconCheckbox
            size={12}
            className="ml-1 inline sm:size-[13px] md:size-[14px] lg:size-[16px] xl:size-[18px] 2xl:size-[20px]"
            color="#1D3A76"
          />
        </p>
        <p className="heading3 text-black font-[400] font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px]">
          Showcase your properties with ease
          <IconCheckbox
            size={12}
            className="ml-1 inline sm:size-[13px] md:size-[14px] lg:size-[16px] xl:size-[18px] 2xl:size-[20px]"
            color="#1D3A76"
          />
        </p>
        <p className="heading3 text-black font-[400] font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px]">
          Don’t wait! Start listing your properties today!
          <IconCheckbox
            size={12}
            className="ml-1 inline sm:size-[13px] md:size-[14px] lg:size-[16px] xl:size-[18px] 2xl:size-[20px]"
            color="#1D3A76"
          />
        </p>
      </div>

      <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-2 xl:pt-4 2xl:pt-[2%] flex justify-center">
        <Image
          src={person_with_laptop}
          alt="Person with Laptop"
          className="mt-2 w-full max-w-[200px] sm:max-w-[220px] md:max-w-[250px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px] object-cover"
          height={200}
          width={300}
          sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, (max-width: 1024px) 250px, (max-width: 1280px) 350px, (max-width: 1536px) 400px, 450px"
        />
      </div>
    </div>
  );
}

export default AuthpageContentSignup;
