import Generalapi from '@/components/api/Generalapi';
import Myprofile from '@/components/myprofile/Myprofile'
import React from 'react'

async function page() {

    const cityData = await getCities();
    if (cityData.status === 'error') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-100 p-4 rounded-lg shadow-md inline-block">
                        <p className="text-red-600 text-lg font-medium">
                            Error fetching cities. Please try again later.
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
    const cityList = cityData.cityList;

    const stateData = await getStates();
    if (stateData.status === 'error') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-100 p-4 rounded-lg shadow-md inline-block">
                        <p className="text-red-600 text-lg font-medium">
                            Error fetching states. Please try again later.
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
    const stateList = stateData.stateList;

    return (
        <>
            <Myprofile
                cityList={cityList}
                stateList = {stateList}
            />
        </>
    )
}

export default page

async function getCities() {
    try {
        const response = await Generalapi.get('/getcities');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching cities',
                cityList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'cities fetched successfully',
            cityList: data?.cities || [],
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching cities:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching cities',
            cityList: [],
        }
        return finaldata;
    }
}

async function getStates() {
    try {
        const response = await Generalapi.get('/getstates');
        const data = response.data;
        if (data.status === 'error') {
            let data = {
                status: 'error',
                message: 'Error fetching states',
                stateList: [],
            }
            return data;
        }
        let finaldata = {
            status: 'success',
            message: 'states fetched successfully',
            stateList: data?.states || [],
        }
        return finaldata;
    } catch (error) {
        console.error('Error fetching states:', error);
        let finaldata = {
            status: 'error',
            message: 'Error fetching states',
            stateList: [],
        }
        return finaldata;
    }
}


