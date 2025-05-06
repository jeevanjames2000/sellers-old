"use client";
import Generalapi from "@/components/api/Generalapi";
import Propertyapi from "@/components/api/Propertyapi";
import Errorpanel from "@/components/shared/Errorpanel";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import { usePropertyDetails } from "@/components/zustand/usePropertyDetails";
import { useUserDetails } from "@/components/zustand/useUserDetails";
import { Modal, Select, Textinput } from "@nayeshdaggula/tailify";
import { IconArrowNarrowLeft, IconAsterisk } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Addresswrapper({ updateActiveTab, addressDetails }) {
  const userInfo = useUserDetails((state) => state.userInfo);
  let user_id = userInfo?.user_id || null;
  let access_token = userInfo?.access_token || null;
  const getpropertyDetails = usePropertyDetails(
    (state) => state.propertydetails
  );

  const searchParams = useSearchParams();
  const unique_property_id = searchParams.get("unique_property_id");

  const [isLoadingEffect, setIsLoadingEffect] = useState(false);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const updateCity = (value) => {
    setCity(value);
    setCityError(false);
    // if (value !== '') {
    //   setIsLoadingLocality(true)
    //   // getAllLocalities(value)
    // }
    setLocality("");
  };

  const [propertyName, setPropertyName] = useState("");
  const [propertyNameError, setPropertyNameError] = useState("");
  const updatePropertyName = (value) => {
    setPropertyNameError("");
    if (value.length > 2) {
      searchProjects(value);
      setProjectDropdown(true);
    } else {
      setProjectsData([]);
    }
    if (value === "") {
      setProjectsData([]);
      setProjectDropdown(false);
    }
    setPropertyName(value);
  };

  const [locality, setLocality] = useState("");
  const [localityError, setLocalityError] = useState("");
  const [localitiesData, setLocalitiesData] = useState([]);
  const updateLocality = (value) => {
    if (value.length > 2) {
      // getAllLocalities(value, city);
      setLocalityDropdown(true);
    } else {
      setLocalitiesData([]);
    }
    if (value === "") {
      setLocalitiesData([]);
      setLocalityDropdown(false);
    }
    setLocality(value);
    setLocalityError("");
  };

  const [flatNo, setFlatNo] = useState("");
  const [flatNoError, setFlatNoError] = useState("");
  const updateFlatNo = (e) => {
    let value = e.target.value;
    setFlatNo(value);
    setFlatNoError("");
  };

  const [floorNo, setFloorNo] = useState("");
  const [floorNoError, setFloorNoError] = useState("");
  const updateFloorNo = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    if (value > 100) {
      setFloorNoError("Please enter floor no less than 100");
      return false;
    }
    setFloorNo(value);
    setFloorNoError("");
  };

  const [totalFloors, setTotalFloors] = useState("");
  const [totalFloorsError, setTotalFloorsError] = useState("");
  const updateTotalFloors = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    if (value > 100) {
      setTotalFloorsError("Please enter total floors less than 100");
      return false;
    }
    setTotalFloors(value);
    setTotalFloorsError("");
  };

  const [plotNumber, setPlotNumber] = useState("");
  const [plotNumberError, setPlotNumberError] = useState("");
  const updatePlotNumber = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setPlotNumber(value);
    setPlotNumberError("");
  };

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };
  const [errorMessages, setErrorMessages] = useState({});
  const updateAddress = () => {
    setIsLoadingEffect(true);
    if (city === "") {
      setIsLoadingEffect(false);
      toast.error("Please select city", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCityError("please enter city");
      return false;
    }
    if (propertyName === "") {
      setIsLoadingEffect(false);
      toast.error("Please enter Property name", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPropertyNameError("Please enter Property name");
      return false;
    }
    if (locality === "") {
      setIsLoadingEffect(false);
      toast.error("Please Enter locality", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLocalityError("please enter locality");
      return false;
    }
    if (
      !(
        getpropertyDetails?.property_sub_type === "Plot" ||
        getpropertyDetails?.property_sub_type === "Land"
      )
    ) {
      if (!flatNo) {
        setIsLoadingEffect(false);
        toast.error("Please Enter Flat No.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFlatNoError("please enter flat no");
        return false;
      }
      if (
        getpropertyDetails?.property_in === "Commercial" ||
        getpropertyDetails.property_sub_type !== "Independent Villa"
      ) {
        if (!floorNo) {
          setIsLoadingEffect(false);
          toast.error("Please Enter Floor No.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFloorNoError("Please enter floor no");
          return false;
        }
        if (floorNo > 100) {
          setIsLoadingEffect(false);
          toast.error("Please Enter Floor No. less than 100", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFloorNoError("Please enter floor no less than 100");
          return false;
        }
      }
      if (!totalFloors) {
        setIsLoadingEffect(false);
        toast.error("Please Enter Total Floors.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTotalFloorsError("please enter total floors");
        return false;
      }
      if (totalFloors > 100) {
        setIsLoadingEffect(false);
        toast.error("Please Enter Total Floors less than 100.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTotalFloorsError("please enter total floors less than 100");
        return false;
      }
    } else {
      if (!plotNumber) {
        setIsLoadingEffect(false);
        toast.error("Please Enter Plot No.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPlotNumberError("please enter plot no");
        return false;
      }
    }

    Propertyapi.post(
      "/addAddressdetails",
      {
        city_id: city,
        unit_flat_house_no: flatNo,
        plot_number: plotNumber,
        property_name: propertyName,
        floors: floorNo,
        total_floors: totalFloors,
        location_id: locality,
        unique_property_id: unique_property_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then((response) => {
        let data = response.data;
        if (data.status === "error") {
          let finalresponse = {
            message: data.message,
            server_res: data,
          };
          setErrorMessages(finalresponse);
          setErrorModalOpen(true);
          setIsLoadingEffect(false);
          return false;
        }
        toast.success("address details added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        let property_id = data?.property?.unique_property_id;
        updateActiveTab("photos", "inprogress", property_id);
      })
      .catch((error) => {
        console.log(error);
        let finalresponse;
        if (error.response !== undefined) {
          finalresponse = {
            message: error.message,
            server_res: error.response.data,
          };
        } else {
          finalresponse = {
            message: error.message,
            server_res: null,
          };
        }
        setErrorMessages(finalresponse);
        setErrorModalOpen(true);
        setIsLoadingEffect(false);
        return false;
      });
  };

  useEffect(() => {
    if (addressDetails !== null) {
      setCity(addressDetails?.city_id || "");
      // if (addressDetails?.city_id) {
      //   setIsLoadingLocality(true)
      //   getAllLocalities(addressDetails?.city_id || '')
      // }
      setPropertyName(addressDetails?.property_name || "");
      setFlatNo(addressDetails?.unit_flat_house_no || "");
      setFloorNo(addressDetails?.floors || "");
      setTotalFloors(addressDetails?.total_floors || "");
      setLocality(addressDetails?.location_id || "");
      setPlotNumber(addressDetails?.plot_number || "");

      if (addressDetails?.location_id || addressDetails?.city_id) {
        setIsLoadingLocality(true);
        getAllLocalities(addressDetails?.location_id, addressDetails?.city_id);
      }
    }
  }, [addressDetails]);

  const [allCities, setAllCities] = useState([]);
  const getAllCities = () => {
    Generalapi.get("getcities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        let data = response.data;
        if (data.status === "error") {
          let finalResponse = {
            message: data.message,
            server_res: data,
          };
          setErrorMessages(finalResponse);
          setErrorModalOpen(true);
        }
        if (data.status === "success") {
          setAllCities(data?.cities || []);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        let finalresponse;
        if (error.response !== undefined) {
          finalresponse = {
            message: error.message,
            server_res: error.response.data,
          };
        } else {
          finalresponse = {
            message: error.message,
            server_res: null,
          };
        }
        setErrorMessages(finalresponse);
        setErrorModalOpen(true);
        return false;
      });
  };

  const [isLoadingLocality, setIsLoadingLocality] = useState(false);
  // const [allLocalities, setAllLocalities] = useState([])
  const getAllLocalities = (input, city_id) => {
    setIsLoadingLocality(true);
    Generalapi.get("getlocalitiesbycitynamenew", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        input: input,
        city_id: city_id,
      },
    })

      .then((response) => {
        setIsLoadingLocality(false);
        let data = response.data;
        if (data.status === "error") {
          let finalResponse = {
            message: data.message,
            server_res: data,
          };
          setErrorMessages(finalResponse);
          setErrorModalOpen(true);
        }
        if (data.status === "success") {
          setLocalitiesData(data?.places || []);
          return false;
        }
      })
      .catch((error) => {
        setIsLoadingLocality(false);
        console.log(error);
        let finalresponse;
        if (error.response !== undefined) {
          finalresponse = {
            message: error.message,
          };
        } else {
          finalresponse = {
            message: error.message,
          };
        }
        setErrorMessages(finalresponse);
        setErrorModalOpen(true);
        return false;
      });
  };
  // function searchLocality(searchTerm) {
  //   const localities = allLocalities.filter(item => item.value.toLowerCase().includes(searchTerm.toLowerCase()));
  //   if (localities.length === 0) {
  //     setLocalitiesData([])
  //   } else {
  //     setLocalitiesData(localities)
  //   }
  // }
  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const response = await fetch(
          `https://api.meetowner.in/api/v1/search?query=${locality}&city=Hyderabad`
        );
        const data = await response.json();
        setLocalitiesData(data);
      } catch (err) {
        console.error("Failed to fetch localities:", err);
      }
    };
    fetchLocalities();
  }, [locality]);
  const [localityDropdown, setLocalityDropdown] = useState(false);
  const handleLocalitySelect = (localityName) => {
    setLocality(localityName);
    setLocalityDropdown(false);
  };

  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const getAllProjects = () => {
    setIsLoadingProjects(true);
    Propertyapi.get("getprojects", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        setIsLoadingProjects(false);
        let data = response.data;
        if (data.status === "error") {
          let finalResponse = {
            message: data.message,
            server_res: data,
          };
          setErrorMessages(finalResponse);
          setErrorModalOpen(true);
        }
        if (data.status === "success") {
          setAllProjects(data?.projects || []);
          return false;
        }
      })
      .catch((error) => {
        setIsLoadingProjects(false);
        console.log(error);
        let finalresponse = {
          message: error.message,
        };
        setErrorMessages(finalresponse);
        setErrorModalOpen(true);
        return false;
      });
  };

  function searchProjects(searchTerm) {
    const projects = allProjects.filter((item) =>
      item.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (projects.length === 0) {
      setProjectsData([]);
    } else {
      setProjectsData(projects);
    }
  }

  const [projectsData, setProjectsData] = useState([]);
  const [projectDropdown, setProjectDropdown] = useState(false);
  const handleProjectSelect = (projectName) => {
    setPropertyName(projectName);
    setProjectDropdown(false);
  };

  const handleSelectNewProject = (value) => {
    setProjectDropdown(false);
    setPropertyName(value);
  };

  useEffect(() => {
    if (
      getpropertyDetails?.property_in !== "Commercial" &&
      getpropertyDetails?.property_for !== "Sell"
    ) {
      setFloorNo("");
      setTotalFloors("");
    }
  }, [getpropertyDetails]);

  useEffect(() => {
    getAllCities();
    getAllProjects();
  }, []);

  return (
    <>
      <div className="relative">
        <div className="py-2 bg-[#E2EAED]">
          <div className="flex justify-start items-center px-5">
            <div
              className="w-9 cursor-pointer"
              onClick={() =>
                updateActiveTab(
                  "propertydetails",
                  "completed",
                  unique_property_id
                )
              }
            >
              <IconArrowNarrowLeft size={18} color="#1D3A76" />
            </div>
            <p className=" w-full text-lg font-bold text-[#1D3A76] text-center font-sans">
              Add Address
            </p>
          </div>
        </div>
        <div className="w-full overflow-y-auto px-5 py-3 h-[calc(100vh-280px)] sm:h-[calc(100vh-220px)]">
          <div className="mb-5">
            <div className="w-[100%]">
              <Select
                label="City"
                labelClassName="!text-[#1D3A76] text-[13px] font-medium font-sans"
                data={allCities}
                searchable
                withAsterisk
                value={city}
                onChange={updateCity}
                inputClassName="focus:ring-blue-500 focus:border-blue-500"
                className="!m-0 !p-0"
                dropdownClassName="min-h-[100px] max-h-[200px] z-50 overflow-y-auto"
              />
            </div>
            {cityError && (
              <p className="text-[#FF0000] text-xs font-sans">
                Please select one
              </p>
            )}
          </div>

          <div className="my-4">
            <div className="flex gap-1">
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                Property/Project Name
              </p>
              <IconAsterisk size={8} color="#FF0000" />
            </div>
          </div>
          {isLoadingProjects ? (
            <div className="w-full flex justify-center items-center">
              <div className="w-5 h-5 border-2 border-t-2 border-[#1D3A76] rounded-full animate-spin"></div>
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans ml-2">
                Fetching Projects...
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-row items-center  my-4 h-2 sm:h-4 ">
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => updatePropertyName(e.target.value)}
                  placeholder="Search Projects"
                  className="w-full border border-l-0 border-r-0 border-t-0 border-b-[#dcdada] text-[13px] rounded-r-md py-[5px]  focus:outline-none"
                />
              </div>
              {propertyNameError && (
                <p className="text-red-500 text-[10px] mt-2">
                  {propertyNameError}
                </p>
              )}
            </>
          )}
          {projectDropdown && (
            <>
              {projectsData.length > 0 ? (
                <ul className="w-full bg-white border border-[#1D3A76] rounded-md shadow-lg max-h-48 overflow-auto z-50">
                  {projectsData.map((loc, index) => (
                    <li
                      key={index}
                      onClick={() => handleProjectSelect(loc.value)}
                      className="px-4 py-2 cursor-pointer hover:bg-[#1D3A76] hover:text-white"
                    >
                      {loc.label}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="w-full bg-white border border-[#1D3A76] rounded-md shadow-lg max-h-48 overflow-auto z-50">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-[#1D3A76] hover:text-white"
                    onClick={() => handleSelectNewProject(propertyName)}
                  >
                    Add - {propertyName}
                  </li>
                </ul>
              )}
            </>
          )}
          <div className="my-4">
            <div className="flex gap-1">
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                Locality
              </p>
              <IconAsterisk size={8} color="#FF0000" />
            </div>
          </div>
          <>
            <div className="flex flex-row items-center  my-4 h-2 sm:h-4 ">
              <input
                type="text"
                value={locality}
                onChange={(e) => updateLocality(e.target.value)}
                placeholder="Search location"
                className="w-full border border-l-0 border-r-0 border-t-0 border-b-[#dcdada] text-[13px] rounded-r-md py-[5px]  focus:outline-none"
              />
            </div>
            {/* {localityError && (
              <p className="text-red-500 text-[10px] mt-2">{localityError}</p>
            )} */}
          </>
          {isLoadingLocality ? (
            <div className="w-full flex justify-center items-center">
              <div className="w-5 h-5 border-2 border-t-2 border-[#1D3A76] rounded-full animate-spin"></div>
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans ml-2">
                Fetching localities...
              </p>
            </div>
          ) : (
            localityDropdown && (
              <>
                {localitiesData.length > 0 ? (
                  <ul className="w-full bg-white border border-[#1D3A76] rounded-md shadow-lg max-h-48 overflow-auto z-50">
                    {localitiesData.map((loc, index) => (
                      <li
                        key={index}
                        onClick={() => handleLocalitySelect(loc.locality)}
                        className="px-4 py-2 cursor-pointer hover:bg-[#1D3A76] hover:text-white"
                      >
                        {loc.locality}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="w-full bg-white border border-[#1D3A76] rounded-md shadow-lg max-h-48 overflow-auto z-50">
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#1D3A76] hover:text-white"
                      onClick={() => handleLocalitySelect(locality)}
                    >
                      Add - {locality}
                    </li>
                  </ul>
                )}
              </>
            )
          )}
          {!(
            getpropertyDetails?.property_sub_type === "Plot" ||
            getpropertyDetails?.property_sub_type === "Land"
          ) ? (
            <>
              <div className="my-4">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    {getpropertyDetails?.property_sub_type ===
                    "Independent House"
                      ? "House No."
                      : "Flat No."}
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  placeholder="Flat No."
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={flatNo}
                  onChange={updateFlatNo}
                />
                {flatNoError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter Flat No.
                  </p>
                )}
              </div>
              {(getpropertyDetails?.property_in === "Commercial" ||
                getpropertyDetails.property_sub_type !==
                  "Independent Villa") && (
                <div className="my-4">
                  <div className="flex gap-1">
                    <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                      Floor No.
                    </p>
                    <IconAsterisk size={8} color="#FF0000" />
                  </div>
                  <Textinput
                    placeholder="Floor No."
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={floorNo}
                    onChange={updateFloorNo}
                  />
                  {floorNoError && (
                    <p className="text-[#FF0000] text-xs font-sans">
                      {floorNoError}
                    </p>
                  )}
                </div>
              )}
              <div className="my-4">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Total Floors
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  placeholder="Total Floors"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={totalFloors}
                  onChange={updateTotalFloors}
                />
                {totalFloorsError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    {totalFloorsError}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="my-4">
              <div className="flex gap-1">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Plot No.
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <Textinput
                placeholder="Plot No."
                inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                value={plotNumber}
                onChange={updatePlotNumber}
              />
              {plotNumberError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please enter plot No.
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end items-center  px-6 pt-3">
          {/* <div onClick={() => updateActiveTab('propertydetails', 'completed', unique_property_id)} className='bg-[#000] px-8 py-2 rounded-md cursor-pointer'>
            <p className='text-white text-[10px]'>Back</p>
          </div> */}
          <div
            onClick={updateAddress}
            className="border border-[#1D3A76] bg-[#1D3A76] px-8 py-2 rounded-md cursor-pointer"
          >
            <p className="text-white text-[10px] font-bold">Next: Add Photos</p>
          </div>
        </div>
        <LoadingOverlay isLoading={isLoadingEffect} />
      </div>
      {errorModalOpen && (
        <Modal
          open={errorModalOpen}
          onClose={closeErrorModal}
          size="md"
          zIndex={9999}
        >
          <Errorpanel errorMessages={errorMessages} close={closeErrorModal} />
        </Modal>
      )}
    </>
  );
}

export default Addresswrapper;
