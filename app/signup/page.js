import Header from '@/components/header/Header'
import React from 'react'
import signup_bg from '@/public/assets/approperties-bg.png'
import signup_list from '@/public/assets/signup_list.svg'
import person_with_laptop from '@/public/assets/person_with_laptop.png'
import Image from 'next/image'
import Signupform from '@/components/signup/Signupform'
import Userapi from '@/components/api/Userapi'
import Generalapi from '@/components/api/Generalapi'
import Authpagecontent from '@/components/shared/Authpagecontent'

async function page() {
  const getusertypesfetch = await getUsertypesfetch();

  //check error getusertypesfetch
  if (getusertypesfetch.status === 'error') {
    return (
      <div>
        <p>Error fetching order types</p>
      </div>
    )
  }

  const usertypedata = getusertypesfetch.usertypedata;

  const filteredusertypedata = usertypedata.filter(
    (type) => type.label !== "admin" && type.label !== "user"
  );

  const getcities = await getCities();
  if (getcities.status === 'error') {
    return (
      <div>
        <p>Error fetching cities</p>
      </div>
    )
  }
  const cities = getcities.cities;

  return (
    <div className='loginpage h-[100vh]' style={{
      backgroundImage: `url(${signup_bg.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Header />
      <div className="overflow-hidden flex  justify-center items-center h-[calc(100vh-65px)] 3xl:h-[calc(100vh-120px)]">
        <div className=" grid grid-cols-12 w-full gap-[5%] md:px-10 xl:px-32 lg:px-32 3xl:px-60 items-center justify-between">
          {/* Left Column */}
          <Authpagecontent />
          <Signupform
            usertypedata={filteredusertypedata}
            cities={cities}
          />
        </div>
      </div>
    </div>
  )
}

export default page

async function getUsertypesfetch() {
  try {
    const response = await Userapi.get('/usertypes');
    const data = response.data;
    if (data.status === 'error') {
      let data = {
        status: 'error',
        message: 'Error fetching user types',
        usertypedata: [],
      }
      return data;
    }
    let finaldata = {
      status: 'success',
      message: 'user types fetched successfully',
      usertypedata: data.usertypes,
    }
    return finaldata;
  } catch (error) {
    console.error('Error fetching user types:', error);
    let finaldata = {
      status: 'error',
      message: 'Error fetching user types',
      usertypedata: [],
    }
    return finaldata;
  }
}

async function getCities() {
  try {
    const response = await Generalapi.get('/getcities');
    const data = response.data;
    if (data.status === 'error') {
      let data = {
        status: 'error',
        message: 'Error fetching cities',
        cities: [],
      }
      return data;
    }
    let finaldata = {
      status: 'success',
      message: 'cities fetched successfully',
      cities: data.cities,
    }
    return finaldata;
  } catch (error) {
    console.error('Error fetching cities:', error);
    let finaldata = {
      status: 'error',
      message: 'Error fetching cities',
      cities: [],
    }
    return finaldata;
  }
}