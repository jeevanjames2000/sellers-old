import GoogleMapView from '@/components/shared/GoogleMapView'
import React from 'react'

function Propertymapview({ propertyDetails }) {
    return (
        <div>
            <p className="text-[#1d3a76] text-[25px] font-[600] mb-3">EXPLORE - MAP view</p>
            <GoogleMapView
                propertiesData={propertyDetails}
            />
        </div>
    )
}

export default Propertymapview