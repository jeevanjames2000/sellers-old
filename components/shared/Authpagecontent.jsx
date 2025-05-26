import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import person_with_laptop from "@/public/assets/signup_image1.png";

function Authpagecontent() {
  return (
    <div className="col-span-5 space-y-3 hidden md:block">
      <div className="pt-0 2xl:pt-[4%]">
        <Image
          src={person_with_laptop}
          alt="Person with Laptop"
          className="mt-6 md:w-[90%] xl:w-[85%] 2xl:h-fit 2xl:w-[90%] 3xl:h-fit 3xl:w-[80%] object-cover"
          height={400}
          width={300}
        />
      </div>
    </div>
  );
}

export default Authpagecontent;
