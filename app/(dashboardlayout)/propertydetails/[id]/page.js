import Propertyapi from '@/components/api/Propertyapi';
import Propertydetailswrapper from '@/components/listings/propertydetails/Propertydetailswrapper';
import React from 'react'
async function page({ params }) {
    const { id } = params;

    const getSinglePropertydetailsData = await getSinglePropertydetails(id);
    if (getSinglePropertydetailsData.status === 'error') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-100 p-4 rounded-lg shadow-md inline-block">
                        <p className="text-red-600 text-lg font-medium">
                            Error fetching property details. Please try again later.
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
    const propertyDetails = getSinglePropertydetailsData.propertyDetails;

    return (
        <>
            <div className='py-4'>
                <p className="text-[#1d3a76] text-[24px] xs:text-[30px] 2xl:text-[34px] 3xl:text-[36px] 4xl:text-[38px] font-bold tracking-small-wide text-center">
                    {propertyDetails?.property_name?.toUpperCase()} PROPERTY DETAILS
                </p>
            </div>
            <Propertydetailswrapper
                id={id}
                propertyDetails={propertyDetails}
            />
        </>
    )
}

export default page

async function getSinglePropertydetails(id) {
    try {
        const response = await Propertyapi.get(`/getsinglepropertydetails`, {
            params: {
                unique_property_id: id
            }
        });
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching property details',
                propertyDetails: {},
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'property details fetched successfully',
            propertyDetails: data.property,
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching property details:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching property details',
            propertyDetails: {},
        }
        return finaldata;
    }
}