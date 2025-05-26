import Header from "@/components/header/Header";
import Signupform from "@/components/signup/Signupform";
import Userapi from "@/components/api/Userapi";
import Generalapi from "@/components/api/Generalapi";
import AuthpagecontentSingup from "../../components/shared/AuthpageContentSignup";
async function page() {
  const getusertypesfetch = await getUsertypesfetch();
  if (getusertypesfetch.status === "error") {
    return (
      <div>
        <p>Error fetching order types</p>
      </div>
    );
  }
  const usertypedata = getusertypesfetch.usertypedata;
  const filteredusertypedata = usertypedata.filter(
    (type) =>
      type.label !== "admin" &&
      type.label !== "user" &&
      type.label != "Manager" &&
      type.label != "TeleCaller" &&
      type.label != "Marketing Executive" &&
      type.label != "Customer Support" &&
      type.label != "Customer Service"
  );
  const getcities = await getCities();
  if (getcities.status === "error") {
    return (
      <div>
        <p>Error fetching cities</p>
      </div>
    );
  }
  const cities = getcities.cities;
  return (
    <div className="relative loginpage h-[100vh] overflow-hidden">
      <BackgroundCircles />
      <Header />
      <div
        className="flex justify-center items-center h-[calc(100vh-65px)] 
      xs:h-[calc(100vh-50px)] sm:h-[calc(100vh-55px)] 
      md:h-[calc(100vh-60px)] lg:h-[calc(100vh-65px)] 
      xl:h-[calc(100vh-70px)] 2xl:h-[calc(100vh-80px)] 
      3xl:h-[calc(100vh-120px)]"
      >
        <div
          className="grid grid-cols-12 w-full gap-6 
        xs:px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-40 3xl:px-60 
        items-center justify-center"
        >
          <div className="hidden sm:block sm:col-span-6 lg:col-span-5 xl:col-span-6 2xl:col-span-6">
            <AuthpagecontentSingup />
          </div>

          <div
            className="col-span-12 sm:col-span-6 md:col-span-9 md:items-center p-2 lg:col-span-7 xl:col-span-6 2xl:col-span-6
           flex items-center justify-center 
          xs:p-4 sm:p-6 md:p-10 lg:p-10 xl:p-18 2xl:p-14 "
          >
            <Signupform usertypedata={filteredusertypedata} cities={cities} />
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
      <div
        className="absolute w-[600px] h-[500px] bg-[#EAEAEA] rounded-full 
        -top-[200px] sm:w-[800px] sm:h-[650px] sm:-top-[300px] 
        md:w-[900px] md:h-[750px] md:-top-[350px] 
        lg:w-[1000px] lg:h-[820px] lg:-top-[350px] 
        xl:w-[1100px] xl:h-[900px] xl:-top-[400px]"
      />
      <div
        className="absolute w-[600px] h-[500px] bg-[#EAEAEA] rounded-full 
        -bottom-[200px] sm:w-[800px] sm:h-[650px] sm:-bottom-[300px] 
        md:w-[900px] md:h-[750px] md:-bottom-[350px] 
        lg:w-[1000px] lg:h-[820px] lg:-bottom-[350px] 
        xl:w-[1100px] xl:h-[900px] xl:-bottom-[400px]"
      />
      <div
        className="absolute w-[700px] h-[600px] bg-[#EAEAEA] rounded-tl-[350px] rounded-bl-[350px] rounded-tr-0 rounded-br-0 
        -right-[100px] top-1/2 -translate-y-1/2 shadow-lg 
        sm:w-[900px] sm:h-[750px] sm:rounded-tl-[450px] sm:rounded-bl-[450px] sm:-right-[120px] 
        md:w-[1000px] md:h-[850px] md:rounded-tl-[500px] md:rounded-bl-[500px] md:-right-[130px] 
        lg:w-[1150px] lg:h-[1000px] lg:rounded-tl-[575px] lg:rounded-bl-[575px] lg:-right-[150px] 
        xl:w-[1250px] xl:h-[1100px] xl:rounded-tl-[625px] xl:rounded-bl-[625px] xl:-right-[160px]"
      />
    </div>
  );
};
async function getUsertypesfetch() {
  try {
    const response = await Userapi.get("/usertypes");
    const data = response.data;
    if (data.status === "error") {
      let data = {
        status: "error",
        message: "Error fetching user types",
        usertypedata: [],
      };
      return data;
    }
    let finaldata = {
      status: "success",
      message: "user types fetched successfully",
      usertypedata: data.usertypes,
    };
    return finaldata;
  } catch (error) {
    console.error("Error fetching user types:", error);
    let finaldata = {
      status: "error",
      message: "Error fetching user types",
      usertypedata: [],
    };
    return finaldata;
  }
}
async function getCities() {
  try {
    const response = await Generalapi.get("/getcities");
    const data = response.data;
    if (data.status === "error") {
      let data = {
        status: "error",
        message: "Error fetching cities",
        cities: [],
      };
      return data;
    }
    let finaldata = {
      status: "success",
      message: "cities fetched successfully",
      cities: data.cities,
    };
    return finaldata;
  } catch (error) {
    console.error("Error fetching cities:", error);
    let finaldata = {
      status: "error",
      message: "Error fetching cities",
      cities: [],
    };
    return finaldata;
  }
}
