'use client';
import Image from "next/image";
import React, { useState } from "react";

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full space-y-1">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="border-b border-[#C2C2C2] shadow-sm"
                >
                    <div
                        className="flex items-center justify-between px-4 py-2 cursor-pointer"
                        onClick={() => handleToggle(index)}
                    >
                        <div className="flex items-center gap-2">
                            <Image src={item.icon} alt="icon" width={20} height={20} />
                            <span className="font-semibold text-[#00609E] font-Montserrat text-[10px] xs:text-[12px] 2xl:text-[16px] 3xl:text-[18px] 4xl:text-[20px]">{item.name}</span>
                        </div>
                        <div className="flex flex-row items-center justify-center bg-black rounded-full p-1">
                            <svg
                                className={`w-3 h-3 transition-transform transform ${activeIndex === index ? "rotate-180" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#fff"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-screen" : "max-h-0"
                            }`}
                    >
                        <div className="px-4 py-2 text-gray-600">{item.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
