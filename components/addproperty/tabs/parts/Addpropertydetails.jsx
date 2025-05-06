"use client";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import { Modal, Select, Textarea, Textinput } from "@nayeshdaggula/tailify";
import React, { useEffect, useState } from "react";
import Addfurnishingswrapper from "./Addfurnishingswrapper";
import {
  IconArrowNarrowLeft,
  IconAsterisk,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useUserDetails } from "@/components/zustand/useUserDetails";
import Propertyapi from "@/components/api/Propertyapi";
import { useSearchParams } from "next/navigation";
import Errorpanel from "@/components/shared/Errorpanel";
import { toast } from "react-toastify";
import { usePropertyDetails } from "@/components/zustand/usePropertyDetails";
import NumberToWords from "@/components/shared/NumberToWords";
import DistanceToWords from "@/components/shared/DistnaceToWords";
function Addpropertydetails({
  updateActiveTab,
  propertyDetails,
  preferedTenantList,
  bacloniesList,
  bedroomtypesList,
  businesstypesList,
  facingList,
  furnishedtypesList,
  occupancyList,
  ownershipList,
  zoneList,
  facilitiesList,
  areaunitsList,
}) {
  const userInfo = useUserDetails((state) => state.userInfo);
  let user_id = userInfo?.user_id || null;
  let access_token = userInfo?.access_token || null;
  const getpropertyDetails = usePropertyDetails(
    (state) => state.propertydetails
  );
  const updatePropertyDetails = usePropertyDetails(
    (state) => state.updatePropertyDetails
  );

  const searchParams = useSearchParams();
  const unique_property_id = searchParams.get("unique_property_id");

  const [isLoadingEffect, setIsLoadingEffect] = useState(false);
  const [propertySubType, setPropertySubType] = useState("");
  const [propertySubTypeError, setPropertySubTypeError] = useState("");
  const updatePropertySubType = (type) => {
    setPropertySubType(type);
    setPropertySubTypeError("");
    if (type === "Plot" || type === "Land") {
      setBhk("");
      setBathroom("");
      setBalcony("");
      setFurnishType("");
    }
    if (type === "Warehouse" || type === "Others" || type === "Plot") {
      setPassengerLifts("");
      setServiceLifts("");
      setStairCases("");
      setPrivateParking("");
      setPublicParking("");
      setPrivateWashrooms("");
      setPublicWashrooms("");
    }
    if (
      !(
        type === "Apartment" ||
        type === "Flat" ||
        type === "Land" ||
        type === "Office" ||
        type === "Retail Shop" ||
        type === "Show Room" ||
        type === "Independent House" ||
        type === "Independent Villa"
      )
    ) {
      setBuiltupArea("");
      setCarpetArea("");
    }
    if (!(type === "Plot" || type === "Land")) {
      setLengthArea("");
      setWidthArea("");
    }
    if (
      getpropertyDetails?.property_for === "Rent" ||
      getpropertyDetails?.property_for === "PG/Co-living"
    ) {
      if (type === "Plot" || type === "Land") {
        setConstructionStatus("");
      }
    }
    if (
      getpropertyDetails.property_for === "Rent" ||
      getpropertyDetails?.property_for === "PG/Co-living" ||
      !(type === "Plot" || type === "Land")
    ) {
      setPreferredTenantType("");
    }
    if (
      !(
        type === "Independent House" ||
        type === "Independent Villa" ||
        type === "Plot" ||
        type === "Warehouse" ||
        type === "Others"
      )
    ) {
      setPlotArea("");
    }
    if (!(type === "Independent House" || type === "Independent Villa")) {
      setPentHouse("");
    }
    if (getpropertyDetails.property_for !== "Sell") {
      if (!(type === "Independent House" || type === "Independent Villa")) {
        setUnitCost("");
      }
      setPropertyCost("");
    }
    if (
      !(
        type === "Apartment" ||
        type === "Independent House" ||
        type === "Independent Villa" ||
        type === "Flat" ||
        type === "Office" ||
        type === "Retail Shop" ||
        type === "Show Room"
      )
    ) {
      setFacilities({
        Lift: false,
        CCTV: false,
        Gym: false,
        Garden: false,
        "Club House": false,
        Sports: false,
        "Swimming Pool": false,
        Intercom: false,
        "Power Backup": false,
        "Gated Community": false,
        "Regular Water": false,
        "Community Hall": false,
        "Pet Allowed": false,
        "Entry / Exit": false,
        "Outdoor Fitness Station": false,
        "Half Basket Ball Court": false,
        Gazebo: false,
        "Badmenton Court": false,
        "Children Play area": false,
        "Ample Greenery": false,
        "Water Harvesting Pit": false,
        "Water Softner": false,
        "Solar Fencing": false,
        "Security Cabin": false,
        Lawn: false,
        "Transformer Yard": false,
        Amphitheatre: false,
        "Lawn with Stepping Stones": false,
        None: false,
      });
    }
    if (!(getpropertyDetails?.property_in === "Commercial")) {
      if (!(type === "Warehouse" || type === "Plot" || type === "Others")) {
        setPlotNumber("");
      } else {
        setFlatNumber("");
      }
      if (
        !(
          type === "Retail Shop" ||
          type === "Show Room" ||
          type === "Plot" ||
          type === "Others"
        )
      ) {
        setSuitableFor("");
      } else {
        setZoneType("");
      }
    }
    if (!(getpropertyDetails?.property_for === "Sell")) {
      if (
        !(
          type === "Apartment" ||
          type === "Independent Villa" ||
          type === "Plot"
        )
      ) {
        setInvestorProperty("");
      }
    }
    if (type === "Plot") {
      setCarParking("");
      setOpenParking("");
      setBikeParking("");
    }
    if (!(getpropertyDetails?.property_in === "Commercial")) {
      if (
        !(type === "Retail Shop" || type === "Warehouse" || type === "Plot")
      ) {
        setPantryRoom("");
      }
    } else {
      if (type === "Plot" || type === "Land") {
        setServantRoom("");
      }
    }
  };
  const [constructionStatus, setConstructionStatus] = useState("");
  const [constructionStatusError, setConstructionStatusError] = useState("");
  const updateConstructionStatus = (status) => {
    setConstructionStatus(status);
    setConstructionStatusError("");
    if (status === 1) {
      setPossessionEndDate("");
    }
    if (status === 2) {
      setAgeofProperty("");
    }
  };

  const [bhk, setBhk] = useState("");
  const [bhkError, setBhkError] = useState("");
  const updateBhk = (bhk) => {
    setBhk(bhk);
    setBhkError("");
    setCustomBhk("");
  };

  const [customBhk, setCustomBhk] = useState("");
  const [customBhkError, setCustomBhkError] = useState("");
  const updateCustomBhk = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setCustomBhk(value);
    setCustomBhkError("");
  };

  const [bathroom, setBathroom] = useState("");
  const [bathroomError, setBathroomError] = useState("");
  const updateBathroom = (bathroom) => {
    setBathroom(bathroom);
    setBathroomError("");
    setCustomBalcony("");
  };

  const [balcony, setBalcony] = useState("");
  const [balconyError, setBalconyError] = useState("");
  const updateBalcony = (balcony) => {
    setBalcony(balcony);
    setBalconyError("");
    setCustomBalcony("");
  };

  const [customBathroom, setCustomBathroom] = useState("");
  const [customBathroomError, setCustomBathroomError] = useState("");
  const updateCustomBathroom = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setCustomBathroom(value);
    setCustomBathroomError("");
  };

  const [customBalcony, setCustomBalcony] = useState("");
  const [customBalconyError, setCustomBalconyError] = useState("");
  const updateCustomBalcony = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setCustomBalcony(value);
    setCustomBalconyError("");
  };

  const [furnishType, setFurnishType] = useState("");
  const [furnishTypeError, setFurnishTypeError] = useState("");
  const updateFurnishType = (type) => {
    setFurnishType(type);
    setFurnishTypeError("");
  };

  const [availableFromDate, setAvailableFromDate] = useState("");
  const [availableFromDateError, setAvailableFromDateError] = useState("");
  const updateAvailableFromDate = (e) => {
    setAvailableFromDate(e.target.value);
    setAvailableFromDateError("");
  };

  const [possessionEndDate, setPossessionEndDate] = useState("");
  const [possessionEndDateError, setPossessionEndDateError] = useState("");
  const updatePossessionEndDate = (e) => {
    setPossessionEndDate(e.target.value);
    setPossessionEndDateError("");
  };

  const [ageofProperty, setAgeofProperty] = useState("");
  const [ageofPropertyError, setAgeofPropertyError] = useState("");
  const updateAgeofProperty = (value) => {
    setAgeofProperty(value);
    setAgeofPropertyError("");
  };

  const [carParking, setCarParking] = useState("");
  const [carParkingError, setCarParkingError] = useState("");
  const updateCarParking = (parking) => {
    setCarParking(parking);
    setCarParkingError("");
    setCustomCarParking("");
  };

  const [customCarParking, setCustomCarParking] = useState("");
  const [customCarParkingError, setCustomCarParkingError] = useState("");
  const updateCustomCarParking = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setCustomCarParking(e.target.value);
    setCustomCarParkingError("");
  };

  const [openParking, setOpenParking] = useState("");
  const [openParkingError, setOpenParkingError] = useState("");
  const updateOpenParking = (parking) => {
    setOpenParking(parking);
    setOpenParkingError("");
    setCustomOpenParking("");
  };
  const [customOpenParking, setCustomOpenParking] = useState("");
  const [customOpenParkingError, setCustomOpenParkingError] = useState("");
  const updateCustomOpenParking = (e) => {
    setCustomOpenParking(e.target.value);
    setCustomOpenParkingError("");
  };

  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlyRentError, setMonthlyRentError] = useState("");
  const updateMonthlyRent = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setMonthlyRent(value);
    if (value < 1000 || value > 50000000) {
      setMonthlyRentError("Monthly rent should be between 1 k to 50 Lakhs");
      return false;
    }
    setMonthlyRentError("");
  };

  const [maintenceCharges, setMaintenceCharges] = useState("");
  const [maintenceChargesError, setMaintenceChargesError] = useState("");
  const updateMaintenceCharges = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setMaintenceCharges(value);
    setMaintenceChargesError("");
  };

  const [securityDeposit, setSecurityDeposit] = useState("");
  const [securityDepositError, setSecurityDepositError] = useState("");
  const updateSecurityDeposit = (deposit) => {
    setSecurityDeposit(deposit);
    setSecurityDepositError("");
  };

  const [lockInPeriod, setLockInPeriod] = useState("");
  const [lockInPeriodError, setLockInPeriodError] = useState("");
  const updateLockInPeriod = (period) => {
    setLockInPeriod(period);
    setLockInPeriodError("");
  };

  const [preferredTenantType, setPreferredTenantType] = useState("");
  const [preferredTenantTypeError, setPreferredTenantTypeError] = useState("");
  const updatePreferredTenantType = (type) => {
    setPreferredTenantType(type);
    setPreferredTenantTypeError("");
  };

  // let builtupAreadebounceTimeout;
  // const [builtupArea, setBuiltupArea] = useState('')
  // const [builtupAreaError, setBuiltupAreaError] = useState('')
  // const updateBuiltupArea = (e) => {
  //   const value = e.target.value;

  //   if (isNaN(value)) {
  //     return false;
  //   }

  //   // Clear any previous debounce timeout
  //   clearTimeout(builtupAreadebounceTimeout);

  //   // Set the built-up area immediately
  //   setBuiltupArea(value);

  //   // Delay the validation
  //   builtupAreadebounceTimeout = setTimeout(() => {
  //     const numValue = Number(value);

  //     if (getpropertyDetails?.property_in === "Commercial") {
  //       if (numValue < 100 || numValue > 2000000) {
  //         setBuiltupAreaError('Builtup area should be between 100 to 2,000,000');
  //         return;
  //       }
  //     } else if (getpropertyDetails?.property_in === "Residential") {
  //       if (numValue < 150 || numValue > 20000) {
  //         setBuiltupAreaError('Builtup area should be between 150 to 20,000');
  //         return;
  //       }
  //     }

  //     // Clear the error if validation passes
  //     setBuiltupAreaError('');
  //   }, 1000); // 1-second debounce delay
  // }
  const [builtupArea, setBuiltupArea] = useState("");
  const [builtupAreaError, setBuiltupAreaError] = useState("");
  const updateBuiltupArea = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setBuiltupArea(value);
    if (getpropertyDetails?.property_in === "Commercial") {
      if (value < 100 || value > 2000000) {
        setBuiltupAreaError("Builtup area should be between 100 to 2,000,000");
        return false;
      }
    } else if (getpropertyDetails?.property_in === "Residential") {
      if (value < 150 || value > 20000) {
        setBuiltupAreaError("Builtup area should be between 150 to 20,000");
        return false;
      }
    }
    setBuiltupAreaError("");
  };

  const [carpetArea, setCarpetArea] = useState("");
  const [carpetAreaError, setCarpetAreaError] = useState("");
  const updateCarpetArea = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setCarpetArea(value);
    if (getpropertyDetails?.property_in === "Commercial") {
      if (value < 100 || value > 2000000) {
        setCarpetAreaError("Carpet area should be between 100 to 2,000,000");
        return false;
      }
    } else if (getpropertyDetails?.property_in === "Residential") {
      if (value < 150 || value > 20000) {
        setCarpetAreaError("Carpet area should be between 150 to 20,000");
        return false;
      }
    }
    setCarpetAreaError("");
  };

  const [lengthArea, setLengthArea] = useState("");
  const [lengthAreaError, setLengthAreaError] = useState("");
  const updateLengthArea = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setLengthArea(value);
    setLengthAreaError("");
  };
  const [plotArea, setPlotArea] = useState("");
  const [plotAreaError, setPlotAreaError] = useState("");
  const updatePlotArea = (e) => {
    setPlotArea(e.target.value);
    setPlotAreaError("");
  };
  const [widthArea, setWidthArea] = useState("");
  const [widthAreaError, setWidthAreaError] = useState("");
  const updateWidthArea = (e) => {
    setWidthArea(e.target.value);
    setWidthAreaError("");
  };
  const [brokerage, setBrokerage] = useState("");
  const [brokerageError, setBrokerageError] = useState("");
  const updateBrokerage = (brokerage) => {
    setBrokerage(brokerage);
    setBrokerageError("");
  };

  const [facing, setFacing] = useState("");
  const [facingError, setFacingError] = useState("");
  const updateFacing = (facing) => {
    setFacing(facing);
    setFacingError("");
  };
  const [servantRoom, setServantRoom] = useState("");
  const [servantRoomError, setServantRoomError] = useState("");
  const updateServantRoom = (room) => {
    setServantRoom(room);
    setServantRoomError("");
  };

  const [reraApproved, setReraApproved] = useState("");
  const [reraApprovedError, setReraApprovedError] = useState("");
  const updateReraApproved = (rera) => {
    setReraApproved(rera);
    setReraApprovedError("");
  };

  const [propertyDescription, setPropertyDescription] = useState("");
  const [propertyDescriptionError, setPropertyDescriptionError] = useState("");
  const updatePropertyDescription = (e) => {
    setPropertyDescription(e.target.value);
    setPropertyDescriptionError("");
  };

  const [unitCost, setUnitCost] = useState("");
  const [unitCostError, setUnitCostError] = useState("");
  const updateUnitCost = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setUnitCost(value);
    setUnitCostError("");
  };

  const [propertyCost, setPropertyCost] = useState("");
  const [propertyCostError, setPropertyCostError] = useState("");
  const updatePropertyCost = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setPropertyCost(value);
    if (value < 100000 || value > 3000000000) {
      setPropertyCostError("Property cost should be between 1 lakh to 300 cr");
      return false;
    }
    setPropertyCostError("");
  };

  const [ownerShip, setOwnerShip] = useState("");
  const [ownerShipError, setOwnerShipError] = useState("");
  const updateOwnerShip = (value) => {
    setOwnerShip(value);
    setOwnerShipError("");
  };

  const [areaUnits, setAreaUnits] = useState(1);
  const [areaUnitsError, setAreaUnitsError] = useState("");
  const updateAreaUnits = (value) => {
    setAreaUnits(value);
    const areaUnit = areaunitsList.find((unit) => unit.value === value);
    setAreaUintsName(areaUnit ? areaUnit.label : "");
    setAreaUnitsError("");
  };

  const [areaUintsName, setAreaUintsName] = useState("Sq.ft");

  const [pentHouse, setPentHouse] = useState("");
  const [pentHouseError, setPentHouseError] = useState("");
  const updatePentHouse = (value) => {
    setPentHouse(value);
    setPentHouseError("");
  };

  const [bikeParking, setBikeParking] = useState("");
  // const [bikeParkingError, setBikeParkingError] = useState('')
  const updateBikeParking = (value) => {
    setBikeParking(value);
    // setBikeParkingError('')
    setCustomBikeParking("");
  };

  const [customBikeParking, setCustomBikeParking] = useState("");
  const [customBikeParkingError, setCustomBikeParkingError] = useState("");
  const updateCustomBikeParking = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setCustomBikeParking(value);
    setCustomBikeParkingError("");
  };

  const [otherInfo, setOtherInfo] = useState("");
  const [otherInfoError, setOtherInfoError] = useState("");
  const updateOtherInfo = (e) => {
    setOtherInfo(e.target.value);
    setOtherInfoError("");
  };

  const [facilities, setFacilities] = useState(
    facilitiesList || {
      Lift: false,
      CCTV: false,
      Gym: false,
      Garden: false,
      "Club House": false,
      Sports: false,
      "Swimming Pool": false,
      Intercom: false,
      "Power Backup": false,
      "Gated Community": false,
      "Regular Water": false,
      "Community Hall": false,
      "Pet Allowed": false,
      "Entry / Exit": false,
      "Outdoor Fitness Station": false,
      "Half Basket Ball Court": false,
      Gazebo: false,
      "Badmenton Court": false,
      "Children Play area": false,
      "Ample Greenery": false,
      "Water Harvesting Pit": false,
      "Water Softner": false,
      "Solar Fencing": false,
      "Security Cabin": false,
      Lawn: false,
      "Transformer Yard": false,
      Amphitheatre: false,
      "Lawn with Stepping Stones": false,
      None: false,
    }
  );

  // Handler function to toggle checkboxes
  const updateFacilties = (event) => {
    const { id, checked } = event.target;
    // if None value selected then uncheck all the checkboxes and if any other value selected then uncheck None checkbox
    if (id === "None") {
      setFacilities((prevState) => {
        const updatedFacilities = { ...prevState };
        for (const key in updatedFacilities) {
          (updatedFacilities[key] = false), (updatedFacilities[id] = checked);
        }
        return updatedFacilities;
      });
    } else {
      setFacilities((prevState) => ({
        ...prevState,
        None: false,
        [id]: checked, // Update the selected facility
      }));
    }
    // setFacilities((prevState) => ({
    //   ...prevState,
    //   [id]: checked, // Update the selected facility
    // }));
  };

  const [passengerLifts, setPassengerLifts] = useState("");
  const [passengerLiftsError, setPassengerLiftsError] = useState("");
  const updatePassengerLifts = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setPassengerLifts(value);
    setPassengerLiftsError("");
  };

  const [serviceLifts, setServiceLifts] = useState("");
  const [serviceLiftsError, setServiceLiftsError] = useState("");
  const updateServiceLifts = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setServiceLifts(value);
    setServiceLiftsError("");
  };

  const [stairCases, setStairCases] = useState("");
  const [stairCasesError, setStairCasesError] = useState("");
  const updateStairCases = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setStairCases(value);
    setStairCasesError("");
  };

  const [privateParking, setPrivateParking] = useState("");
  const [privateParkingError, setPrivateParkingError] = useState("");
  const updatePrivateParking = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setPrivateParking(value);
    setPrivateParkingError("");
  };

  const [publicParking, setPublicParking] = useState("");
  const [publicParkingError, setPublicParkingError] = useState("");
  const updatePublicParking = (e) => {
    let value = e.target.value;
    setPublicParking(value);
    setPublicParkingError("");
  };

  const [privateWashrooms, setPrivateWashrooms] = useState("");
  const [privateWashroomsError, setPrivateWashroomsError] = useState("");
  const updatePrivateWashrooms = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setPrivateWashrooms(value);
    setPrivateWashroomsError("");
  };

  const [publicWashrooms, setPublicWashrooms] = useState("");
  const [publicWashroomsError, setPublicWashroomsError] = useState("");
  const updatePublicWashrooms = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setPublicWashrooms(value);
    setPublicWashroomsError("");
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

  const [flatNumber, setFlatNumber] = useState("");
  const [flatNumberError, setFlatNumberError] = useState("");
  const updateFlatNumber = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setFlatNumber(value);
    setFlatNumberError("");
  };

  const [suitableFor, setSuitableFor] = useState("");
  const [suitableForError, setSuitableForError] = useState("");
  const updateSuitableFor = (value) => {
    setSuitableFor(value);
    setSuitableForError("");
  };

  const [zoneType, setZoneType] = useState("");
  const [zoneTypeError, setZoneTypeError] = useState("");
  const updateZoneType = (value) => {
    setZoneType(value);
    setZoneTypeError("");
  };

  const [possessionStatus, setPossessionStatus] = useState("");
  const [possessionStatusError, setPossessionStatusError] = useState("");
  const updatePossessionStatus = (value) => {
    setPossessionStatus(value);
    setPossessionStatusError("");
  };

  const [investorProperty, setInvestorProperty] = useState("");
  const [investorPropertyError, setInvestorPropertyError] = useState("");
  const updateInvestorProperty = (value) => {
    setInvestorProperty(value);
    setInvestorPropertyError("");
  };

  const [builderPlot, setBuilderPlot] = useState("");
  const [builderPlotError, setBuilderPlotError] = useState("");
  const updateBuilderPlot = (value) => {
    setBuilderPlot(value);
    setBuilderPlotError("");
  };

  const [loanFacility, setLoanFacility] = useState("");
  const [loanFacilityError, setLoanFacilityError] = useState("");
  const updateLoanFacility = (value) => {
    setLoanFacility(value);
    setLoanFacilityError("");
  };

  const [pantryRoom, setPantryRoom] = useState("");
  const [pantryRoomError, setPantryRoomError] = useState("");
  const updatePantryRoom = (value) => {
    setPantryRoom(value);
    setPantryRoomError("");
  };

  const [totalProjectArea, setTotalProjectArea] = useState("");
  const [totalProjectAreaError, setTotalProjectAreaError] = useState("");
  const updateTotalProjectArea = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setTotalProjectArea(value);
    setTotalProjectAreaError("");
  };

  const [totalPlacesaroundProperty, setTotalPlacesaroundProperty] = useState(
    []
  );
  const [placearoundProperty, setPlacearoundProperty] = useState("");
  const [placearoundPropertyError, setPlacearoundPropertyError] = useState("");
  const updatePlacearoundProperty = (e) => {
    setPlacearoundProperty(e.target.value);
    setPlacearoundPropertyError("");
  };

  const [distancefromProperty, setDistancefromProperty] = useState("");
  const [distancefromPropertyError, setDistancefromPropertyError] =
    useState("");
  const updateDistancefromProperty = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return false;
    }
    setDistancefromProperty(value);
    setDistancefromPropertyError("");
  };

  const handleAddaroundProperty = () => {
    if (!placearoundProperty) {
      toast.error("Please enter place around property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPlacearoundPropertyError("Please enter place around property");
      return false;
    }
    if (!distancefromProperty) {
      toast.error("Please enter distance from property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDistancefromPropertyError("Please enter distance from property");
      return false;
    }
    setTotalPlacesaroundProperty([
      ...totalPlacesaroundProperty,
      {
        placeid: null,
        place: placearoundProperty,
        distance: distancefromProperty,
      },
    ]);
    setPlacearoundProperty("");
    setDistancefromProperty("");
  };

  const removeAroundproperty = (index, placeid) => {
    if (placeid) {
      deletePlaceAroundProperty(placeid);
    } else {
      const newPlaces = totalPlacesaroundProperty.filter(
        (place, i) => i !== index
      );
      setTotalPlacesaroundProperty(newPlaces);
    }
  };

  async function deletePlaceAroundProperty(placeid) {
    Propertyapi.post("deleteplacesaroundproperty", {
      placeid: placeid,
      user_id: user_id,
      unique_property_id: unique_property_id,
    })

      .then((response) => {
        const data = response.data;
        if (data.status === "error") {
          const finalResponse = {
            message: data.message,
            server_res: data.server_res,
          };
          setErrorMessages(finalResponse);
          setErrorModalOpen(true);
          setIsLoadingEffect(false);
          return;
        }

        const newPlaces = totalPlacesaroundProperty.filter(
          (place) => place.placeid !== placeid
        );
        setTotalPlacesaroundProperty(newPlaces);
        toast.success("Place removed successfully");
      })
      .catch((error) => {
        let finalResponse = {
          message: error.message,
        };
        setErrorMessages(finalResponse);
        setErrorModalOpen(true);
        setIsLoadingEffect(false);
      });
  }

  const [furnishingModal, setFurnishingModal] = useState(false);
  const openFurnishingModal = () => {
    setFurnishingModal(true);
  };

  const closeFurnishingModal = () => {
    setFurnishingModal(false);
  };
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmitPropertyDetails = () => {
    setIsLoadingEffect(true);
    if (!propertySubType) {
      setIsLoadingEffect(false);
      toast.error("Please select Property sub type", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPropertySubTypeError("Please select Property sub type");
      return false;
    }
    if (
      getpropertyDetails?.property_in !== "Residential" &&
      getpropertyDetails?.property_for !== "Rent"
    ) {
      if (!reraApproved) {
        setIsLoadingEffect(false);
        toast.error("Please select rera approved", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setReraApprovedError("Please select rera approved");
        return false;
      }
    }

    if (getpropertyDetails?.property_for === "Sell") {
      if (!(propertySubType === "Plot" || propertySubType === "Land")) {
        if (!constructionStatus) {
          setIsLoadingEffect(false);
          toast.error("Please select construction status", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setConstructionStatusError("Please select construction status");
          return false;
        }
      }
    }
    if (
      propertySubType === "Apartment" ||
      propertySubType === "Flat" ||
      propertySubType === "Independent House" ||
      propertySubType === "Independent Villa"
    ) {
      if (!bhk) {
        setIsLoadingEffect(false);
        toast.error("Please select bhk", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBhkError("Please select bhk");
        return false;
      }
      if (bhk === 5 && !customBhk) {
        setIsLoadingEffect(false);
        toast.error("Please enter custom bhk", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCustomBhkError("Please enter bhk");
        return false;
      }
    }
    if (propertySubType === "Apartment" || propertySubType === "Flat") {
      if (!bathroom) {
        setIsLoadingEffect(false);
        toast.error("Please select bathroom", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBathroomError("Please select bathroom");
        return false;
      }
      if (bathroom === 5 && !customBathroom) {
        setIsLoadingEffect(false);
        toast.error("Please enter bathroom", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCustomBathroomError("Please enter bathroom");
        return false;
      }
      if (!balcony) {
        setIsLoadingEffect(false);
        toast.error("Please select balcony", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBalconyError("Please select balcony");
        return false;
      }
      if (balcony === 5 && !customBalcony) {
        setIsLoadingEffect(false);
        toast.error("Please enter balcony", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCustomBalconyError("Please enter balcony");
        return false;
      }
    }
    if (
      propertySubType === "Apartment" ||
      propertySubType === "Independent House" ||
      propertySubType === "Independent Villa"
    ) {
      if (!furnishType) {
        setIsLoadingEffect(false);
        toast.error("Please select furnish Type", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFurnishTypeError("Please select furnish type");
        return false;
      }
    }
    if (
      propertySubType === "Office" ||
      propertySubType === "Retail Shop" ||
      propertySubType === "Show Room"
    ) {
      if (!passengerLifts) {
        setIsLoadingEffect(false);
        toast.error("Please enter passenger lifts", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPassengerLiftsError("Please enter passenger lifts");
        return false;
      }
      if (!serviceLifts) {
        setIsLoadingEffect(false);
        toast.error("Please enter service lifts", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setServiceLiftsError("Please enter service lifts");
        return false;
      }
      if (!stairCases) {
        setIsLoadingEffect(false);
        toast.error("Please enter stair cases", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setStairCasesError("Please enter stair cases");
        return false;
      }
      if (!privateParking) {
        setIsLoadingEffect(false);
        toast.error("Please enter private parking", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPrivateParkingError("Please enter private parking");
        return false;
      }
      if (!publicParking) {
        setIsLoadingEffect(false);
        toast.error("Please enter public parking", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPublicParkingError("Please enter public parking");
        return false;
      }
      if (!privateWashrooms) {
        setIsLoadingEffect(false);
        toast.error("Please enter private washrooms", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPrivateWashroomsError("Please enter private washrooms");
        return false;
      }
      if (!publicWashrooms) {
        setIsLoadingEffect(false);
        toast.error("Please enter public washrooms", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPublicWashroomsError("Please enter public washrooms");
        return false;
      }
    }
    if (
      getpropertyDetails?.property_for === "Rent" ||
      getpropertyDetails?.property_for === "PG/Co-living"
    ) {
      if (!availableFromDate) {
        setIsLoadingEffect(false);
        toast.error("Please select available from Date", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAvailableFromDateError("Please select available from date");
        return false;
      }
    }
    if (constructionStatus === 1) {
      if (!ageofProperty) {
        setIsLoadingEffect(false);
        toast.error("Please enter age of Property", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAgeofPropertyError("Please enter age of Property");
        return false;
      }
    }
    if (constructionStatus === 2) {
      if (!possessionEndDate) {
        setIsLoadingEffect(false);
        toast.error("Please select possesion end Date", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPossessionEndDateError("Please select possession end date");
        return false;
      }
    }
    if (
      getpropertyDetails.property_for === "Rent" ||
      getpropertyDetails.property_for === "PG/Co-living"
    ) {
      if (!monthlyRent) {
        setIsLoadingEffect(false);
        toast.error("Please enter monthly rent", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setMonthlyRentError("Please enter monthly rent");
        return false;
      }
      if (monthlyRent < 1000 || monthlyRent > 50000000) {
        setIsLoadingEffect(false);
        toast.error("Monthly rent should be between 1 k to 50 Lakhs", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setMonthlyRentError("Monthly rent should be between 1 k to 50 Lakhs");
        return false;
      }
      if (!maintenceCharges) {
        setIsLoadingEffect(false);
        toast.error("Please enter maintenance charges", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setMaintenceChargesError("Please enter maintenance charges");
        return false;
      }
      if (!securityDeposit) {
        setIsLoadingEffect(false);
        toast.error("Please enter security deposit", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSecurityDepositError("Please enter security deposit");
        return false;
      }
      if (!lockInPeriod) {
        setIsLoadingEffect(false);
        toast.error("Please enter lockin period", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLockInPeriodError("Please enter lock in period");
        return false;
      }
      if (!brokerage) {
        setIsLoadingEffect(false);
        toast.error("Please enter brokerage charge", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBrokerageError("Please enter brokerage");
        return false;
      }
      if (
        getpropertyDetails.property_in !== "Commercial" ||
        propertySubType === "Plot" ||
        propertySubType === "Land"
      ) {
        if (!preferredTenantType) {
          setIsLoadingEffect(false);
          toast.error("Please select prefered tenant type", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setPreferredTenantTypeError("Please select preferred tenant type");
          return false;
        }
      }
    }
    if (
      propertySubType === "Apartment" ||
      propertySubType === "Flat" ||
      propertySubType === "Land" ||
      propertySubType === "Office" ||
      propertySubType === "Retail Shop" ||
      propertySubType === "Show Room" ||
      propertySubType === "Independent House" ||
      propertySubType === "Independent Villa"
    ) {
      if (!builtupArea) {
        setIsLoadingEffect(false);
        toast.error("Please enter built up area", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBuiltupAreaError("Please enter builtup area");
        return false;
      }
      if (getpropertyDetails?.property_in === "Commercial") {
        if (builtupArea < 100 || builtupArea > 2000000) {
          setIsLoadingEffect(false);
          toast.error("Builtup area should be between 100 to 200,00,00", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBuiltupAreaError(
            "Builtup area should be between 100 to 200,00,00"
          );
          return false;
        }
      } else if (getpropertyDetails?.property_in === "Residential") {
        if (builtupArea < 150 || builtupArea > 20000) {
          setIsLoadingEffect(false);
          toast.error("Builtup area should be between 150 to 20,000", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBuiltupAreaError("Builtup area should be between 150 to 20,000");
          return false;
        }
      }
      if (getpropertyDetails?.property_in === "Commercial") {
        if (carpetArea) {
          if (carpetArea < 100 || carpetArea > 2000000) {
            setIsLoadingEffect(false);
            toast.error("Carpet area should be between 100 to 200,00,00", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setCarpetAreaError(
              "Carpet area should be between 100 to 200,00,00"
            );
            return false;
          }
        } else if (getpropertyDetails?.property_in === "Residential") {
          if (carpetArea < 150 || carpetArea > 20000) {
            setIsLoadingEffect(false);
            toast.error("Carpet area should be between 150 to 20,000", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setCarpetAreaError("Carpet area should be between 150 to 20,000");
            return false;
          }
        }
      }
    }
    if (propertySubType === "Plot" || propertySubType === "Land") {
      if (!lengthArea) {
        setIsLoadingEffect(false);
        toast.error("Please enter length area", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLengthAreaError("Please enter length area");
        return false;
      }
      if (!widthArea) {
        setIsLoadingEffect(false);
        toast.error("Please width area", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setWidthAreaError("Please enter width area");
        return false;
      }
    }
    if (
      propertySubType === "Independent House" ||
      propertySubType === "Independent Villa" ||
      propertySubType === "Plot" ||
      propertySubType === "Warehouse" ||
      propertySubType === "Others"
    ) {
      if (!plotArea) {
        setIsLoadingEffect(false);
        toast.error("Please enter plot area", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPlotAreaError("Please enter plot area");
        return false;
      }
    }
    if (!totalProjectArea) {
      setIsLoadingEffect(false);
      toast.error("Please enter total project area", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTotalProjectAreaError("Please enter total project area");
      return false;
    }
    if (
      propertySubType === "Independent House" ||
      propertySubType === "Independent Villa"
    ) {
      if (!pentHouse) {
        setIsLoadingEffect(false);
        toast.error("Please select pent house", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPentHouseError("Please select pent house");
        return false;
      }
    }
    if (getpropertyDetails.property_for === "Sell") {
      if (
        !(
          propertySubType === "Independent House" ||
          propertySubType === "Independent Villa"
        )
      ) {
        if (!unitCost) {
          setIsLoadingEffect(false);
          toast.error("Please enter unit cost", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUnitCostError("Please enter unit cost");
          return false;
        }
      }
      if (!propertyCost) {
        setIsLoadingEffect(false);
        toast.error("Please enter Property cost", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPropertyCostError("Please enter Property cost");
        return false;
      }
      if (propertyCost < 100000 || propertyCost > 3000000000) {
        setIsLoadingEffect(false);
        toast.error("Property cost should be between 1 lakh to 300 cr", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPropertyCostError(
          "Property cost should be between 1 lakh to 300 cr"
        );
        return false;
      }
    }
    if (getpropertyDetails?.property_for === "Sell") {
      if (propertySubType === "Plot" || propertySubType === "Land") {
        if (!possessionStatus) {
          setIsLoadingEffect(false);
          toast.error("Please select possession status", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setPossessionStatusError("Please select possession status");
          return false;
        }
      }
    }
    if (
      getpropertyDetails?.property_in === "Commercial" &&
      getpropertyDetails?.property_for === "Sell"
    ) {
      if (!ownerShip) {
        setIsLoadingEffect(false);
        toast.error("Please select ownership type", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setOwnerShipError("Please select ownership type");
        return false;
      }
    }
    // facilities
    if (
      propertySubType === "Apartment" ||
      propertySubType === "Independent House" ||
      propertySubType === "Independent Villa" ||
      propertySubType === "Flat" ||
      propertySubType === "Office" ||
      propertySubType === "Retail Shop" ||
      propertySubType === "Show Room"
    ) {
      const selectedFacilities = Object.keys(facilities)
        .filter((key) => facilities[key])
        .join(", ");
      if (!selectedFacilities) {
        setIsLoadingEffect(false);
        toast.error("Please select atleast one facilities", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return false;
      }
    }
    if (getpropertyDetails?.property_in === "Commercial") {
      if (
        propertySubType === "Warehouse" ||
        propertySubType === "Plot" ||
        propertySubType === "Others"
      ) {
        if (!plotNumber) {
          setIsLoadingEffect(false);
          toast.error("Please enter plot number", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setPlotNumberError("Please enter plot number");
          return false;
        }
      } else {
        if (!flatNumber) {
          setIsLoadingEffect(false);
          toast.error("Please enter flat number", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFlatNumberError("Please enter flat number");
          return false;
        }
      }
      if (
        propertySubType === "Retail Shop" ||
        propertySubType === "Show Room" ||
        propertySubType === "Plot" ||
        propertySubType === "Others"
      ) {
        if (!suitableFor) {
          setIsLoadingEffect(false);
          toast.error("Please select Suitable For", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSuitableForError("Please select suitable for");
          return false;
        }
      } else {
        if (!zoneType) {
          setIsLoadingEffect(false);
          toast.error("Please select zone type", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setZoneTypeError("Please select zone type");
          return false;
        }
      }
    }
    if (getpropertyDetails?.property_for === "Sell") {
      if (
        propertySubType === "Apartment" ||
        propertySubType === "Independent Villa" ||
        propertySubType === "Plot"
      ) {
        if (!investorProperty) {
          setIsLoadingEffect(false);
          toast.error("Please select investor Property", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setInvestorPropertyError("Please select investor Property");
          return false;
        }
      }
    }
    if (getpropertyDetails?.property_for !== "Rent") {
      if (!loanFacility) {
        setIsLoadingEffect(false);
        toast.error("Please select loan facility", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoanFacilityError("Please select loan facility");
        return false;
      }
    }
    if (!facing) {
      setIsLoadingEffect(false);
      toast.error("Please select facing", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFacingError("Please select facing");
      return false;
    }
    if (propertySubType !== "Plot") {
      // if (!carParking) {
      //   setIsLoadingEffect(false)
      //   toast.error('Please select car parking', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      //   // setCarParkingError('Please select car parking')
      //   return false;
      // }
      // if (carParking === '4plus' && !customCarParking) {
      //   setIsLoadingEffect(false)
      //   toast.error('Please enter car parking', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      //   setCustomCarParkingError('Please enter car parking')
      //   return false;
      // }
      // if (!bikeParking) {
      //   setIsLoadingEffect(false)
      //   toast.error('Please enter bike parking', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      //   setBikeParkingError('Please select bike parking')
      //   return false;
      // }
      // if (bikeParking === '4plus' && !customBikeParking) {
      //   setIsLoadingEffect(false)
      //   toast.error('Please enter bike parking', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      //   setCustomBikeParkingError('Please enter bike parking')
      //   return false;
      // }
      // if (!openParking) {
      //   setIsLoadingEffect(false)
      //   toast.error('Please select open parking', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      //   setOpenParkingError('Please select open parking')
      //   return false;
      // }
      // if (openParking === '4plus' && !customOpenParking) {
      //   setIsLoadingEffect(false)
      //   toast.error('Please enter open parking', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      //   setCustomOpenParkingError('Please enter open parking')
      //   return false;
      // }
    }
    if (getpropertyDetails?.property_in === "Commercial") {
      if (
        propertySubType === "Office" ||
        propertySubType === "Show Room" ||
        !(
          propertySubType === "Retail Shop" ||
          propertySubType === "Warehouse" ||
          propertySubType === "Plot"
        )
      ) {
        if (!pantryRoom) {
          setIsLoadingEffect(false);
          toast.error("Please select pantry room", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setPantryRoomError("Please select pantry room");
          return false;
        }
      }
    } else {
      if (!(propertySubType === "Plot" || propertySubType === "Land")) {
        if (!servantRoom) {
          setIsLoadingEffect(false);
          toast.error("Please select servant room", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setServantRoomError("Please select servant room");
          return false;
        }
      }
    }
    if (totalPlacesaroundProperty.length === 0) {
      setIsLoadingEffect(false);
      toast.error("Please add places around property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPlacearoundPropertyError("Please add places around property");
      // setDistancefromPropertyError('Please add Distance around property')
      return false;
    }
    if (!propertyDescription) {
      setIsLoadingEffect(false);
      toast.error("Please enter Property description", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPropertyDescriptionError("Please enter Property description");
      return false;
    }

    const selectedFacilities = Object.keys(facilities)
      .filter((key) => facilities[key]) // Filter only `true` values
      .join(", ");

    const getFormattedDateTime = (date) => {
      if (!date) return null;
      return `${date}T00:00:00Z`;
    };

    let unit_flat_house_no;
    if (
      propertySubType === "Warehouse" ||
      propertySubType === "Plot" ||
      propertySubType === "Others"
    ) {
      unit_flat_house_no = plotNumber;
    } else {
      unit_flat_house_no = flatNumber;
    }

    const new_available_from_date = getFormattedDateTime(availableFromDate);
    const new_possession_end_date = getFormattedDateTime(possessionEndDate);

    let new_bhk;
    if (bhk === "4+") {
      new_bhk = customBhk;
    } else {
      new_bhk = bhk;
    }

    let new_bathroom;
    if (bathroom === "4plus") {
      new_bathroom = customBathroom;
    } else {
      new_bathroom = bathroom;
    }

    let new_balcony;
    if (balcony === "4+") {
      new_balcony = customBalcony;
    } else {
      new_balcony = balcony;
    }

    let new_car_parking;
    if (carParking === "4plus") {
      new_car_parking = customCarParking;
    } else {
      new_car_parking = carParking;
    }

    let new_bike_parking;
    if (bikeParking === "4plus") {
      new_bike_parking = customBikeParking;
    } else {
      new_bike_parking = bikeParking;
    }

    let new_open_parking;
    if (openParking === "4plus") {
      new_open_parking = customOpenParking;
    } else {
      new_open_parking = openParking;
    }

    Propertyapi.post(
      "/addproertydetails",
      {
        sub_type: propertySubType,
        rera_approved: reraApproved,
        occupancy: constructionStatus,
        bedrooms: new_bhk,
        bathroom: new_bathroom,
        balconies: new_balcony,
        furnished_status: furnishType,

        passenger_lifts: passengerLifts || null,
        service_lifts: serviceLifts || null,
        stair_cases: stairCases || null,
        private_parking: privateParking || null,
        public_parking: publicParking || null,
        private_washrooms: privateWashrooms || null,
        public_washrooms: publicWashrooms || null,
        available_from: new_available_from_date || null,

        property_age: ageofProperty || null,
        under_construction: new_possession_end_date || null,
        monthly_rent: monthlyRent || null,
        maintenance: maintenceCharges || null,
        security_deposit: securityDeposit || null,
        lock_in: lockInPeriod || null,
        brokerage_charge: brokerage || null,

        types: preferredTenantType || null,
        area_units: areaUnits || null,
        builtup_area: builtupArea || null,
        carpet_area: carpetArea || null,
        length_area: parseFloat(lengthArea) || null,
        width_area: parseFloat(widthArea) || null,

        plot_area: plotArea || null,
        total_project_area: totalProjectArea || null,
        pent_house: pentHouse || null,
        builtup_unit: unitCost || null,
        property_cost: propertyCost || null,
        possession_status: possessionStatus || null,
        ownership_type: ownerShip || null,
        facilities: selectedFacilities || null,
        other_info: otherInfo || null,
        unit_flat_house_no: flatNumber || null,
        plot_number: plotNumber || null,
        business_types: suitableFor || null,
        zone_types: zoneType || null,
        investor_property: investorProperty || null,
        builder_plot: builderPlot || null,
        loan_facility: loanFacility || null,
        // additional
        facing: facing || null,
        car_parking: new_car_parking || null,
        bike_parking: new_bike_parking || null,
        open_parking: new_open_parking || null,
        servant_room: servantRoom || null,
        description: propertyDescription || null,
        pantry_room: pantryRoom || null,
        total_places_around_property: totalPlacesaroundProperty || null,

        user_id: parseInt(user_id),
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
        toast.success("Property details added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        updatePropertyDetails({
          property_in: getpropertyDetails?.property_in,
          property_for: getpropertyDetails?.property_for,
          property_sub_type: propertySubType,
        });
        let property_id = data?.property?.unique_property_id;
        updateActiveTab("address", "inprogress", property_id);
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
    if (propertyDetails) {
      setPropertySubType(propertyDetails?.sub_type || "");
      setReraApproved(propertyDetails?.rera_approved || "");
      setConstructionStatus(propertyDetails?.occupancy || "");
      if (parseInt(propertyDetails?.bedrooms) > 4) {
        setBhk(5);
        setCustomBhk(propertyDetails?.bedrooms || "");
      } else {
        setBhk(propertyDetails?.bedrooms || "");
        setCustomBhk("");
      }
      if (parseInt(propertyDetails?.bathroom) > 4) {
        setBathroom(5);
        setCustomBathroom(propertyDetails?.bathroom || "");
      } else {
        setBathroom(propertyDetails?.bathroom || "");
        setCustomBathroom("");
      }
      if (parseInt(propertyDetails?.balconies) > 4) {
        setBalcony(5);
        setCustomBalcony(propertyDetails?.balconies || "");
      } else {
        setBalcony(propertyDetails?.balconies || "");
        setCustomBalcony("");
      }
      setFurnishType(propertyDetails?.furnished_status || "");
      setAgeofProperty(propertyDetails?.property_age || "");
      setAreaUnits(propertyDetails?.area_units || 1);
      setAreaUintsName(propertyDetails?.area_units_name || "Sq.ft");
      setBuiltupArea(propertyDetails?.builtup_area || "");
      setCarpetArea(propertyDetails?.carpet_area || "");
      setPropertyCost(propertyDetails?.property_cost || "");
      const facilitiesString = propertyDetails?.facilities || "";
      const selectedFacilities = facilitiesString
        .split(", ")
        .map((item) => item.trim());
      setFacilities((prevState) => {
        const updatedFacilities = { ...prevState };
        selectedFacilities.forEach((facility) => {
          if (updatedFacilities.hasOwnProperty(facility)) {
            updatedFacilities[facility] = true;
          }
        });
        return updatedFacilities;
      });
      setFacing(propertyDetails?.facing || "");
      if (parseInt(propertyDetails?.car_parking) > 4) {
        setCarParking("4plus");
        setCustomCarParking(propertyDetails?.car_parking || "");
      } else {
        setCarParking(propertyDetails?.car_parking || "");
        setCustomCarParking("");
      }
      if (parseInt(propertyDetails?.bike_parking) > 4) {
        setBikeParking("4plus");
        setCustomBikeParking(propertyDetails?.bike_parking || "");
      } else {
        setBikeParking(propertyDetails?.bike_parking || "");
        setCustomBikeParking("");
      }
      if (parseInt(propertyDetails?.open_parking) > 4) {
        setOpenParking("4plus");
        setCustomOpenParking(propertyDetails?.open_parking || "");
      } else {
        setOpenParking(propertyDetails?.open_parking || "");
        setCustomOpenParking("");
      }

      setMaintenceCharges(propertyDetails?.maintenance || "");
      setBrokerage(propertyDetails?.brokerage_charge || "");
      setLockInPeriod(propertyDetails?.lock_in || "");
      setMonthlyRent(propertyDetails?.monthly_rent || "");
      setSecurityDeposit(propertyDetails?.security_deposit || "");

      setPassengerLifts(propertyDetails?.passenger_lifts || "");
      setServiceLifts(propertyDetails?.service_lifts || "");
      setStairCases(propertyDetails?.stair_cases || "");
      setPrivateParking(propertyDetails?.private_parking || "");
      setPublicParking(propertyDetails?.public_parking || "");
      setPrivateWashrooms(propertyDetails?.private_washrooms || "");
      setPublicWashrooms(propertyDetails?.public_washrooms || "");
      if (propertyDetails?.available_from) {
        let available_from = new Date(propertyDetails?.available_from);
        let available_from_date = available_from?.toISOString().split("T")[0];
        setAvailableFromDate(available_from_date);
      }
      if (propertyDetails?.under_construction) {
        let under_construction = new Date(propertyDetails?.under_construction);
        let under_construction_date = under_construction
          ?.toISOString()
          .split("T")[0];
        setPossessionEndDate(under_construction_date);
      }
      setPlotNumber(propertyDetails?.plot_number || "");
      setFlatNumber(propertyDetails?.unit_flat_house_no || "");
      setOwnerShip(propertyDetails?.ownership_type || "");
      setZoneType(propertyDetails?.zone_types || "");
      setUnitCost(propertyDetails?.builtup_unit || "");
      setPlotArea(propertyDetails?.plot_area?.toString() || "");
      setPropertyDescription(propertyDetails?.description || "");
      setLengthArea(propertyDetails?.length_area?.toString() || "");
      setWidthArea(propertyDetails?.width_area?.toString() || "");
      setSuitableFor(propertyDetails?.business_types || "");
      setTotalProjectArea(propertyDetails?.total_project_area || "");
      setPentHouse(propertyDetails?.pent_house || "");
      setPreferredTenantType(propertyDetails?.types || "");
      setPossessionStatus(propertyDetails?.possession_status || "");
      setServantRoom(propertyDetails?.servant_room || "");
      setInvestorProperty(propertyDetails?.investor_property || "");
      setBuilderPlot(propertyDetails?.builder_plot || "");
      setLoanFacility(propertyDetails?.loan_facility || "");
      setPantryRoom(propertyDetails?.pantry_room || "");
      if (propertyDetails?.total_places_around_property) {
        setTotalPlacesaroundProperty(
          propertyDetails?.total_places_around_property
        );
      } else {
        setTotalPlacesaroundProperty([]);
      }
    }
  }, [propertyDetails]);

  const [allPropertySubTypes, setAllPropertySubTypes] = useState([]);
  const getPropertySubTypes = () => {
    Propertyapi.get("getpropertysubtypes", {
      params: {
        user_id: user_id,
        property_in: getpropertyDetails?.property_in,
      },
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
        }
        if (data.status === "success") {
          setAllPropertySubTypes(data?.property_sub_type || []);
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
        return false;
      });
  };

  // const getAllFacilities = () => {
  //   Propertyapi.get('getfaclities', {
  //     params: {
  //       user_id: user_id
  //     },
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${access_token}`
  //     }
  //   })

  //     .then((response) => {
  //       let data = response.data
  //       if (data.status === 'error') {
  //         let finalResponse = {
  //           'message': data.message,
  //         }
  //         setErrorMessages(finalResponse)
  //       }
  //       if (data.status === 'success') {
  //         setFacilities(data?.facilities)
  //       }
  //     }
  //     )
  //     .catch((error) => {
  //       console.log(error)
  //       let finalresponse;
  //       if (error.response !== undefined) {
  //         finalresponse = {
  //           'message': error.message,
  //         };
  //       }
  //       else {
  //         finalresponse = {
  //           'message': error.message,
  //         };
  //       }
  //       setErrorMessages(finalresponse);
  //       return false;
  //     })
  // }

  useEffect(() => {
    if (getpropertyDetails?.property_for === "Rent") {
      setConstructionStatus("");
      setPossessionStatus("");
      setLengthArea("");
      setWidthArea("");
    }
    if (getpropertyDetails?.property_for === "Sell") {
      setMonthlyRent("");
      setMaintenceCharges("");
      setSecurityDeposit("");
      setLockInPeriod("");
      setPreferredTenantType("");
      setBrokerage("");
      setAvailableFromDate("");
    }
    if (getpropertyDetails?.property_in === "Residential") {
      setPassengerLifts("");
      setServiceLifts("");
      setStairCases("");
      setPrivateParking("");
      setPublicParking("");
      setPrivateWashrooms("");
      setPublicWashrooms("");
    }
    if (
      !(
        getpropertyDetails?.property_in === "Commercial" &&
        getpropertyDetails?.property_for === "Sell"
      )
    ) {
      setOwnerShip("");
    }
    if (getpropertyDetails?.property_for !== "Rent") {
      setLoanFacility("");
    }
  }, [getpropertyDetails]);

  useEffect(() => {
    getPropertySubTypes();
    // getAllFacilities()
  }, []);

  const propertySubTypeIcon = {
    default: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 53 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M51.2333 38.8667H49.4667V8.83333C49.4667 8.36478 49.2805 7.91543 48.9492 7.58411C48.6179 7.2528 48.1685 7.06667 47.7 7.06667H38.8667V1.76667C38.8667 1.29812 38.6805 0.848759 38.3492 0.517445C38.0179 0.186131 37.5686 0 37.1 0H15.9C15.4315 0 14.9821 0.186131 14.6508 0.517445C14.3195 0.848759 14.1333 1.29812 14.1333 1.76667V14.1333H5.3C4.83145 14.1333 4.38209 14.3195 4.05078 14.6508C3.71946 14.9821 3.53333 15.4315 3.53333 15.9V38.8667H1.76667C1.29812 38.8667 0.848759 39.0528 0.517445 39.3841C0.18613 39.7154 0 40.1648 0 40.6333C0 41.1019 0.18613 41.5512 0.517445 41.8826C0.848759 42.2139 1.29812 42.4 1.76667 42.4H51.2333C51.7019 42.4 52.1512 42.2139 52.4826 41.8826C52.8139 41.5512 53 41.1019 53 40.6333C53 40.1648 52.8139 39.7154 52.4826 39.3841C52.1512 39.0528 51.7019 38.8667 51.2333 38.8667ZM7.06667 17.6667H15.9C16.3685 17.6667 16.8179 17.4805 17.1492 17.1492C17.4805 16.8179 17.6667 16.3685 17.6667 15.9V3.53333H35.3333V8.83333C35.3333 9.30188 35.5195 9.75124 35.8508 10.0826C36.1821 10.4139 36.6315 10.6 37.1 10.6H45.9333V38.8667H31.8V30.0333C31.8 29.5648 31.6139 29.1154 31.2826 28.7841C30.9512 28.4528 30.5019 28.2667 30.0333 28.2667H22.9667C22.4981 28.2667 22.0488 28.4528 21.7174 28.7841C21.3861 29.1154 21.2 29.5648 21.2 30.0333V38.8667H7.06667V17.6667ZM28.2667 38.8667H24.7333V31.8H28.2667V38.8667ZM22.9667 8.83333C22.9667 8.36478 23.1528 7.91543 23.4841 7.58411C23.8154 7.2528 24.2648 7.06667 24.7333 7.06667H28.2667C28.7352 7.06667 29.1846 7.2528 29.5159 7.58411C29.8472 7.91543 30.0333 8.36478 30.0333 8.83333C30.0333 9.30188 29.8472 9.75124 29.5159 10.0826C29.1846 10.4139 28.7352 10.6 28.2667 10.6H24.7333C24.2648 10.6 23.8154 10.4139 23.4841 10.0826C23.1528 9.75124 22.9667 9.30188 22.9667 8.83333ZM22.9667 15.9C22.9667 15.4315 23.1528 14.9821 23.4841 14.6508C23.8154 14.3195 24.2648 14.1333 24.7333 14.1333H28.2667C28.7352 14.1333 29.1846 14.3195 29.5159 14.6508C29.8472 14.9821 30.0333 15.4315 30.0333 15.9C30.0333 16.3685 29.8472 16.8179 29.5159 17.1492C29.1846 17.4805 28.7352 17.6667 28.2667 17.6667H24.7333C24.2648 17.6667 23.8154 17.4805 23.4841 17.1492C23.1528 16.8179 22.9667 16.3685 22.9667 15.9ZM35.3333 15.9C35.3333 15.4315 35.5195 14.9821 35.8508 14.6508C36.1821 14.3195 36.6315 14.1333 37.1 14.1333H40.6333C41.1019 14.1333 41.5512 14.3195 41.8826 14.6508C42.2139 14.9821 42.4 15.4315 42.4 15.9C42.4 16.3685 42.2139 16.8179 41.8826 17.1492C41.5512 17.4805 41.1019 17.6667 40.6333 17.6667H37.1C36.6315 17.6667 36.1821 17.4805 35.8508 17.1492C35.5195 16.8179 35.3333 16.3685 35.3333 15.9ZM17.6667 22.9667C17.6667 23.4352 17.4805 23.8846 17.1492 24.2159C16.8179 24.5472 16.3685 24.7333 15.9 24.7333H12.3667C11.8981 24.7333 11.4488 24.5472 11.1174 24.2159C10.7861 23.8846 10.6 23.4352 10.6 22.9667C10.6 22.4981 10.7861 22.0488 11.1174 21.7174C11.4488 21.3861 11.8981 21.2 12.3667 21.2H15.9C16.3685 21.2 16.8179 21.3861 17.1492 21.7174C17.4805 22.0488 17.6667 22.4981 17.6667 22.9667ZM17.6667 30.0333C17.6667 30.5019 17.4805 30.9512 17.1492 31.2826C16.8179 31.6139 16.3685 31.8 15.9 31.8H12.3667C11.8981 31.8 11.4488 31.6139 11.1174 31.2826C10.7861 30.9512 10.6 30.5019 10.6 30.0333C10.6 29.5648 10.7861 29.1154 11.1174 28.7841C11.4488 28.4528 11.8981 28.2667 12.3667 28.2667H15.9C16.3685 28.2667 16.8179 28.4528 17.1492 28.7841C17.4805 29.1154 17.6667 29.5648 17.6667 30.0333ZM22.9667 22.9667C22.9667 22.4981 23.1528 22.0488 23.4841 21.7174C23.8154 21.3861 24.2648 21.2 24.7333 21.2H28.2667C28.7352 21.2 29.1846 21.3861 29.5159 21.7174C29.8472 22.0488 30.0333 22.4981 30.0333 22.9667C30.0333 23.4352 29.8472 23.8846 29.5159 24.2159C29.1846 24.5472 28.7352 24.7333 28.2667 24.7333H24.7333C24.2648 24.7333 23.8154 24.5472 23.4841 24.2159C23.1528 23.8846 22.9667 23.4352 22.9667 22.9667ZM35.3333 22.9667C35.3333 22.4981 35.5195 22.0488 35.8508 21.7174C36.1821 21.3861 36.6315 21.2 37.1 21.2H40.6333C41.1019 21.2 41.5512 21.3861 41.8826 21.7174C42.2139 22.0488 42.4 22.4981 42.4 22.9667C42.4 23.4352 42.2139 23.8846 41.8826 24.2159C41.5512 24.5472 41.1019 24.7333 40.6333 24.7333H37.1C36.6315 24.7333 36.1821 24.5472 35.8508 24.2159C35.5195 23.8846 35.3333 23.4352 35.3333 22.9667ZM35.3333 30.0333C35.3333 29.5648 35.5195 29.1154 35.8508 28.7841C36.1821 28.4528 36.6315 28.2667 37.1 28.2667H40.6333C41.1019 28.2667 41.5512 28.4528 41.8826 28.7841C42.2139 29.1154 42.4 29.5648 42.4 30.0333C42.4 30.5019 42.2139 30.9512 41.8826 31.2826C41.5512 31.6139 41.1019 31.8 40.6333 31.8H37.1C36.6315 31.8 36.1821 31.6139 35.8508 31.2826C35.5195 30.9512 35.3333 30.5019 35.3333 30.0333Z"
          fill="#909090"
        />
      </svg>
    ),
    Apartment: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 53 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M51.2333 38.8667H49.4667V8.83333C49.4667 8.36478 49.2805 7.91543 48.9492 7.58411C48.6179 7.2528 48.1685 7.06667 47.7 7.06667H38.8667V1.76667C38.8667 1.29812 38.6805 0.848759 38.3492 0.517445C38.0179 0.186131 37.5686 0 37.1 0H15.9C15.4315 0 14.9821 0.186131 14.6508 0.517445C14.3195 0.848759 14.1333 1.29812 14.1333 1.76667V14.1333H5.3C4.83145 14.1333 4.38209 14.3195 4.05078 14.6508C3.71946 14.9821 3.53333 15.4315 3.53333 15.9V38.8667H1.76667C1.29812 38.8667 0.848759 39.0528 0.517445 39.3841C0.18613 39.7154 0 40.1648 0 40.6333C0 41.1019 0.18613 41.5512 0.517445 41.8826C0.848759 42.2139 1.29812 42.4 1.76667 42.4H51.2333C51.7019 42.4 52.1512 42.2139 52.4826 41.8826C52.8139 41.5512 53 41.1019 53 40.6333C53 40.1648 52.8139 39.7154 52.4826 39.3841C52.1512 39.0528 51.7019 38.8667 51.2333 38.8667ZM7.06667 17.6667H15.9C16.3685 17.6667 16.8179 17.4805 17.1492 17.1492C17.4805 16.8179 17.6667 16.3685 17.6667 15.9V3.53333H35.3333V8.83333C35.3333 9.30188 35.5195 9.75124 35.8508 10.0826C36.1821 10.4139 36.6315 10.6 37.1 10.6H45.9333V38.8667H31.8V30.0333C31.8 29.5648 31.6139 29.1154 31.2826 28.7841C30.9512 28.4528 30.5019 28.2667 30.0333 28.2667H22.9667C22.4981 28.2667 22.0488 28.4528 21.7174 28.7841C21.3861 29.1154 21.2 29.5648 21.2 30.0333V38.8667H7.06667V17.6667ZM28.2667 38.8667H24.7333V31.8H28.2667V38.8667ZM22.9667 8.83333C22.9667 8.36478 23.1528 7.91543 23.4841 7.58411C23.8154 7.2528 24.2648 7.06667 24.7333 7.06667H28.2667C28.7352 7.06667 29.1846 7.2528 29.5159 7.58411C29.8472 7.91543 30.0333 8.36478 30.0333 8.83333C30.0333 9.30188 29.8472 9.75124 29.5159 10.0826C29.1846 10.4139 28.7352 10.6 28.2667 10.6H24.7333C24.2648 10.6 23.8154 10.4139 23.4841 10.0826C23.1528 9.75124 22.9667 9.30188 22.9667 8.83333ZM22.9667 15.9C22.9667 15.4315 23.1528 14.9821 23.4841 14.6508C23.8154 14.3195 24.2648 14.1333 24.7333 14.1333H28.2667C28.7352 14.1333 29.1846 14.3195 29.5159 14.6508C29.8472 14.9821 30.0333 15.4315 30.0333 15.9C30.0333 16.3685 29.8472 16.8179 29.5159 17.1492C29.1846 17.4805 28.7352 17.6667 28.2667 17.6667H24.7333C24.2648 17.6667 23.8154 17.4805 23.4841 17.1492C23.1528 16.8179 22.9667 16.3685 22.9667 15.9ZM35.3333 15.9C35.3333 15.4315 35.5195 14.9821 35.8508 14.6508C36.1821 14.3195 36.6315 14.1333 37.1 14.1333H40.6333C41.1019 14.1333 41.5512 14.3195 41.8826 14.6508C42.2139 14.9821 42.4 15.4315 42.4 15.9C42.4 16.3685 42.2139 16.8179 41.8826 17.1492C41.5512 17.4805 41.1019 17.6667 40.6333 17.6667H37.1C36.6315 17.6667 36.1821 17.4805 35.8508 17.1492C35.5195 16.8179 35.3333 16.3685 35.3333 15.9ZM17.6667 22.9667C17.6667 23.4352 17.4805 23.8846 17.1492 24.2159C16.8179 24.5472 16.3685 24.7333 15.9 24.7333H12.3667C11.8981 24.7333 11.4488 24.5472 11.1174 24.2159C10.7861 23.8846 10.6 23.4352 10.6 22.9667C10.6 22.4981 10.7861 22.0488 11.1174 21.7174C11.4488 21.3861 11.8981 21.2 12.3667 21.2H15.9C16.3685 21.2 16.8179 21.3861 17.1492 21.7174C17.4805 22.0488 17.6667 22.4981 17.6667 22.9667ZM17.6667 30.0333C17.6667 30.5019 17.4805 30.9512 17.1492 31.2826C16.8179 31.6139 16.3685 31.8 15.9 31.8H12.3667C11.8981 31.8 11.4488 31.6139 11.1174 31.2826C10.7861 30.9512 10.6 30.5019 10.6 30.0333C10.6 29.5648 10.7861 29.1154 11.1174 28.7841C11.4488 28.4528 11.8981 28.2667 12.3667 28.2667H15.9C16.3685 28.2667 16.8179 28.4528 17.1492 28.7841C17.4805 29.1154 17.6667 29.5648 17.6667 30.0333ZM22.9667 22.9667C22.9667 22.4981 23.1528 22.0488 23.4841 21.7174C23.8154 21.3861 24.2648 21.2 24.7333 21.2H28.2667C28.7352 21.2 29.1846 21.3861 29.5159 21.7174C29.8472 22.0488 30.0333 22.4981 30.0333 22.9667C30.0333 23.4352 29.8472 23.8846 29.5159 24.2159C29.1846 24.5472 28.7352 24.7333 28.2667 24.7333H24.7333C24.2648 24.7333 23.8154 24.5472 23.4841 24.2159C23.1528 23.8846 22.9667 23.4352 22.9667 22.9667ZM35.3333 22.9667C35.3333 22.4981 35.5195 22.0488 35.8508 21.7174C36.1821 21.3861 36.6315 21.2 37.1 21.2H40.6333C41.1019 21.2 41.5512 21.3861 41.8826 21.7174C42.2139 22.0488 42.4 22.4981 42.4 22.9667C42.4 23.4352 42.2139 23.8846 41.8826 24.2159C41.5512 24.5472 41.1019 24.7333 40.6333 24.7333H37.1C36.6315 24.7333 36.1821 24.5472 35.8508 24.2159C35.5195 23.8846 35.3333 23.4352 35.3333 22.9667ZM35.3333 30.0333C35.3333 29.5648 35.5195 29.1154 35.8508 28.7841C36.1821 28.4528 36.6315 28.2667 37.1 28.2667H40.6333C41.1019 28.2667 41.5512 28.4528 41.8826 28.7841C42.2139 29.1154 42.4 29.5648 42.4 30.0333C42.4 30.5019 42.2139 30.9512 41.8826 31.2826C41.5512 31.6139 41.1019 31.8 40.6333 31.8H37.1C36.6315 31.8 36.1821 31.6139 35.8508 31.2826C35.5195 30.9512 35.3333 30.5019 35.3333 30.0333Z"
          fill="#909090"
        />
      </svg>
    ),
    Flat: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 36 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.0625 3.375C4.61495 3.375 4.18572 3.55279 3.86926 3.86926C3.55279 4.18572 3.375 4.61495 3.375 5.0625V41.625H7.875V35.4375C7.875 33.885 9.135 32.625 10.6875 32.625H25.3125C26.865 32.625 28.125 33.885 28.125 35.4375V41.625H32.625V21.9375C32.625 21.4899 32.4472 21.0607 32.1307 20.7443C31.8143 20.4278 31.3851 20.25 30.9375 20.25H26.4375C25.9899 20.25 25.5607 20.0722 25.2443 19.7557C24.9278 19.4393 24.75 19.0101 24.75 18.5625V5.0625C24.75 4.61495 24.5722 4.18572 24.2557 3.86926C23.9393 3.55279 23.5101 3.375 23.0625 3.375H5.0625ZM11.25 36V41.625H16.3125V36H11.25ZM19.6875 36V41.625H24.75V36H19.6875ZM34.3125 45H1.6875C1.23995 45 0.810725 44.8222 0.494257 44.5057C0.177789 44.1893 0 43.7601 0 43.3125V5.0625C0 3.71984 0.533369 2.43217 1.48277 1.48277C2.43218 0.533369 3.71984 0 5.0625 0H23.0625C24.4052 0 25.6928 0.533369 26.6422 1.48277C27.5916 2.43217 28.125 3.71984 28.125 5.0625V16.875H30.9375C31.6023 16.875 32.2606 17.0059 32.8748 17.2604C33.489 17.5148 34.0471 17.8877 34.5172 18.3578C34.9873 18.8279 35.3602 19.386 35.6146 20.0002C35.8691 20.6144 36 21.2727 36 21.9375V43.3125C36 43.7601 35.8222 44.1893 35.5057 44.5057C35.1893 44.8222 34.7601 45 34.3125 45ZM7.875 10.125C7.875 9.52826 8.11205 8.95597 8.53401 8.53401C8.95597 8.11205 9.52826 7.875 10.125 7.875C10.7217 7.875 11.294 8.11205 11.716 8.53401C12.1379 8.95597 12.375 9.52826 12.375 10.125C12.375 10.7217 12.1379 11.294 11.716 11.716C11.294 12.1379 10.7217 12.375 10.125 12.375C9.52826 12.375 8.95597 12.1379 8.53401 11.716C8.11205 11.294 7.875 10.7217 7.875 10.125ZM10.125 23.625C9.52826 23.625 8.95597 23.8621 8.53401 24.284C8.11205 24.706 7.875 25.2783 7.875 25.875C7.875 26.4717 8.11205 27.044 8.53401 27.466C8.95597 27.8879 9.52826 28.125 10.125 28.125C10.7217 28.125 11.294 27.8879 11.716 27.466C12.1379 27.044 12.375 26.4717 12.375 25.875C12.375 25.2783 12.1379 24.706 11.716 24.284C11.294 23.8621 10.7217 23.625 10.125 23.625ZM10.125 15.75C9.52826 15.75 8.95597 15.9871 8.53401 16.409C8.11205 16.831 7.875 17.4033 7.875 18C7.875 18.5967 8.11205 19.169 8.53401 19.591C8.95597 20.0129 9.52826 20.25 10.125 20.25C10.7217 20.25 11.294 20.0129 11.716 19.591C12.1379 19.169 12.375 18.5967 12.375 18C12.375 17.4033 12.1379 16.831 11.716 16.409C11.294 15.9871 10.7217 15.75 10.125 15.75ZM18 7.875C17.4033 7.875 16.831 8.11205 16.409 8.53401C15.9871 8.95597 15.75 9.52826 15.75 10.125C15.75 10.7217 15.9871 11.294 16.409 11.716C16.831 12.1379 17.4033 12.375 18 12.375C18.5967 12.375 19.169 12.1379 19.591 11.716C20.0129 11.294 20.25 10.7217 20.25 10.125C20.25 9.52826 20.0129 8.95597 19.591 8.53401C19.169 8.11205 18.5967 7.875 18 7.875ZM18 23.625C17.4033 23.625 16.831 23.8621 16.409 24.284C15.9871 24.706 15.75 25.2783 15.75 25.875C15.75 26.4717 15.9871 27.044 16.409 27.466C16.831 27.8879 17.4033 28.125 18 28.125C18.5967 28.125 19.169 27.8879 19.591 27.466C20.0129 27.044 20.25 26.4717 20.25 25.875C20.25 25.2783 20.0129 24.706 19.591 24.284C19.169 23.8621 18.5967 23.625 18 23.625ZM25.875 23.625C25.2783 23.625 24.706 23.8621 24.284 24.284C23.8621 24.706 23.625 25.2783 23.625 25.875C23.625 26.4717 23.8621 27.044 24.284 27.466C24.706 27.8879 25.2783 28.125 25.875 28.125C26.4717 28.125 27.044 27.8879 27.466 27.466C27.8879 27.044 28.125 26.4717 28.125 25.875C28.125 25.2783 27.8879 24.706 27.466 24.284C27.044 23.8621 26.4717 23.625 25.875 23.625ZM18 15.75C17.4033 15.75 16.831 15.9871 16.409 16.409C15.9871 16.831 15.75 17.4033 15.75 18C15.75 18.5967 15.9871 19.169 16.409 19.591C16.831 20.0129 17.4033 20.25 18 20.25C18.5967 20.25 19.169 20.0129 19.591 19.591C20.0129 19.169 20.25 18.5967 20.25 18C20.25 17.4033 20.0129 16.831 19.591 16.409C19.169 15.9871 18.5967 15.75 18 15.75Z"
          fill="#909090"
        />
      </svg>
    ),
    "Independent House": (
      <svg
        width="28"
        height="28"
        viewBox="0 0 54 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52.1993 41.4H48.5994V25.2003L49.1259 25.7267C49.4642 26.0645 49.9229 26.254 50.4009 26.2536C50.879 26.2532 51.3373 26.0628 51.6751 25.7245C52.0128 25.3862 52.2023 24.9275 52.2019 24.4494C52.2015 23.9714 52.0112 23.513 51.6728 23.1753L29.5444 1.05357C28.8693 0.378956 27.954 0 26.9997 0C26.0453 0 25.13 0.378956 24.4549 1.05357L2.32647 23.1753C1.98902 23.513 1.79956 23.971 1.79977 24.4484C1.79998 24.9259 1.98985 25.3837 2.32759 25.7211C2.66534 26.0586 3.12331 26.248 3.60075 26.2478C4.07819 26.2476 4.53599 26.0577 4.87344 25.72L5.39993 25.2003V41.4H1.79998C1.32259 41.4 0.864762 41.5897 0.527201 41.9272C0.18964 42.2648 0 42.7226 0 43.2C0 43.6774 0.18964 44.1352 0.527201 44.4728C0.864762 44.8104 1.32259 45 1.79998 45H52.1993C52.6767 45 53.1345 44.8104 53.4721 44.4728C53.8097 44.1352 53.9993 43.6774 53.9993 43.2C53.9993 42.7226 53.8097 42.2648 53.4721 41.9272C53.1345 41.5897 52.6767 41.4 52.1993 41.4ZM8.99988 21.6003L26.9997 3.60054L44.9994 21.6003V41.4H34.1996V28.8002C34.1996 28.3228 34.0099 27.865 33.6724 27.5274C33.3348 27.1899 32.877 27.0002 32.3996 27.0002H21.5997C21.1223 27.0002 20.6645 27.1899 20.3269 27.5274C19.9894 27.865 19.7997 28.3228 19.7997 28.8002V41.4H8.99988V21.6003ZM30.5996 41.4H23.3997V30.6002H30.5996V41.4Z"
          fill="#909090"
        />
      </svg>
    ),
    "Independent Villa": (
      <svg
        width="28"
        height="28"
        viewBox="0 0 49 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43.5556 19.0556C40.5611 19.0556 38.1111 21.5056 38.1111 24.5H35.3889V0L0 13.6111V49H49V24.5C49 21.5056 46.55 19.0556 43.5556 19.0556ZM5.44444 17.3406L29.9444 7.92167V24.5H16.3333V43.5556H5.44444V17.3406ZM43.5556 43.5556H35.3889V35.3889H29.9444V43.5556H21.7778V29.9444H43.5556V43.5556Z"
          fill="#909090"
        />
      </svg>
    ),
    Plot: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 49 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45.9375 0H3.0625C2.25027 0 1.47132 0.397114 0.896985 1.10398C0.322655 1.81085 0 2.76957 0 3.76923V45.2308C0 46.2304 0.322655 47.1892 0.896985 47.896C1.47132 48.6029 2.25027 49 3.0625 49H45.9375C46.7497 49 47.5287 48.6029 48.103 47.896C48.6773 47.1892 49 46.2304 49 45.2308V3.76923C49 2.76957 48.6773 1.81085 48.103 1.10398C47.5287 0.397114 46.7497 0 45.9375 0ZM3.0625 45.2308V3.76923H45.9375V45.2308H3.0625Z"
          fill="#909090"
        />
        <path
          d="M7.65625 13.1914H22.9687V39.576H7.65625V13.1914ZM10.1063 36.5606H20.5187V26.0068H10.1063V36.5606ZM20.5187 16.2068H10.1063V22.9914H20.5187V16.2068Z"
          fill="#909090"
        />
        <path
          d="M26.0312 35.8065H41.3437V9.42188H26.0312V35.8065ZM28.4813 12.4373H38.8937V22.9911H28.4813V12.4373ZM38.8937 32.7911H28.4813V26.0065H38.8937V32.7911Z"
          fill="#909090"
        />
      </svg>
    ),
    Land: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 49 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.1 0H4.9C2.205 0 0 2.205 0 4.9V44.1C0 46.795 2.205 49 4.9 49H44.1C46.795 49 49 46.795 49 44.1V4.9C49 2.205 46.795 0 44.1 0ZM32.585 4.9C30.625 7.595 29.4 11.025 29.4 14.7H19.6C19.6 10.78 21.56 7.105 24.5 4.9H32.585ZM29.4 29.4H19.6C19.6 25.725 18.375 22.295 16.415 19.6H24.5C27.44 21.805 29.4 25.48 29.4 29.4ZM4.9 4.9H17.885C15.925 7.595 14.7 11.025 14.7 14.7H4.9V4.9ZM4.9 19.6H9.8C12.74 21.805 14.7 25.235 14.7 29.4H4.9V19.6ZM4.9 44.1V34.3H17.885C15.925 36.995 14.7 40.425 14.7 44.1H4.9ZM19.6 44.1C19.6 40.18 21.56 36.505 24.5 34.3H32.585C30.625 36.995 29.4 40.425 29.4 44.1H19.6ZM44.1 44.1H34.3C34.3 40.18 36.26 36.505 39.2 34.3H44.1V44.1ZM44.1 29.4H34.3C34.3 25.725 33.075 22.295 31.115 19.6H44.1V29.4ZM44.1 14.7H34.3C34.3 10.78 36.26 7.105 39.2 4.9H44.1V14.7Z"
          fill="#909090"
        />
      </svg>
    ),
  };

  return (
    <div className="relative">
      <div className="py-2 bg-[#E2EAED]">
        <div className="flex justify-start items-center px-5">
          <div
            className="w-9 cursor-pointer"
            onClick={() =>
              updateActiveTab("basicdetails", "completed", unique_property_id)
            }
          >
            <IconArrowNarrowLeft size={18} color="#1D3A76" />
          </div>
          <p className=" w-full text-md sm:text-lg font-bold text-[#1D3A76] text-center font-sans">
            ADD PROPERTY DETAILS
          </p>
        </div>
      </div>
      <div className="w-full overflow-y-auto px-5 py-3 sm:h-[calc(100vh-240px)] h-[calc(100vh-280px)]">
        <div className="mb-5">
          <div className="flex gap-1 mb-4">
            <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
              Property Sub Type
            </p>
            <IconAsterisk size={8} color="#FF0000" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-wrap">
            {allPropertySubTypes.length > 0 &&
              allPropertySubTypes.map((item, index) => {
                const icon =
                  propertySubTypeIcon[item.name] ||
                  propertySubTypeIcon["default"];
                return (
                  <div
                    key={index}
                    onClick={() => updatePropertySubType(item.name)}
                    className={`flex flex-col justify-center items-center gap-2 border-2 rounded-md px-8 py-2 w-[100%] cursor-pointer ${
                      propertySubType === item.name
                        ? "bg-[#1D3A76] border-[#1D3A76] "
                        : "border-[#d7d5d5ba] "
                    } `}
                  >
                    {icon}
                    <p
                      className={`text-[10px] text-center font-medium ${
                        propertySubType === item.name
                          ? "text-white"
                          : "text-[#1D3A76]"
                      } `}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              })}
          </div>
          {propertySubTypeError && (
            <p className="text-[#FF0000] text-xs font-sans">
              Please select Property type
            </p>
          )}
        </div>
        {getpropertyDetails?.property_in !== "Residential" &&
          getpropertyDetails?.property_for !== "Rent" && (
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  RERA Approved
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-6">
                <div
                  onClick={() => updateReraApproved("Yes")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    reraApproved === "Yes"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      reraApproved === "Yes"
                        ? "text-white "
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    Yes
                  </p>
                </div>
                <div
                  onClick={() => updateReraApproved("No")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    reraApproved === "No"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      reraApproved === "No"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    No
                  </p>
                </div>
              </div>
              {reraApprovedError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select one option
                </p>
              )}
            </div>
          )}
        {getpropertyDetails?.property_for === "Sell" &&
          !(propertySubType === "Plot" || propertySubType === "Land") && (
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Construction Status
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-4 sm:gap-6 flex-wrap">
                {occupancyList.length > 0 &&
                  occupancyList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => updateConstructionStatus(item.value)}
                        className={`group cursor-pointer px-8 py-2 rounded-md  ${
                          constructionStatus === item.value
                            ? "border border-[#1D3A76] bg-[#1D3A76]"
                            : "border border-[#909090]  hover:bg-[#1D3A76]"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-sans ${
                            constructionStatus === item.value
                              ? "text-white"
                              : "text-[#1D3A76] font-semibold group-hover:text-white"
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
              </div>
              {constructionStatusError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select construction status
                </p>
              )}
            </div>
          )}
        {(propertySubType === "Apartment" ||
          propertySubType === "Flat" ||
          propertySubType === "Independent House" ||
          propertySubType === "Independent Villa") && (
          <div className="mb-5">
            <div className="flex gap-1 mb-4">
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                BHK
              </p>
              <IconAsterisk size={8} color="#FF0000" />
            </div>
            <div className="flex flex-row items-center gap-4 sm:gap-6 flex-wrap">
              {bedroomtypesList.length > 0 &&
                bedroomtypesList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => updateBhk(item.value)}
                      className={`group cursor-pointer px-8 py-2 rounded-md  ${
                        bhk === item.value
                          ? "border border-[#1D3A76] bg-[#1D3A76]"
                          : "border border-[#909090]  hover:bg-[#1D3A76]"
                      }`}
                    >
                      <p
                        className={`text-[10px] font-sans ${
                          bhk === item.value
                            ? "text-white"
                            : "text-[#1D3A76] font-semibold group-hover:text-white"
                        }`}
                      >
                        {item.name} BHK
                      </p>
                    </div>
                  );
                })}
            </div>
            {bhk === 5 && (
              <div className="my-5">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Custom BHK
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Custom bhk"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={customBhk}
                  onChange={updateCustomBhk}
                />
                {customBhkError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter custom BHK
                  </p>
                )}
              </div>
            )}
            {bhkError && (
              <p className="text-[#FF0000] text-xs font-sans">
                Please select BHK
              </p>
            )}
          </div>
        )}
        {(propertySubType === "Apartment" || propertySubType === "Flat") && (
          <>
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Bathroom
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-4 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateBathroom("1")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bathroom === "1"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={` text-[10px] font-sans ${
                      bathroom === "1"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    1{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateBathroom("2")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bathroom === "2"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bathroom === "2"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    2{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateBathroom("3")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bathroom === "3"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bathroom === "3"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    3{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateBathroom("4")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bathroom === "4"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bathroom === "4"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    4{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateBathroom("4plus")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bathroom === "4plus"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bathroom === "4plus"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    4+{" "}
                  </p>
                </div>
              </div>
              {bathroom === "4plus" && (
                <div className="my-5">
                  <div className="flex gap-1">
                    <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                      Custom Bathroom
                    </p>
                    <IconAsterisk size={8} color="#FF0000" />
                  </div>
                  <Textinput
                    type="number"
                    placeholder="Enter Custom bathroom"
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={customBathroom}
                    onChange={updateCustomBathroom}
                  />
                  {customBathroomError && (
                    <p className="text-[#FF0000] text-xs font-sans">
                      Please enter custom bathroom
                    </p>
                  )}
                </div>
              )}
              {bathroomError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select bathroom
                </p>
              )}
            </div>
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Balcony
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-4 sm:gap-6 flex-wrap">
                {bacloniesList.length > 0 &&
                  bacloniesList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => updateBalcony(item.value)}
                        className={`group cursor-pointer px-8 py-2 rounded-md  ${
                          balcony === item.value
                            ? "border border-[#1D3A76] bg-[#1D3A76]"
                            : "border border-[#909090]  hover:bg-[#1D3A76]"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-sans ${
                            balcony === item.value
                              ? "text-white"
                              : "text-[#1D3A76] font-semibold group-hover:text-white"
                          }`}
                        >
                          {item.name}{" "}
                        </p>
                      </div>
                    );
                  })}
              </div>
              {balcony === 5 && (
                <div className="my-5">
                  <div className="flex gap-1">
                    <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                      Custom Balcony
                    </p>
                    <IconAsterisk size={8} color="#FF0000" />
                  </div>
                  <Textinput
                    type="number"
                    placeholder="Enter Custom balcony"
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={customBalcony}
                    onChange={updateCustomBalcony}
                  />
                  {customBalconyError && (
                    <p className="text-[#FF0000] text-xs font-sans">
                      Please enter custom balcony
                    </p>
                  )}
                </div>
              )}
              {balconyError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select balcony
                </p>
              )}
            </div>
          </>
        )}
        {(propertySubType === "Apartment" ||
          propertySubType === "Independent House" ||
          propertySubType === "Independent Villa") && (
          <>
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans ">
                  Furnish Type
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-wrap">
                {furnishedtypesList.length > 0 &&
                  furnishedtypesList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => updateFurnishType(item.value)}
                        className={`group flex flex-col justify-center items-center gap-2 border-2 border-[#909090] rounded-md px-4 py-2 w-[100%] cursor-pointer ${
                          furnishType === item.value
                            ? "bg-[#1D3A76] border-[#1D3A76] "
                            : "border-[#d7d5d5ba] hover:bg-[#1D3A76]"
                        }`}
                      >
                        <p
                          className={`text-xs text-center font-medium ${
                            furnishType === item.value
                              ? "text-white"
                              : "text-[#1D3A76] group-hover:text-white"
                          } `}
                        >
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
              </div>
              {furnishTypeError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select furnish type
                </p>
              )}
            </div>
            {/* <div onClick={openFurnishingModal} className='cursor-pointer'>
              <p className='text-[#1D3A76] text-[13px] mb-4 font-medium font-sans'>+ Add Furnishings/ Amenties</p>
            </div> */}
          </>
        )}
        {(propertySubType === "Office" ||
          propertySubType === "Retail Shop" ||
          propertySubType === "Show Room") && (
          <>
            <p className="text-[#1D3A76] text-[14px] font-medium font-sans mt-6">
              Lift & Stair Cases{" "}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
              <div className="mb-6 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    {" "}
                    Passenger Lifts
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Passenger Lifts"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={passengerLifts}
                  onChange={updatePassengerLifts}
                />
                {passengerLiftsError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter passenger lifts
                  </p>
                )}
              </div>
              <div className="mb-6 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    {" "}
                    Service Lifts
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Service Lifts"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={serviceLifts}
                  onChange={updateServiceLifts}
                />
                {serviceLiftsError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please Enter service lifts
                  </p>
                )}
              </div>
              <div className="mb-6 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Stair Cases
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Stair Cases"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={stairCases}
                  onChange={updateStairCases}
                />
                {stairCasesError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter stair cases{" "}
                  </p>
                )}
              </div>
            </div>

            <p className="text-[#1D3A76] text-[14px] font-medium font-sans">
              Parking
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
              <div className="mb-6 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Private Parking
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Private Parking"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={privateParking}
                  onChange={updatePrivateParking}
                />
                {privateParkingError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter private parking
                  </p>
                )}
              </div>
              <div className="mb-6 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Public Parking
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Public Parking"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={publicParking}
                  onChange={updatePublicParking}
                />
                {publicParkingError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please Enter Public Parking
                  </p>
                )}
              </div>
            </div>

            <p className="text-[#1D3A76] text-[14px] font-medium font-sans">
              Washrooms
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
              <div className="mb-6 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Private Washrooms
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Private Washrooms"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={privateWashrooms}
                  onChange={updatePrivateWashrooms}
                />
                {privateWashroomsError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter private washrooms
                  </p>
                )}
              </div>
              <div className="mb-6 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Public Washrooms
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Enter Public Washrooms"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={publicWashrooms}
                  onChange={updatePublicWashrooms}
                />
                {publicWashroomsError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please Enter Public Washrooms
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        {(getpropertyDetails?.property_for === "Rent" ||
          getpropertyDetails?.property_for === "PG/Co-living") && (
          <div className="mb-5">
            <div className="flex gap-1 mb-1">
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                Available From{" "}
              </p>
              <IconAsterisk size={8} color="#FF0000" />
            </div>
            <div className="border-b border-[#d1d5db] w-full sm:w-[30%] px-3">
              <input
                type="date"
                id="date"
                className="text-[14px] w-full py-1 outline-none "
                autoComplete="off"
                value={availableFromDate}
                onChange={updateAvailableFromDate}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {availableFromDateError && (
              <p className="text-[#FF0000] text-xs font-sans">
                Please select Available From date
              </p>
            )}
          </div>
        )}
        {constructionStatus === 1 && (
          <div className="mb-5 w-full sm:w-[40%]">
            <Select
              label="Age of Property"
              labelClassName="!text-[#1D3A76] text-[13px] font-medium font-sans"
              data={[
                { value: "5", label: "0-5" },
                { value: "10", label: "5-10" },
                { value: "11", label: "Above 10" },
              ]}
              searchable
              withAsterisk
              value={ageofProperty}
              onChange={updateAgeofProperty}
              inputClassName="focus:ring-blue-500 focus:border-blue-500"
              className="!m-0 !p-0"
            />
            {ageofPropertyError && (
              <p className="text-[#FF0000] text-xs font-sans">
                Please select one
              </p>
            )}
          </div>
        )}
        {constructionStatus === 2 && (
          <div className="mb-5">
            <div className="flex gap-1 mb-1">
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                Possesion End
              </p>
              <IconAsterisk size={8} color="#FF0000" />
            </div>
            <div className="border-b border-[#d1d5db] w-full sm:w-[30%] px-3">
              <input
                type="date"
                id="date"
                className="text-[14px] w-full py-1 outline-none"
                autoComplete="off"
                value={possessionEndDate}
                onChange={updatePossessionEndDate}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {possessionEndDateError && (
              <p className="text-[#FF0000] text-xs font-sans">
                Please select possession end date
              </p>
            )}
          </div>
        )}
        {(getpropertyDetails?.property_for === "Rent" ||
          getpropertyDetails?.property_for === "PG/Co-living") && (
          <>
            <div className="my-6">
              <div className="flex gap-1">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Monthly Rent
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <Textinput
                type="number"
                placeholder="Cost(per month)"
                inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                value={monthlyRent}
                onChange={updateMonthlyRent}
              />
              {monthlyRent && <NumberToWords value={monthlyRent} />}
              {monthlyRentError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  {monthlyRentError}
                </p>
              )}
            </div>
            <div className="my-6">
              <div className="flex gap-1">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Maintence Charge(per Month)
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <Textinput
                type="number"
                placeholder="Cost(per month)"
                inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                value={maintenceCharges}
                onChange={updateMaintenceCharges}
              />
              {maintenceCharges && <NumberToWords value={maintenceCharges} />}
              {maintenceChargesError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please enter maintence charges
                </p>
              )}
            </div>
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Security Deposit
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateSecurityDeposit("1")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    securityDeposit === "1"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      securityDeposit === "1"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    1 Month
                  </p>
                </div>
                <div
                  onClick={() => updateSecurityDeposit("2")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    securityDeposit === "2"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      securityDeposit === "2"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    2 Months
                  </p>
                </div>
                <div
                  onClick={() => updateSecurityDeposit("3")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    securityDeposit === "3"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      securityDeposit === "3"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    3 Months
                  </p>
                </div>
              </div>
              {securityDepositError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select security deposit
                </p>
              )}
            </div>
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Lock In Period
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateLockInPeriod("1")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    lockInPeriod === "1"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      lockInPeriod === "1"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    1 Month
                  </p>
                </div>
                <div
                  onClick={() => updateLockInPeriod("2")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    lockInPeriod === "2"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      lockInPeriod === "2"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    2 Months
                  </p>
                </div>
                <div
                  onClick={() => updateLockInPeriod("3")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    lockInPeriod === "3"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      lockInPeriod === "3"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    3 Months
                  </p>
                </div>
              </div>
              {lockInPeriodError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select lock in period
                </p>
              )}
            </div>
            <div className="mb-5">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Do You Charge Brokerage?
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateBrokerage("0")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    brokerage === "0"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      brokerage === "0"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    None
                  </p>
                </div>
                <div
                  onClick={() => updateBrokerage("15")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    brokerage === "15"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      brokerage === "15"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    15 Days
                  </p>
                </div>
                <div
                  onClick={() => updateBrokerage("30")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    brokerage === "30"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      brokerage === "30"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    30 Days
                  </p>
                </div>
              </div>
              {brokerageError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select brokerage
                </p>
              )}
            </div>
            {(getpropertyDetails.property_in !== "Commercial" ||
              propertySubType === "Plot" ||
              propertySubType === "Land") && (
              <div className="mb-5">
                <div className="flex gap-1 mb-4">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Prefered Tenant Type
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                {preferedTenantList?.length > 0 && (
                  <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                    {preferedTenantList.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => updatePreferredTenantType(item.value)}
                        className={`group cursor-pointer px-8 py-2 rounded-md  ${
                          preferredTenantType === item.value
                            ? "border border-[#1D3A76] bg-[#1D3A76]"
                            : "border border-[#909090]  hover:bg-[#1D3A76]"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-sans ${
                            preferredTenantType === item.value
                              ? "text-white"
                              : "text-[#1D3A76] font-semibold group-hover:text-white"
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {preferredTenantTypeError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please select preferred tenant type
                  </p>
                )}
              </div>
            )}
          </>
        )}
        <div className="mb-5 w-full sm:w-[40%]">
          <Select
            label="Area units"
            labelClassName="!text-[#1D3A76] text-[13px] font-medium font-sans"
            data={areaunitsList}
            searchable
            withAsterisk
            value={areaUnits}
            onChange={updateAreaUnits}
            inputClassName="focus:ring-blue-500 focus:border-blue-500"
            className="!m-0 !p-0"
          />
          {areaUnitsError && (
            <p className="text-[#FF0000] text-xs font-sans">
              Please select one
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {(propertySubType === "Apartment" ||
            propertySubType === "Flat" ||
            propertySubType === "Land" ||
            propertySubType === "Office" ||
            propertySubType === "Retail Shop" ||
            propertySubType === "Show Room" ||
            propertySubType === "Independent House" ||
            propertySubType === "Independent Villa") && (
            <>
              <div className="mt-3">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Built-up Area({areaUintsName})
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Built-up Area"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={builtupArea}
                  onChange={updateBuiltupArea}
                />
                {builtupAreaError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    {builtupAreaError}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Carpet Area({areaUintsName})
                  </p>
                  {/* <IconAsterisk size={8} color='#FF0000' /> */}
                </div>
                <Textinput
                  type="number"
                  placeholder="Carpet Area"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={carpetArea}
                  onChange={updateCarpetArea}
                />
                {carpetAreaError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    {carpetAreaError}
                  </p>
                )}
              </div>
            </>
          )}
          {(propertySubType === "Plot" || propertySubType === "Land") && (
            <>
              <div className="mt-3 ">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Length Area({areaUintsName})
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Length Area"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={lengthArea}
                  onChange={updateLengthArea}
                />
                {lengthAreaError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter length area
                  </p>
                )}
              </div>
              <div className="my-3">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Width Area({areaUintsName})
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  placeholder="Width Area"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={widthArea}
                  onChange={updateWidthArea}
                />
                {widthAreaError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please enter width area
                  </p>
                )}
              </div>
            </>
          )}
          {(propertySubType === "Independent House" ||
            propertySubType === "Independent Villa" ||
            propertySubType === "Plot" ||
            propertySubType === "Warehouse" ||
            propertySubType === "Others") && (
            <div className="my-3">
              <div className="flex gap-1">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Plot Area(Sq.Yd)
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <Textinput
                placeholder="Plot Area"
                inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                value={plotArea}
                onChange={updatePlotArea}
              />
              {plotAreaError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please enter plot area
                </p>
              )}
            </div>
          )}
          <div className="my-3">
            <div className="flex gap-1">
              <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                Total Project Area (Acres)
              </p>
              <IconAsterisk size={8} color="#FF0000" />
            </div>
            <Textinput
              type="number"
              placeholder="Enter Total Project Area"
              inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
              value={totalProjectArea}
              onChange={updateTotalProjectArea}
            />
            {totalProjectAreaError && (
              <p className="text-[#FF0000] text-xs font-sans">
                Please enter total project area
              </p>
            )}
          </div>
          {(propertySubType === "Independent House" ||
            propertySubType === "Independent Villa") && (
            <div className="mb-3">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Pent House
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updatePentHouse("Yes")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    pentHouse === "Yes"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      pentHouse === "Yes"
                        ? "text-white "
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    Yes
                  </p>
                </div>
                <div
                  onClick={() => updatePentHouse("No")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    pentHouse === "No"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      pentHouse === "No"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    No
                  </p>
                </div>
              </div>
              {pentHouseError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select one option
                </p>
              )}
            </div>
          )}
          {getpropertyDetails.property_for === "Sell" && (
            <>
              {!(
                propertySubType === "Independent House" ||
                propertySubType === "Independent Villa"
              ) && (
                <>
                  <div className="flex gap-1 mt-2">
                    <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                      Unit Cost ({areaUnits})
                    </p>
                    <IconAsterisk size={8} color="#FF0000" />
                  </div>
                  <div className="flex flex-row items-center ">
                    <div className="w-8">
                      <Textinput
                        value="Rs."
                        placeholder="Rs."
                        inputClassName="text-[12px] md:text-[14px] border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                    <div className="w-full">
                      <Textinput
                        type="number"
                        placeholder="Unit Cost"
                        inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                        value={unitCost}
                        onChange={updateUnitCost}
                      />
                      {unitCostError && (
                        <p className="text-[#FF0000] text-xs font-sans">
                          Please enter unit cost
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="my-3">
                <div className="flex gap-1">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Property Cost
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <Textinput
                  type="number"
                  placeholder="Property Cost"
                  inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                  value={propertyCost}
                  onChange={updatePropertyCost}
                />
                {propertyCost && <NumberToWords value={propertyCost} />}
                {propertyCostError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    {propertyCostError}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        {getpropertyDetails?.property_for === "Sell" &&
          (propertySubType === "Plot" || propertySubType === "Land") && (
            <div className="mb-5 mt-3">
              <div className="flex gap-1 mb-4">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Possession Status
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updatePossessionStatus("Immediate")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    possessionStatus === "Immediate"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      possessionStatus === "Immediate"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    Immediate
                  </p>
                </div>
                <div
                  onClick={() => updatePossessionStatus("Future")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    possessionStatus === "Future"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      possessionStatus === "Future"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    Future
                  </p>
                </div>
              </div>
              {possessionStatusError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select one
                </p>
              )}
            </div>
          )}
        {/* ownership */}
        {getpropertyDetails?.property_in === "Commercial" &&
          getpropertyDetails?.property_for === "Sell" && (
            <div className="mb-5 mt-2">
              <div className="flex gap-1">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Ownership
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                {ownershipList?.length > 0 &&
                  ownershipList.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => updateOwnerShip(item.value)}
                      className={`group cursor-pointer px-8 py-2 rounded-md  ${
                        ownerShip === item.value
                          ? "border border-[#1D3A76] bg-[#1D3A76]"
                          : "border border-[#909090]  hover:bg-[#1D3A76]"
                      }`}
                    >
                      <p
                        className={`text-[10px] font-sans ${
                          ownerShip === item.value
                            ? "text-white"
                            : "text-[#1D3A76] font-semibold group-hover:text-white"
                        }`}
                      >
                        {item.name}
                      </p>
                    </div>
                  ))}
              </div>
              {ownerShipError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select Ownership
                </p>
              )}
            </div>
          )}
        {/* facilities */}
        {(propertySubType === "Apartment" ||
          propertySubType === "Independent House" ||
          propertySubType === "Independent Villa" ||
          propertySubType === "Flat" ||
          propertySubType === "Office" ||
          propertySubType === "Retail Shop" ||
          propertySubType === "Show Room") && (
          <div>
            <p className="text-[#1D3A76] text-[13px] mb-3 mt-6 font-sans font-medium">
              Facilities
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 text-[13px] font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {Object.keys(facilities).map((facility) => (
                <li
                  key={facility}
                  className="w-full border-b border-gray-200 sm:border-b-0 border-r"
                >
                  <div className="flex items-center ps-3">
                    <input
                      id={facility}
                      type="checkbox"
                      checked={facilities[facility]}
                      onChange={updateFacilties}
                      className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={facility}
                      className="w-full py-3 ms-2 text-[13px] font-medium text-gray-900"
                    >
                      {facility.charAt(0).toUpperCase() + facility.slice(1)}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {getpropertyDetails?.property_in === "Commercial" && (
          <>
            {propertySubType === "Warehouse" ||
            propertySubType === "Plot" ||
            propertySubType === "Others" ? (
              <div className="mb-5 mt-3">
                <div className="flex gap-1 mb-4">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Plot No.
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <div className="border border-[#909090] rounded-md w-[20%] px-3">
                  <Textinput
                    type="number"
                    placeholder="Plot No"
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={plotNumber}
                    onChange={updatePlotNumber}
                  />
                </div>
                {plotNumberError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please Enter Plot Number
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-5">
                <div className="flex gap-1 mt-4 mb-2">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Flat No.
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <div className="border border-[#909090] rounded-md w-full sm:w-[40%] px-3">
                  <Textinput
                    type="number"
                    placeholder="Flat Number"
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={flatNumber}
                    onChange={updateFlatNumber}
                  />
                </div>
                {flatNumberError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please Enter Flat Number
                  </p>
                )}
              </div>
            )}
            {propertySubType === "Retail Shop" ||
            propertySubType === "Show Room" ||
            propertySubType === "Plot" ||
            propertySubType === "Others" ? (
              <div className="mb-5 w-full sm:w-[40%]">
                <Select
                  label="Suitable"
                  labelClassName="!text-[#1D3A76] text-[13px] font-medium font-sans"
                  data={businesstypesList}
                  searchable
                  withAsterisk
                  value={suitableFor}
                  onChange={updateSuitableFor}
                  inputClassName="focus:ring-blue-500 focus:border-blue-500"
                  className="!m-0 !p-0"
                />
                {suitableForError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please select one
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-5 w-full sm:w-[40%]">
                <Select
                  label="Zone Type"
                  labelClassName="!text-[#1D3A76] text-[13px] font-medium font-sans"
                  data={zoneList}
                  searchable
                  withAsterisk
                  value={zoneType}
                  onChange={updateZoneType}
                  inputClassName="focus:ring-blue-500 focus:border-blue-500"
                  className="!m-0 !p-0 "
                />
                {zoneTypeError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please select one
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {getpropertyDetails?.property_for === "Sell" &&
          (propertySubType === "Apartment" ||
            propertySubType === "Independent Villa" ||
            propertySubType === "Plot") && (
            <>
              <div className="my-4">
                <div className="flex gap-1 mb-2">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Investor Property
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                  <div
                    onClick={() => updateInvestorProperty("Yes")}
                    className={`group cursor-pointer px-8 py-2 rounded-md  ${
                      investorProperty === "Yes"
                        ? "border border-[#1D3A76] bg-[#1D3A76]"
                        : "border border-[#909090]  hover:bg-[#1D3A76]"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-sans ${
                        investorProperty === "Yes"
                          ? "text-white"
                          : "text-[#1D3A76] font-semibold group-hover:text-white"
                      }`}
                    >
                      Yes
                    </p>
                  </div>
                  <div
                    onClick={() => updateInvestorProperty("No")}
                    className={`group cursor-pointer px-8 py-2 rounded-md  ${
                      investorProperty === "No"
                        ? "border border-[#1D3A76] bg-[#1D3A76]"
                        : "border border-[#909090]  hover:bg-[#1D3A76]"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-sans ${
                        investorProperty === "No"
                          ? "text-white"
                          : "text-[#1D3A76] font-semibold group-hover:text-white"
                      }`}
                    >
                      No
                    </p>
                  </div>
                </div>
              </div>
              {investorPropertyError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please select investor Property
                </p>
              )}
            </>
          )}
        {getpropertyDetails?.property_for !== "Rent" && (
          <>
            <div className="my-4">
              <div className="flex gap-1 mb-2">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Loan Facility
                </p>
                <IconAsterisk size={8} color="#FF0000" />
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateLoanFacility("Yes")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    loanFacility === "Yes"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      loanFacility === "Yes"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    Yes
                  </p>
                </div>
                <div
                  onClick={() => updateLoanFacility("No")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    loanFacility === "No"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      loanFacility === "No"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    No
                  </p>
                </div>
              </div>
            </div>
            {loanFacilityError && (
              <p className="text-[#FF0000] text-xs font-sans">
                Please select loan facility
              </p>
            )}
          </>
        )}

        <div className="mt-3">
          <p className="text-[#1D3A76] text-md mb-3 font-medium font-sans">
            Add Additional Details
          </p>
          <p className="text-[#1D3A76] text-[13px] font-sans font-medium mb-2">
            Facing
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {facingList.length > 0 &&
              facingList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => updateFacing(item.value)}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    facing === item.value
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      facing === item.value
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
          </div>
          {facingError && (
            <p className="text-[#FF0000] text-xs font-sans">
              Please select facing
            </p>
          )}
        </div>
        {!(propertySubType === "Plot" || propertySubType === "Land") && (
          <>
            <div className="my-4">
              <div className="flex gap-1 mb-2">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Car Parking
                </p>
                {/* <IconAsterisk size={8} color='#FF0000' /> */}
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateCarParking("0")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    carParking === "0"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      carParking === "0"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    0
                  </p>
                </div>
                <div
                  onClick={() => updateCarParking("1")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    carParking === "1"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      carParking === "1"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    1{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateCarParking("2")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    carParking === "2"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      carParking === "2"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    2{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateCarParking("3")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    carParking === "3"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      carParking === "3"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    3{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateCarParking("4plus")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    carParking === "4plus"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      carParking === "4plus"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    4+{" "}
                  </p>
                </div>
              </div>
              {carParking === "4plus" && (
                <div className="my-5">
                  <div className="flex gap-1">
                    <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                      Custom Car Parking
                    </p>
                    <IconAsterisk size={8} color="#FF0000" />
                  </div>
                  <Textinput
                    type="number"
                    placeholder="Enter Custom Car Parking"
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={customCarParking}
                    onChange={updateCustomCarParking}
                    error={customCarParkingError}
                  />
                </div>
              )}
              {/* {carParkingError && <p className='text-[#FF0000] text-xs font-sans'>Please select car parking</p>} */}
            </div>
            <div className="">
              <div className="flex gap-1 mb-2">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Bike Parking
                </p>
                {/* <IconAsterisk size={8} color='#FF0000' /> */}
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateBikeParking("0")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bikeParking === "0"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bikeParking === "0"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    0
                  </p>
                </div>
                <div
                  onClick={() => updateBikeParking("1")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bikeParking === "1"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bikeParking === "1"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    1{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateBikeParking("2")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bikeParking === "2"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bikeParking === "2"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    2{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateBikeParking("3")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bikeParking === "3"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bikeParking === "3"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    3{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateBikeParking("4plus")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    bikeParking === "4plus"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      bikeParking === "4plus"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    4+{" "}
                  </p>
                </div>
              </div>
              {bikeParking === "4plus" && (
                <div className="my-5">
                  <div className="flex gap-1">
                    <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                      Custom Bike Parking
                    </p>
                    {/* <IconAsterisk size={8} color='#FF0000' /> */}
                  </div>
                  <Textinput
                    type="number"
                    placeholder="Enter Custom Bike Parking"
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={customBikeParking}
                    onChange={updateCustomBikeParking}
                  />
                  {/* {customBikeParkingError && <p className='text-[#FF0000] text-xs font-sans'>Please enter custom bike parking</p>} */}
                </div>
              )}
              {/* {bikeParkingError && <p className='text-[#FF0000] text-xs font-sans'>Please select bike parking</p>} */}
            </div>
            <div className="my-3">
              <div className="flex gap-1 mb-2">
                <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                  Open Parking
                </p>
                {/* <IconAsterisk size={8} color='#FF0000' /> */}
              </div>
              <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                <div
                  onClick={() => updateOpenParking("0")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    openParking === "0"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      openParking === "0"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    0
                  </p>
                </div>
                <div
                  onClick={() => updateOpenParking("1")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    openParking === "1"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      openParking === "1"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    1{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateOpenParking("2")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    openParking === "2"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      openParking === "2"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    2{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateOpenParking("3")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    openParking === "3"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      openParking === "3"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    3{" "}
                  </p>
                </div>
                <div
                  onClick={() => updateOpenParking("4plus")}
                  className={`group cursor-pointer px-8 py-2 rounded-md  ${
                    openParking === "4plus"
                      ? "border border-[#1D3A76] bg-[#1D3A76]"
                      : "border border-[#909090]  hover:bg-[#1D3A76]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-sans ${
                      openParking === "4plus"
                        ? "text-white"
                        : "text-[#1D3A76] font-semibold group-hover:text-white"
                    }`}
                  >
                    4+{" "}
                  </p>
                </div>
              </div>
              {openParking === "4plus" && (
                <div className="my-5">
                  <div className="flex gap-1">
                    <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                      Custom Open Parking
                    </p>
                    <IconAsterisk size={8} color="#FF0000" />
                  </div>
                  <Textinput
                    placeholder=" Enter Custom Open Parking"
                    inputClassName="text-sm border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                    value={customOpenParking}
                    onChange={updateCustomOpenParking}
                  />
                  {/* {customOpenParkingError && <p className='text-[#FF0000] text-xs font-sans'>Please enter custom open parking</p>} */}
                </div>
              )}
              {/* {openParkingError && <p className='text-[#FF0000] text-xs font-sans'>Please select open parking</p>} */}
            </div>
          </>
        )}
        <div className="my-6">
          <div className="flex gap-1">
            <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
              Around This Property
            </p>
            <IconAsterisk size={8} color="#FF0000" />
          </div>
          <div className="flex flex-row items-center gap-2 my-2">
            <div className="basis-[40%]">
              <Textinput
                placeholder="Place around Property"
                inputClassName="text-xs border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                value={placearoundProperty}
                onChange={updatePlacearoundProperty}
              />
              {placearoundPropertyError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  {placearoundPropertyError}
                </p>
              )}
            </div>
            <div className="basis-[40%]">
              <Textinput
                type="number"
                placeholder="Distance from property"
                inputClassName="text-xs border-0 border-b border-[#D9D9D9] rounded-none focus:outline-none focus:ring-0 focus:border-b-[#D9D9D9]"
                value={distancefromProperty}
                onChange={updateDistancefromProperty}
              />
              {distancefromProperty && (
                <DistanceToWords value={distancefromProperty} />
              )}
              {distancefromPropertyError && (
                <p className="text-[#FF0000] text-xs font-sans">
                  Please enter distance from property
                </p>
              )}
            </div>
            <div
              onClick={handleAddaroundProperty}
              className="flex items-center justify-center basis-[8%] h-8 bg-[#1D3A76] rounded-md cursor-pointer"
            >
              <IconPlus size={12} color="#fff" />
              <p className="text-white text-[10px] font-sans">Add</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {totalPlacesaroundProperty.map((item, index) => (
              <div
                key={index}
                className="bg-[#eaeaea] rounded-md p-[10px] gap-2"
              >
                <div className="flex flex-row items-center justify-between gap-2">
                  <p className="text-[12px] text-[#000] font-semibold">
                    {item.place}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <div className="text-[#ffffff] text-center text-[10px]  bg-[#1F3C88] font-[600] px-3 py-[4px] rounded-md ml-auto">
                      <DistanceToWords value={item.distance} />
                    </div>
                    <div
                      onClick={() => removeAroundproperty(index, item.placeid)}
                      className="flex items-center justify-center h-6 w-6 rounded-full bg-[#FF0000] cursor-pointer"
                    >
                      <IconTrash size={12} color="#fff" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {getpropertyDetails?.property_in === "Commercial"
          ? (propertySubType === "Office" ||
              propertySubType === "Show Room" ||
              !(
                propertySubType === "Retail Shop" ||
                propertySubType === "Warehouse" ||
                propertySubType === "Plot"
              )) && (
              <div className="my-5">
                <div className="flex gap-1 mb-4">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Pantry Room?
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                  <div
                    onClick={() => updatePantryRoom("Yes")}
                    className={`group cursor-pointer px-8 py-2 rounded-md  ${
                      pantryRoom === "Yes"
                        ? "border border-[#1D3A76] bg-[#1D3A76]"
                        : "border border-[#909090]  hover:bg-[#1D3A76]"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-sans ${
                        pantryRoom === "Yes"
                          ? "text-white"
                          : "text-[#1D3A76] font-semibold group-hover:text-white"
                      }`}
                    >
                      Yes
                    </p>
                  </div>
                  <div
                    onClick={() => updatePantryRoom("No")}
                    className={`group cursor-pointer px-8 py-2 rounded-md  ${
                      pantryRoom === "No"
                        ? "border border-[#1D3A76] bg-[#1D3A76]"
                        : "border border-[#909090]  hover:bg-[#1D3A76]"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-sans ${
                        pantryRoom === "No"
                          ? "text-white"
                          : "text-[#1D3A76] font-semibold group-hover:text-white"
                      }`}
                    >
                      No
                    </p>
                  </div>
                </div>
                {pantryRoomError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please select pantry room
                  </p>
                )}
              </div>
            )
          : !(propertySubType === "Plot" || propertySubType === "Land") && (
              <div className="my-5">
                <div className="flex gap-1 mb-4">
                  <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
                    Servant Room?
                  </p>
                  <IconAsterisk size={8} color="#FF0000" />
                </div>
                <div className="flex flex-row items-center gap-2 sm:gap-6 flex-wrap">
                  <div
                    onClick={() => updateServantRoom("Yes")}
                    className={`group cursor-pointer px-8 py-2 rounded-md  ${
                      servantRoom === "Yes"
                        ? "border border-[#1D3A76] bg-[#1D3A76]"
                        : "border border-[#909090]  hover:bg-[#1D3A76]"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-sans ${
                        servantRoom === "Yes"
                          ? "text-white"
                          : "text-[#1D3A76] font-semibold group-hover:text-white"
                      }`}
                    >
                      Yes
                    </p>
                  </div>
                  <div
                    onClick={() => updateServantRoom("No")}
                    className={`group cursor-pointer px-8 py-2 rounded-md  ${
                      servantRoom === "No"
                        ? "border border-[#1D3A76] bg-[#1D3A76]"
                        : "border border-[#909090]  hover:bg-[#1D3A76]"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-sans ${
                        servantRoom === "No"
                          ? "text-white"
                          : "text-[#1D3A76] font-semibold group-hover:text-white"
                      }`}
                    >
                      No
                    </p>
                  </div>
                </div>
                {servantRoomError && (
                  <p className="text-[#FF0000] text-xs font-sans">
                    Please select servant room
                  </p>
                )}
              </div>
            )}
        <div className="mt-6">
          <div className="flex gap-1">
            <p className="text-[#1D3A76] text-[13px] font-medium font-sans">
              Property Description
            </p>
            <IconAsterisk size={8} color="#FF0000" />
          </div>
          <input
            type="text"
            placeholder="Property Description"
            className="border-b border-[#c3c3c3] w-full py-1 text-[12px] focus:outline-none font-sans"
            autoComplete="off"
            value={propertyDescription}
            onChange={updatePropertyDescription}
          />
          {propertyDescriptionError && (
            <p className="text-[#FF0000] text-xs font-sans">
              Please enter Property description
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-end items-center px-6 py-3">
        <div
          onClick={handleSubmitPropertyDetails}
          className="border border-[#1D3A76] bg-[#1D3A76] px-8 py-2 rounded-md cursor-pointer"
        >
          <p className="text-white text-[10px] font-bold">
            Next: Add Address Details
          </p>
        </div>
      </div>
      <LoadingOverlay isLoading={isLoadingEffect} />
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
      {furnishingModal && (
        <Modal
          open={furnishingModal}
          onClose={closeFurnishingModal}
          size="lg"
          zIndex={9999}
          withCloseButton={false}
        >
          <Addfurnishingswrapper closeFurnishingModal={closeFurnishingModal} />
        </Modal>
      )}
    </div>
  );
}

export default Addpropertydetails;
