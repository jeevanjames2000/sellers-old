import React from 'react'
import dynamic from 'next/dynamic'
const Packageswrapper = dynamic(() => import('@/components/packages/Packageswrapper'))
function page() {
  return (
    <Packageswrapper />
  )
}

export default page