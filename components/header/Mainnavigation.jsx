"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserDetails } from "../zustand/useUserDetails";
import LoadingOverlay from "../shared/LoadingOverlay";
const Mainnavigation = () => {
  const [isLoadingEffect, setIsLoadingEffect] = useState(false);
  const resetAuthdetails = useUserDetails((state) => state.resetAuthdetails);
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    setIsLoadingEffect(true);
    resetAuthdetails();
    setTimeout(() => {
      setIsLoadingEffect(false);
      // resetAuthdetails();
      sessionStorage.clear();
      localStorage.clear();
      router.push("/");
    }, 2000);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between px-5 md:px-0 gap-5 md:gap-10">
        <Link
          href="/dashboard"
          className={`font-semibold w-fit text-sm 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1D3A76] ${
            isActive("/dashboard") ? "border-b-2 border-[#1D3A76]" : ""
          }`}
          prefetch={true}
        >
          {" "}
          Dashboard
        </Link>
        <Link
          href="/enquiry"
          className={`font-semibold w-fit text-sm 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1D3A76] ${
            isActive("/enquiry") ? "border-b-2 border-[#1D3A76]" : ""
          }`}
        >
          {" "}
          Enquires
        </Link>
        <Link
          href="/listings"
          className={`font-semibold w-fit text-sm 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1D3A76] ${
            isActive("/listings") ? "border-b-2 border-[#1D3A76]" : ""
          }`}
          prefetch={true}
        >
          Listings
        </Link>
        <Link
          href="/packages"
          className={`font-semibold w-fit text-sm 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1D3A76] ${
            isActive("/packages") ? "border-b-2 border-[#1D3A76]" : ""
          }`}
          prefetch={true}
        >
          Packages
        </Link>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="relative"
        >
          <Link
            href="#"
            className=" font-semibold text-sm 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#1D3A76] w-fit"
          >
            More
          </Link>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                style={{ translateX: "-50%", zIndex: 99999 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute left-20 top-8 bg-white text-black shadow-md rounded-sm"
              >
                <div className="w-[170px] p-4 flex flex-col gap-3">
                  <Link href="/myprofile">
                    <p className="text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#909090] font-semibold">
                      My Profile
                    </p>
                  </Link>
                  <Link href="/invoice">
                    <p className="text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#909090] font-semibold">
                      Invoice
                    </p>
                  </Link>
                  <Link href="https://meetowner.in/" target="_blank">
                    <p className="text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] text-[#909090] font-semibold">
                      Go to MeetOwner.in
                    </p>
                  </Link>
                  <div>
                    <div className="border-[1px] mb-2"></div>
                    <div onClick={handleLogout} className="cursor-pointer">
                      <p className="text-[12px] text-[#D23F4F] font-semibold text-center ">
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <LoadingOverlay isLoading={isLoadingEffect} />
    </>
  );
};

export default Mainnavigation;
