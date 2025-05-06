import Header from '@/components/header/Header'
import Authuserverify from '@/components/shared/Authuserverify'
import React from 'react'

export default function DashboardLayout({ children }) {
    return (
        <>
            <Authuserverify>
                <Header />
                {children}
            </Authuserverify>
        </>
    )
}       
