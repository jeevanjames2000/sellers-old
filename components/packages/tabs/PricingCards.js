"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaCheck, FaTimes } from "react-icons/fa";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handlePayment = async (plan, userInfo) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert(
      "Failed to load Razorpay SDK. Please check your internet connection."
    );
    return;
  }

  const amount = Number(plan.price);

  try {
    const response = await fetch(
      "https://api.meetowner.in/payments/createOrder",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR" }),
      }
    );

    const order = await response.json();
    const options = {
      key: "rzp_live_K7CvD1nxXoGuse",
      amount: order.amount,
      currency: order.currency,
      name: "Meet Owner",
      description: `Payment for ${plan.title} Plan`,
      order_id: order.id,
      handler: async (response) => {
        const verifyResponse = await fetch(
          "https://api.meetowner.in/payments/verifyPayment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert("Payment successful!");
        } else {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: userInfo?.name || "Guest User",
        contact: userInfo?.mobile || "xxxxxxxxxx",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong! Please try again.");
  }
};
const PricingCard = ({
  title,
  duration,
  price,
  features,
  isPopular,
  onSubscribe,
}) => {
  return (
    <div
      className={`relative border border-gray-400 rounded-lg shadow-sm p-6 w-55 text-left bg-white flex flex-col ${
        isPopular ? "border-[#1D3A76]" : ""
      }`}
      style={{
        backgroundColor: isPopular ? "#1D3A76" : "white",
        minHeight: "400px",
      }}
    >
      {isPopular && (
        <span className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff] text-[#1D3A76] text-xs font-semibold px-3 py-0.5 rounded-full">
          Popular
        </span>
      )}
      <h2
        className={`text-xl font-semibold mb-2 ${
          isPopular ? "text-white" : "text-[#1D3A76]"
        }`}
      >
        {title}
      </h2>
      <p className={`mb-2 ${isPopular ? "text-gray-200" : "text-gray-600"}`}>
        {duration}
      </p>
      <p
        className={`text-2xl font-bold mb-2 ${
          isPopular ? "text-white" : "text-[#1D3A76]"
        }`}
      >
        {price} {price !== "Free" ? "/-" : ""}
      </p>

      <ul className="space-y-2 flex-1">
        {Object.entries(features).map(([feature, value]) => (
          <li
            key={feature}
            className={`text-sm flex items-center ${
              isPopular ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {value === "yes" ? (
              <FaCheck className="text-green-500 mr-2" /> // Green Check Icon
            ) : value === "No" ? (
              <FaTimes className="text-red-500 mr-2" /> // Red Cross Icon
            ) : (
              <FaCheck className="text-green-500 mr-2" /> // Default Check Icon
            )}
            <span>
              {feature} {value !== "yes" && value !== "No" ? value : ""}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full text-base font-semibold px-6 py-2 rounded-md transition-colors mt-4 self-center
    ${
      price === "Free"
        ? "bg-gray-400 text-white cursor-not-allowed"
        : isPopular
        ? "bg-white text-[#1D3A76] hover:bg-gray-200"
        : "bg-[#1D3A76] text-white hover:bg-[#162D5E]"
    }`}
        onClick={() => onSubscribe({ title, price })}
        disabled={price === "Free"}
      >
        {price === "Free" ? "Subscribed" : "Upgrade Now"}
      </button>
    </div>
  );
};
const PricingCards = ({ plans, isLoadingEffect, userInfo }) => {
  if (isLoadingEffect) return <p>Loading plans...</p>;
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {plans.map((plan, index) => (
          <SwiperSlide key={index}>
            <PricingCard
              {...plan}
              onSubscribe={() => handlePayment(plan, userInfo)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default PricingCards;
