'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import user_profile from '@/public/assets/user_profile.png'
import dynamic from 'next/dynamic'
import { useUserDetails } from '../zustand/useUserDetails'
import { useRouter } from 'next/navigation'

const Checkoutpropertywrapper = dynamic(() => import('./Checkoutpropertywrapper'))
const Findplanner = dynamic(() => import('./Findplanner'))
const Housepackage = dynamic(() => import('./Housepackage'))
const Ownersreview = dynamic(() => import('./Ownersreview'))
const Queries = dynamic(() => import('./Queries'))
const Dashboardsidebarsection = dynamic(() => import('./Dasboradsidebar/Dashboardsidebarsection'))

function Dashboardwrapper() {
    const userInfo = useUserDetails((state) => state.userInfo);
    return (
        <div className="grid grid-cols-12 md:gap-10 mt-5 md:mt-16 w-full px-4 md:px-[4vw] lg:px-[6vw]">
            {/* First Child: Spanning 8 Columns */}
            <div className="col-span-12 lg:col-span-8 space-y-10 mb-12">
                <div className="bg-[#31539A] px-8 py-3 rounded-md flex flex-row items-center gap-10">
                    <div>
                        <Image src={user_profile} alt="logo" width={48} height={48} />
                    </div>
                    <p className="text-white text-[16px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text[22px] font-[600] font-sans tracking-extra-wide">Hello, {userInfo?.name}!</p>
                </div>
                <Checkoutpropertywrapper />
                <Findplanner />
                {/* <Housepackage /> */}
                {/* <Ownersreview /> */}
                <Queries />
            </div>

            {/* Second Child: Spanning 4 Columns */}
            <div className="col-span-12 lg:col-span-4 space-y-8 pb-5">
                <Dashboardsidebarsection />
            </div>
        </div>

    )
}

export default Dashboardwrapper