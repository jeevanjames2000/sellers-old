import React from 'react';
import Propertyapi from '@/components/api/Propertyapi';
import dynamic from 'next/dynamic';

const Tabswrapper = dynamic(() => import('@/components/addproperty/tabs/Tabswrapper'));

async function Page() {
    const getPropertyInData = await getPropertyIn();
    if (getPropertyInData.status === 'error') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-100 p-4 rounded-lg shadow-md inline-block">
                        <p className="text-red-600 text-lg font-medium">
                            Error fetching property types. Please try again later.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }
    const propertyInList = getPropertyInData.propertyInList;

    const getPropertyForData = await getPropertyFor();
    if (getPropertyForData.status === 'error') {
        return (
            <div>
                <p>Error fetching propertyFor types</p>
            </div>
        );
    }
    const propertyForList = getPropertyForData.propertyForList;

    const getTransactionTypeData = await getTransactionType();
    if (getTransactionTypeData.status === 'error') {
        return (
            <div>
                <p>Error fetching transaction types</p>
            </div>
        );
    }
    const transactionTypeList = getTransactionTypeData.transactionTypeList;

    const getPreferedTenantTypesData = await getPreferedTenantTypes();
    if (getPreferedTenantTypesData.status === 'error') {
        return (
            <div>
                <p>Error fetching prefered tenant types</p>
            </div>
        );
    }
    const preferedTenantList = getPreferedTenantTypesData.preferedTenantList;

    const getbacloniesData = await getbaclonies();
    if (getbacloniesData.status === 'error') {
        return (
            <div>
                <p>Error fetching baclonies</p>
            </div>
        );
    }
    const bacloniesList = getbacloniesData.bacloniesList;

    const getBedroomTypesData = await getBedroomTypes();
    if (getBedroomTypesData.status === 'error') {
        return (
            <div>
                <p>Error fetching bedroom types</p>
            </div>
        );
    }
    const bedroomtypesList = getBedroomTypesData.bedroomtypesList;

    const getBusinessTypesData = await getBusinessTypes();
    if (getBusinessTypesData.status === 'error') {
        return (
            <div>
                <p>Error fetching business types</p>
            </div>
        );
    }
    const businesstypesList = getBusinessTypesData.businesstypesList;

    const getFacingData = await getFacing();
    if (getFacingData.status === 'error') {
        return (
            <div>
                <p>Error fetching facing types</p>
            </div>
        );
    }
    const facingList = getFacingData.facingList;

    const getFurnishedTypesData = await getFurnishedTypes();
    if (getFurnishedTypesData.status === 'error') {
        return (
            <div>
                <p>Error fetching furnished types</p>
            </div>
        );
    }
    const furnishedtypesList = getFurnishedTypesData.furnishedtypesList;

    const getOccupancyData = await getOccupancy();
    if (getOccupancyData.status === 'error') {
        return (
            <div>
                <p>Error fetching occupancy types</p>
            </div>
        );
    }
    const occupancyList = getOccupancyData.occupancyList;

    const getOwnerShipTypeData = await getOwnerShipType();
    if (getOwnerShipTypeData.status === 'error') {
        return (
            <div>
                <p>Error fetching ownership types</p>
            </div>
        );
    }
    const ownershipList = getOwnerShipTypeData.ownershipList;

    const getZoneTypesData = await getZoneTypes();
    if (getZoneTypesData.status === 'error') {
        return (
            <div>
                <p>Error fetching zone types</p>
            </div>
        );
    }
    const zoneList = getZoneTypesData.zoneList;

    const getFacilitiesData = await getFacilities();
    if (getFacilitiesData.status === 'error') {
        return (
            <div>
                <p>Error fetching facilities</p>
            </div>
        );
    }
    const facilitiesList = getFacilitiesData.facilitiesList;

    const getAreaunitsData = await getAreaunits();
    if (getAreaunitsData.status === 'error') {
        return (
            <div>
                <p>Error fetching area units</p>
            </div>
        );
    }
    const areaunitsList = getAreaunitsData.areaunitsList;

    return (
        <div className='px-4 md:px-[4vw] lg:px-[6vw] my-5'>
            <div className='p-1 border border-[#699BA0] rounded-md'>
                <Tabswrapper
                    propertyInList={propertyInList}
                    propertyForList={propertyForList}
                    transactionTypeList={transactionTypeList}
                    preferedTenantList={preferedTenantList}
                    bacloniesList={bacloniesList}
                    bedroomtypesList={bedroomtypesList}
                    businesstypesList={businesstypesList}
                    facingList={facingList}
                    furnishedtypesList={furnishedtypesList}
                    occupancyList={occupancyList}
                    ownershipList={ownershipList}
                    zoneList={zoneList}
                    facilitiesList={facilitiesList}
                    areaunitsList={areaunitsList}
                />
            </div>
        </div>
    );
}

export default Page;

async function getPropertyIn() {
    try {
        const response = await Propertyapi.get('/getPropertyIn');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching propertyIn types',
                propertyInList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'propertyIn types fetched successfully',
            propertyInList: data.property_in,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching propertyIn types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching propertyIn types',
            propertyInList: [],
        }
        return finaldata;
    }
}

async function getPropertyFor() {
    try {
        const response = await Propertyapi.get('/getPropertyFor');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching propertyFor types',
                propertyForList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'propertyFor types fetched successfully',
            propertyForList: data.property_for,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching propertyFor types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching propertyFor types',
            propertyForList: [],
        }
        return finaldata;
    }
}

async function getTransactionType() {
    try {
        const response = await Propertyapi.get('/getTransactionType');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching transaction types',
                transactionTypeList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'transaction types fetched successfully',
            transactionTypeList: data.transaction_type,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching transaction types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching transaction types',
            transactionTypeList: [],
        }
        return finaldata;
    }
}

async function getPreferedTenantTypes() {
    try {
        const response = await Propertyapi.get('/getpreferedtenanttypes');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching prefered tenant types',
                preferedTenantList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'prefered tenant types fetched successfully',
            preferedTenantList: data.prefered_tenant_types,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching prefered tenant types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching prefered tenant types',
            preferedTenantList: [],
        }
        return finaldata;
    }
}

async function getbaclonies() {
    try {
        const response = await Propertyapi.get('/getbaclonies');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching baclonies',
                bacloniesList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'baclonies fetched successfully',
            bacloniesList: data.balconies,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching baclonies:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching baclonies',
            bacloniesList: [],
        }
        return finaldata;
    }
}

async function getBedroomTypes() {
    try {
        const response = await Propertyapi.get('/getbedroomtypes');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching bedroom types',
                bedroomtypesList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'bedroom types fetched successfully',
            bedroomtypesList: data.bedrooms,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching bedroom types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching bedroom types',
            bedroomtypesList: [],
        }
        return finaldata;
    }
}

async function getBusinessTypes() {
    try {
        const response = await Propertyapi.get('/getbusinesstypes');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching business types',
                businesstypesList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'business types fetched successfully',
            businesstypesList: data.business_types,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching business types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching business types',
            businesstypesList: [],
        }
        return finaldata;
    }
}

async function getFacing() {
    try {
        const response = await Propertyapi.get('/getfacing');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching facing types',
                facingList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'facing types fetched successfully',
            facingList: data.facing,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching facing types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching facing types',
            facingList: [],
        }
        return finaldata;
    }
}

async function getFurnishedTypes() {
    try {
        const response = await Propertyapi.get('/getFurnishedStatus');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching furnished types',
                furnishedtypesList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'furnished types fetched successfully',
            furnishedtypesList: data.furnished_status,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching furnished types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching furnished types',
            furnishedtypesList: [],
        }
        return finaldata;
    }
}

async function getOccupancy() {
    try {
        const response = await Propertyapi.get('/getOccupancy');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching occupancy types',
                occupancyList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'occupancy types fetched successfully',
            occupancyList: data.occupancy,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching occupancy types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching occupancy types',
            occupancyList: [],
        }
        return finaldata;
    }
}

async function getOwnerShipType() {
    try {
        const response = await Propertyapi.get('/getOwnerShipType');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching ownership types',
                ownershipList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'ownership types fetched successfully',
            ownershipList: data.ownership_type,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching ownership types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching ownership types',
            ownershipList: [],
        }
        return finaldata;
    }
}

async function getZoneTypes() {
    try {
        const response = await Propertyapi.get('/getZoneTypes');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching zone types',
                zoneList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'zone types fetched successfully',
            zoneList: data.zone_types,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching zone types:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching zone types',
            zoneList: [],
        }
        return finaldata;
    }
}

async function getFacilities() {
    try {
        const response = await Propertyapi.get('/getfaclities');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching facilities',
                facilitiesList: {},
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'facilities fetched successfully',
            facilitiesList: data.facilities,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching facilities:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching facilities',
            facilitiesList: {},
        }
        return finaldata;
    }
}

async function getAreaunits() {
    try {
        const response = await Propertyapi.get('/getareaunits');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching area units',
                areaunitsList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'area units fetched successfully',
            areaunitsList: data.areaunits,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching area units:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching area units',
            areaunitsList: [],
        }
        return finaldata;
    }
}