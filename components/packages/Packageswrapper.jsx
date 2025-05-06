import React from 'react'
import dynamic from 'next/dynamic'
const Packagestabswrapper = dynamic(() => import('./Packagestabswrapper'))
const Enrollpackages = dynamic(() => import('./parts/Enrollpackages'))
const Recommendedplan = dynamic(() => import('./parts/Recommendedplan'))
const Benefits = dynamic(() => import('./parts/Benefits'))
const Operates = dynamic(() => import('./parts/Operates'))

function Packageswrapper() {
    return (
        <div className="px-4 md:px-[4vw] lg:px-[6vw] w-full space-y-12 mb-12 mt-16">
            <div className='bg-[#E2EAED] mx-auto rounded-[10px]'>
                <p className=' text-[26px] text-[#1D3A76] text-center font-[700] py-3 w-full'>
                    SELECT THE RIGHT PACKAGE
                </p>
                <Packagestabswrapper />
            </div>
            <Enrollpackages />
            <Recommendedplan />
            <Benefits />
            <Operates />
        </div>
    )
}

export default Packageswrapper