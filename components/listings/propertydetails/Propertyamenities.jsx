'use client'
import { IconHeart, IconShare } from '@tabler/icons-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import amenitiesaskdetailslike from '@/public/assets/amenities-askdetails-like.png';
import cricket_pitch from '@/public/assets/cricket_pitch.svg';
import swimming_pool from '@/public/assets/swimming_pool.svg';
import gym from '@/public/assets/gym.svg';
import club_house from '@/public/assets/club_house.svg';
import cctv from '@/public/assets/cctv.svg';
import lift from '@/public/assets/lift.svg';
import security from '@/public/assets/security.svg';
import pet_allowed from '@/public/assets/pet_allowed.svg';
import children_play_area from '@/public/assets/children_play_area.svg';
import intercom from '@/public/assets/intercom.png';
import power_backup from '@/public/assets/power_backup.png';
import gated_community from '@/public/assets/gated_community.png';
import entry from '@/public/assets/entry.png';
import regular_water from '@/public/assets/regular_water.png';
import community_hall from '@/public/assets/community_hall.png';
import outdoor_fitness_station from '@/public/assets/outdoor_fitness_station.png';
import basketballcourt from '@/public/assets/basketball-court.png';
import gazebo from '@/public/assets/gazebo.png';
import badminton_court from '@/public/assets/badminton_court.png';
import greenery from '@/public/assets/greenery.png';
import water_harvesting from '@/public/assets/water_harvesting.png';
import water_softner from '@/public/assets/water_softner.png';
import solar_fencing from '@/public/assets/solar_fencing.png';
import lawn from '@/public/assets/lawn.png';
import fire_sprinklers from '@/public/assets/fire_sprinklers.svg';
import fire_fighting_system from '@/public/assets/fire_fighting_system.svg';
import footpaths from '@/public/assets/footpaths.svg';
import community_buildings from '@/public/assets/community_buildings.svg';
import internal_roads from '@/public/assets/internal_roads.svg';
import water_conservation from '@/public/assets/water_conservation.svg';
import business_center from '@/public/assets/business_center.svg';
import multipurpose_hall from '@/public/assets/multipurpose_hall.svg';
import library from '@/public/assets/library.svg';
import indoor_games from '@/public/assets/indoor_games.svg';
import cycling_jogging_track from '@/public/assets/cycling_jogging_track.svg';
import yoga_meditation from '@/public/assets/yoga_meditation.svg';
import street_light from '@/public/assets/street_light.svg';
import meter_room from '@/public/assets/meter_room.svg';
import recreation_facilities from '@/public/assets/recreation_facilities.svg';
import cafeteria from '@/public/assets/cafeteria.svg';

function Propertyamenities({ propertyDetails }) {

    const [facilities, setFacilities] = useState({
        'Lift': false,
        'CCTV': false,
        'Gym': false,
        'Garden': false,
        'Club House': false,
        'Sports': false,
        'Swimming Pool': false,
        'Intercom': false,
        'Power Backup': false,
        'Gated Community': false,
        'Entry / Exit': false,
        'Regular Water': false,
        'Community Hall': false,
        'Pet Allowed': false,
        'Outdoor Fitness Station': false,
        'Half BasketBall Court': false,
        'Gazebo': false,
        'Badminton Court': false,
        'Children Play Area': false,
        'Ample Greenery': false,
        'Water Harvesting Pit': false,
        'water Softner': false,
        'Solar Fencing': false,
        'Security Cabin': false,
        'Lawn': false,
        'Transformer Yard': false,
        'Amphitheatre': false,
        'Lawn with Stepping Stones': false,
        'None': false,
    });

    useEffect(() => {
        const facilitiesString = propertyDetails?.facilities || "";
        const selectedFacilities = facilitiesString.split(", ").map((item) => item.trim());
        setFacilities((prevState) => {
            const updatedFacilities = { ...prevState };
            selectedFacilities.forEach((facility) => {
                if (updatedFacilities.hasOwnProperty(facility)) {
                    updatedFacilities[facility] = true;
                }
            });
            return updatedFacilities;
        });
    }, [propertyDetails]);

    const facilityImages = {
        'Lift': lift,
        'CCTV': cctv,
        'Gym': gym,
        'Garden': cricket_pitch,
        'Club House': club_house,
        'Sports': children_play_area,
        'Swimming Pool': swimming_pool,
        'Intercom': intercom,
        'Power Backup': power_backup,
        'Gated Community': gated_community,
        'Entry / Exit': entry,
        'Regular Water': regular_water,
        'Community Hall': community_hall,
        'Pet Allowed': pet_allowed,
        'Outdoor Fitness Station': outdoor_fitness_station,
        'Half BasketBall Court': basketballcourt,
        'Gazebo': gazebo,
        'Badminton Court': badminton_court,
        'Children Play Area': children_play_area,
        'Ample Greenery': greenery,
        'Water Harvesting Pit': water_harvesting,
        'water Softner': water_softner,
        'Solar Fencing': solar_fencing,
        'Security Cabin': security,
        'Lawn': lawn,
    };

    return (
        <>
            {
                !(Object.values(facilities).every(value => !value)) &&
                <div className="propertyprice space-y-6">
                    <p className="text-[#1d3a76] text-[22px] xs:text-[25px] 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px] font-[600]">{propertyDetails?.property_name?.toUpperCase()} Amenities</p>
                    <div className="custom-shadow bg-[#F3F3F3] p-6 space-y-2">
                        {/* <div className="flex items-center justify-end gap-[14px]">
                            <IconHeart stroke={2} color="#E28B6D" className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:w-8 4xl:h-8" />
                            <IconShare stroke={2} color="#1d3a76" className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:w-8 4xl:h-8" />
                            <button
                                className="bg-[#079E9E] text-[#ffffff] text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-[600] py-1 px-3 rounded-[5px]"
                            >
                                Ask for Details
                            </button>
                        </div> */}
                        {/* <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-2">
                        {
                            Object.keys(facilities).map((facility, index) => {
                                if (facilities[facility]) {
                                    return (
                                        <div key={index} className="flex gap-2 items-center justify-start py-4">
                                            <Image
                                                src={facilityImages[facility] || lift}
                                                alt={facility}
                                                className="h-6 2xl:h-7 3xl:h-8 4xl:h-9 w-fit object-cover border-[1.9px] border-[#492828] rounded-lg p-[6px]"
                                            />
                                            <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#6E6E6E] font-[500] font-Montserrat">{facility}</p>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                    </div> */}
                        <div>
                            {Object.values(facilities).every(value => !value) ? (
                                <p className="text-center text-gray-500 font-semibold">No Amenities</p>
                            ) : (
                                <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-2">
                                    {Object.keys(facilities).map((facility, index) => {
                                        if (facilities[facility]) {
                                            return (
                                                <div key={index} className="flex gap-2 items-center justify-start py-4">
                                                    <Image
                                                        src={facilityImages[facility] || lift}
                                                        alt={facility}
                                                        className="h-6 2xl:h-7 3xl:h-8 4xl:h-9 w-fit object-cover border-[1.9px] border-[#492828] rounded-lg p-[6px]"
                                                    />
                                                    <p className="text-[12px] xs:text-[14px] 2xl:text-[18px] 3xl:text-[20px] 4xl:text-[22px] text-[#6E6E6E] font-[500] font-Montserrat">{facility}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Propertyamenities;
