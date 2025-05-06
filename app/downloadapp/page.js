import Image from "next/image";
import downloadapp_bg from "@/public/assets/downloadapp_bg.png";
// import google_play from '@/public/assets/google_play.png'
import google_play from "@/public/assets/playstore.webp";
import downloadap_bg from "@/public/assets/downloadapp-pg.png";
import Header from "@/components/header/Header";
import Link from "next/link";

function page() {
  return (
    <>
      <Header />
      <div
        className="downloadapp px-4 sm:px-[10%] sm:space-y-0 py-6 sm:py-12 grid grid-cols-12 items-center justify-center bg-[#ffffff]  h-[calc(screen-65px)] md:h-[calc(100vh-65px)] 3xl:h-[calc(100vh-120px)]"
        style={{
          backgroundImage: `url(${downloadapp_bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Left Column */}
        <div className="space-y-2 sm:space-y-5 col-span-12 sm:col-span-6 h-[100%] flex flex-col items-start justify-center">
          <p className="text-[#1D3A76] font-[700] text-[20px] md:text-[32] ">
            Meet Owner on the Go!
          </p>
          <p className="text-[#5C5C5C] font-[400] text-[12px] sm:text-[16px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text[32px] w-full sm:w-[65%]">
            Download our top-rated app, made just for you! It’s free, easy and
            smart.
          </p>
          <div className="custom-shadow bg-[#FFFFFF] p-4 rounded-[24px] w-fit space-y-4">
            {/* <div className="flex space-x-2">
                             <Image
                                src={qrcode_1}
                                className="h-[100%] w-[100%] object-cover"
                                alt="qrcode_1"
                            />
                            <Image
                                src={qrcode_2}
                                className="h-[100%] w-[100%] object-cover"
                                alt="qrcode_2"
                            /> 
                        </div> */}
            <div className="w-full">
              <Link href="https://play.google.com/store/apps/details?id=com.meetowner.app&pcampaignid=web_share">
                <Image
                  src={google_play}
                  className="w-[180px] object-cover cursor-pointer"
                  alt="google_play"
                  width={200}
                  height={100}
                />
              </Link>
              {/* <Image
                                src={app_store}
                                className="h-full w-full object-cover cursor-pointer"
                                alt="app_store"
                            /> */}
            </div>
            {/* <div className="flex border-[0.82px] border-[#000000] rounded-[8px]">
                            <Textinput
                                placeholder="Enter mobile number"
                                inputClassName="text-[10px] border-none focus:outline-none focus:ring-0 shadow-none border-0 bg-[#fffffff] rounded-[8px]"
                            />
                            <button className="bg-[#1D3A76] text-[#ffffff] ml-auto px-1 md:px-4 rounded-[8px] rounded-tl-none rounded-bl-none">
                                Send Link
                            </button>
                        </div> */}
          </div>
        </div>
        {/* Right Column */}
        <div className="col-span-12 sm:col-span-6 flex items-center justify-center h-[100%] sm:h-[100%] lg:h-[95%] pt-10 md:pt-0">
          <Image
            src={downloadap_bg}
            className="object-cover h-full w-fit"
            alt="downloadap_bg"
          />
        </div>
      </div>
    </>
  );
}

export default page;
