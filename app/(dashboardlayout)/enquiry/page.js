import dynamic from 'next/dynamic'
import React from 'react'
const Enquirieswrapper = dynamic(() => import('@/components/enquires/Enquirieswrapper'))
function page() {
  return (
    <Enquirieswrapper />
  )
}

export default page