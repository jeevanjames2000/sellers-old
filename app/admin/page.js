import Header from "@/components/header/Header";
import Authpagecontent from "@/components/shared/Authpagecontent";
import LoginformBypass from "@/components/login/LoginformBypass";

function page() {
  return (
    <div className="relative loginpage h-[100vh] ">
      <BackgroundCircles />
      <Header />
      <div className="overflow-hidden flex items-center justify-between h-[calc(100vh-65px)] 3xl:h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 sm:grid-cols-12 w-full gap-4 sm:gap-6 md:gap-[8%] lg:gap-[10%] px-4 sm:px-6 md:px-[4vw] lg:px-[6vw] items-center">
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 col-start-1">
            <Authpagecontent />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex items-center justify-center p-2 sm:p-6 md:p-10 lg:p-10 xl:p-8 2xl:p-6">
            <LoginformBypass />
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;

const BackgroundCircles = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute w-[1000px] h-[820px] bg-[#EAEAEA] rounded-full -top-[350px] " />
      <div className="absolute w-[1000px] h-[820px] bg-[#EAEAEA] rounded-full -bottom-[350px] " />
      <div className="absolute w-[1150px] h-[1000px] bg-[#F5F5F5] rounded-tl-[500px] rounded-bl-[500px] rounded-tr-0 rounded-br-0 -right-[150px] top-1/2 -translate-y-1/2 shadow-lg" />
    </div>
  );
};
