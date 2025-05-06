'use client'
import React, { useEffect, useState } from 'react';
import Enquirestabswrapper from './Enquirestabswrapper';
import Unlockpackages from './Unlockpackages';
import Getapp from './parts/Getapp';
import Agreement from './parts/Agreement';
import Uploadproperty from './parts/Uploadproperty';
import Propertyvaluecalculator from './parts/Propertyvaluecalculator';
import Verifykyc from './parts/Verifykyc';
import { usePathname, useSearchParams } from 'next/navigation';

function Enquirieswrapper() {
  const unique_property_id = useSearchParams().get('unique_property_id');
  return (
    <div className="grid grid-cols-8 px-4 md:px-[4vw] lg:px-[6vw] mt-5 md:mt-16 mb-5 sm:mb-10 md:mb-24 w-full gap-[10px]">
      <div className="col-span-12 md:col-span-6 space-y-8">
        <Enquirestabswrapper
          unique_property_id={unique_property_id}
        />
      </div>
      <div className="col-span-12 md:col-span-2 space-y-8">
        {/* <Unlockpackages /> */}
        {/* <Getapp /> */}
        <Agreement />
        <Uploadproperty />
        <Propertyvaluecalculator />
        <Verifykyc />
      </div>
    </div>
  );
}

export default Enquirieswrapper;
