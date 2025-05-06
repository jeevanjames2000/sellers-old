
import dynamic from 'next/dynamic'
import React from 'react'
const Forgotpassword = dynamic(() => import('@/components/forgotpassword/Forgotpassword'))

function page() {
    return (
        <>
            <Forgotpassword />
        </>
    )
}

export default page