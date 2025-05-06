import React from 'react'
const Listingswrapper = dynamic(() => import('@/components/listings/Listingswrapper'))
import dynamic from 'next/dynamic'
import Propertyapi from '@/components/api/Propertyapi'

async function page() {
    const getOccupancyData = await getOccupancy();
    if (getOccupancyData.status === 'error') {
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
    const occupancyList = getOccupancyData.occupancyList;

    return (
        <Listingswrapper
            occupancyList={occupancyList}
        />
    )
}

export default page


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
