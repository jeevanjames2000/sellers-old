// 'use client';
// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import axios from 'axios';

// const GoogleMapView = ({ propertiesData }) => {
//     const [location, setLocation] = useState(null);
//     const [mapCenter, setMapCenter] = useState(null);

//     const fetchCoordinates = async () => {
//         try {
//             const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
//                 params: {
//                     address: propertiesData?.google_address,
//                     key: 'AIzaSyBmei9lRUUfJI-kLIPNBoc2SxEkwhKHyvU',
//                 },
//             });

//             if (response.data.results.length > 0) {
//                 const { lat, lng } = response.data.results[0].geometry.location;
//                 setLocation({ lat, lng });
//                 setMapCenter({ lat, lng });
//             } else {
//                 console.log('Unable to fetch location.');
//             }
//         } catch (error) {
//             console.error('Error fetching location. Check your API key or address.', error);
//         }
//     };

//     const handleViewInMaps = () => {
//         if (location) {
//             const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
//             window.open(url, '_blank');
//         }
//     };

//     useEffect(() => {
//         if (propertiesData?.google_address) {
//             fetchCoordinates();
//         }
//     }, [propertiesData]);

//     return (
//         <div className="p-4 bg-white">
//             {mapCenter ? (
//                 <LoadScript googleMapsApiKey="AIzaSyBmei9lRUUfJI-kLIPNBoc2SxEkwhKHyvU">
//                     <GoogleMap
//                         mapContainerClassName="w-full h-64 rounded-md"
//                         center={mapCenter}
//                         zoom={14}
//                     >
//                         <Marker position={location} />
//                     </GoogleMap>
//                 </LoadScript>
//             ) : (
//                 <p className="text-center text-gray-500">Loading map...</p>
//             )}
//             <button
//                 onClick={handleViewInMaps}
//                 className="mt-4 w-full bg-[#1d3a76] text-white py-3 rounded-md text-[14px] xs:text-[16px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px]"
//             >
//                 View in Maps
//             </button>
//         </div>
//     );
// };

// export default GoogleMapView;

'use client';
import React, { useEffect, useRef, useState } from 'react';

const GoogleMapView = ({ propertiesData }) => {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);

    const initializeMap = (lat, lng) => {
        if (mapRef.current && window.google) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat, lng },
                zoom: 14,
            });

            new window.google.maps.Marker({
                position: { lat, lng },
                map,
            });
        } else {
            console.error('Google Maps is not loaded.');
        }
    };

    const geocodeAddress = (address) => {
        if (!window.google || !window.google.maps) {
            console.error('Google Maps library not loaded.');
            return;
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const { lat, lng } = results[0].geometry.location.toJSON();
                setLocation({ lat, lng });
                initializeMap(lat, lng);
            } else {
                console.error('Geocode was not successful: ' + status);
            }
        });
    };

    useEffect(() => {
        if (propertiesData?.google_address) {
            geocodeAddress(propertiesData.google_address);
        }
    }, [propertiesData]);

    const handleViewInMaps = () => {
        if (location) {
            const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
            window.open(url, '_blank');
        }
    };

    return (
        <div className="p-4 bg-white">
            <div
                ref={mapRef}
                className="w-full h-64 rounded-md"
                style={{ minHeight: '256px', width: '100%' }}
            ></div>
            <button
                onClick={handleViewInMaps}
                className="mt-4 w-full bg-[#1d3a76] text-white py-3 rounded-md text-[14px] xs:text-[16px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px]"
            >
                View in Maps
            </button>
        </div>
    );
};

export default GoogleMapView;

