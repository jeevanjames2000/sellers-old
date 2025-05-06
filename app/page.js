import Header from "@/components/header/Header";
import React from "react";
import signup_bg from "@/public/assets/approperties-bg.png";
import Loginform from "@/components/login/Loginform";
import Authpagecontent from "@/components/shared/Authpagecontent";

function page() {
  return (
    <div
      className="loginpage h-[100vh]"
      style={{
        backgroundImage: `url(${signup_bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="overflow-hidden flex items-center justify-center h-[calc(100vh-65px)] 3xl:h-[calc(100vh-120px)]">
        <div className=" grid grid-cols-12 w-full gap-[10%] px-4 md:px-[4vw] lg:px-[6vw] items-center justify-between">
          {/* Left Column */}
                   <Authpagecontent />
          {/* Right Column */}
          <div className="flex items-center justify-center col-span-12 md:col-span-6 px-3">
            <Loginform />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
