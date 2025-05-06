"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaCheck, FaRupeeSign, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
const handlePayment = async (plan, userInfo, fetchPlans) => {
  if (!userInfo?.user_id) {
    toast.error("User ID is required. Please log in.");
    return;
  }
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    toast.error(
      "Failed to processing payments. Please check your internet connection."
    );
    return;
  }
  const apiURL = "https://api.meetowner.in";
  try {
    const checkResponse = await fetch(`${apiURL}/payments/checkSubscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userInfo.user_id }),
    });
    const checkData = await checkResponse.json();
    if (!checkData.success) {
      toast.error("Error checking subscription status. Please try again.");
      return;
    }
    const { isSubscriptionActive, payment_status } = checkData;
    if (payment_status === "processing" || payment_status === "success") {
      toast.error("Your plan is in processing. Please wait.");
      return;
    }
    if (isSubscriptionActive) {
      toast.error("You already have an active subscription.");
      return;
    }
  } catch (error) {
    toast.error("Error checking subscription status. Please try again.");
    return;
  }
  const amount = Number(plan.price);
  try {
    const response = await fetch(`${apiURL}/payments/createOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        currency: "INR",
        user_id: userInfo.user_id,
      }),
    });
    const order = await response.json();
    if (!order.id) {
      toast.error(`Error creating order: ${order.message || "Unknown error"}`);
      return;
    }
    const razorKey = process.env.NEXT_PUBLIC_RAZOR_PAY_KEY;
    const options = {
      key: razorKey,
      amount: order.amount,
      currency: order.currency,
      name: "Meet Owner",
      description: `Payment for ${plan.name} Plan`,
      order_id: order.id,
      handler: async (response) => {
        const payload = {
          user_id: userInfo?.user_id,
          name: userInfo?.name,
          mobile: userInfo?.mobile || "N/A",
          email: userInfo?.email || "N/A",
          subscription_package: plan.name,
          payment_amount: plan.price,
          payment_reference: response.razorpay_payment_id,
          payment_mode: "online",
          payment_gateway: "Razorpay",
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          payment_status: "processing",
        };
        try {
          const verifyResponse = await fetch(
            `${apiURL}/payments/verifyPayment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            toast.success("Payment successful!");
            await fetchPlans();
          } else {
            toast.error(`Payment failed: ${verifyData.message}`);
          }
        } catch (error) {
          toast.error("Error verifying payment. Please try again.");
        }
      },
      prefill: {
        name: userInfo?.name || "Guest User",
        contact: userInfo?.mobile || "xxxxxxxxxx",
        email: userInfo?.email || "",
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: async () => {
          const payload = {
            user_id: userInfo?.user_id,
            name: userInfo?.name,
            mobile: userInfo?.mobile || "N/A",
            email: userInfo?.email || "N/A",
            subscription_package: plan.name,
            payment_amount: plan.price,
            payment_reference: null,
            payment_mode: "online",
            payment_gateway: "Razorpay",
            razorpay_order_id: order.id,
            razorpay_payment_id: null,
            razorpay_signature: null,
            payment_status: "cancelled",
          };
          try {
            await fetch(`${apiURL}/payments/verifyPayment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            await fetchPlans();
            toast.error(`Payment cancelled`);
          } catch (error) {
            toast.error(`Payment cancelled`);
          }
        },
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", async (response) => {
      const payload = {
        user_id: userInfo?.user_id,
        name: userInfo?.name,
        mobile: userInfo?.mobile || "N/A",
        email: userInfo?.email || "N/A",
        subscription_package: plan.name,
        payment_amount: plan.price,
        payment_reference: response.error.metadata.payment_id || null,
        payment_mode: "online",
        payment_gateway: "Razorpay",
        razorpay_order_id: response.error.metadata.order_id || null,
        razorpay_payment_id: response.error.metadata.payment_id || null,
        razorpay_signature: null,
        payment_status: "failed",
      };
      try {
        await fetch(`${apiURL}/payments/verifyPayment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.error("Payment failed. Please try again.");
      } catch (error) {
        toast.error("Something went wrong!. Please try again.");
      }
    });
    paymentObject.open();
  } catch (error) {
    toast.error("Something went wrong!. Please try again.");
  }
};
const PricingCard = ({
  title,
  duration,
  price,
  features,
  isPopular,
  isCurrentPlan,
  anyPlanActive,
  onSubscribe,
  loading,
  setLoading,
  fetchPlans,
  paymentStatus,
}) => {
  console.log(price);
  return (
    <div
      className={`relative border rounded-lg shadow-sm p-6 w-55 text-left flex flex-col ${
        isCurrentPlan
          ? "border-green-500 bg-green-50"
          : isPopular
          ? "border-[#1D3A76]"
          : "border-gray-400"
      }`}
      style={{
        backgroundColor: isCurrentPlan
          ? "#F0FFF4"
          : isPopular
          ? "#1D3A76"
          : "white",
        minHeight: "400px",
      }}
    >
      {isPopular && !isCurrentPlan && (
        <span className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff] text-[#1D3A76] text-xs font-semibold px-3 py-0.5 rounded-full">
          Popular
        </span>
      )}
      {isCurrentPlan && (
        <span className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-semibold px-3 py-0.5 rounded-full">
          Current Plan
        </span>
      )}
      <h2
        className={`text-xl font-semibold mb-2 ${
          isCurrentPlan
            ? "text-green-700"
            : isPopular
            ? "text-white"
            : "text-[#1D3A76]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mb-2 ${
          isCurrentPlan
            ? "text-green-600"
            : isPopular
            ? "text-gray-200"
            : "text-gray-600"
        }`}
      >
        {duration}
      </p>
      <p
        className={`text-2xl font-bold mb-2 ${
          isCurrentPlan
            ? "text-green-700"
            : isPopular
            ? "text-white"
            : "text-[#1D3A76]"
        }`}
      >
        {price === "Free" ? (
          "Free"
        ) : (
          <>
            <FaRupeeSign className="inline mr-1 text-base" />
            {price} /-
          </>
        )}
      </p>

      <ul className="space-y-2 flex-1">
        {Object.entries(features).map(([feature, value]) => (
          <li
            key={feature}
            className={`text-sm flex items-center ${
              isCurrentPlan
                ? "text-green-700"
                : isPopular
                ? "text-gray-200"
                : "text-gray-700"
            }`}
          >
            {value === "yes" ? (
              <FaCheck className="text-green-500 mr-2" />
            ) : value === "No" ? (
              <FaTimes className="text-red-500 mr-2" />
            ) : (
              <FaCheck className="text-green-500 mr-2" />
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
            isCurrentPlan
              ? "bg-green-500 text-white cursor-not-allowed"
              : price === "Free"
              ? "bg-gray-400 text-white cursor-not-allowed"
              : anyPlanActive
              ? "bg-gray-400 text-white cursor-not-allowed"
              : isPopular
              ? "bg-white text-[#1D3A76] hover:bg-gray-200"
              : "bg-[#1D3A76] text-white hover:bg-[#162D5E]"
          }`}
        onClick={() => onSubscribe({ title, price, fetchPlans })}
        disabled={isCurrentPlan || price === "Free" || anyPlanActive}
      >
        {isCurrentPlan
          ? paymentStatus === "processing"
            ? "Processing"
            : "Current Active Plan"
          : price === "Free"
          ? "Free Plan"
          : "Upgrade Now"}
      </button>
    </div>
  );
};
const PricingCards = ({
  plans,
  isLoadingEffect,
  userInfo,
  subscription,
  fetchPlans,
}) => {
  if (isLoadingEffect) return <p>Loading plans...</p>;
  const currentPlan = subscription?.user?.subscription_package?.toLowerCase();
  const paymentStatus = subscription?.payment?.payment_status;
  const subscriptionStatus = subscription?.user?.subscription_status;
  const transformRulesToFeatures = (rules) => {
    const features = {};
    rules.forEach((rule) => {
      features[rule.name] = rule.included ? "yes" : "No";
    });
    return features;
  };
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {plans.map((plan) => {
          const packageEnumMap = {
            "Free Listing": "free",
            Basic: "basic",
            Prime: "prime",
            "Prime Plus": "prime_plus",
          };
          const planKey = packageEnumMap[plan.name];
          const isCurrentPlan =
            currentPlan === planKey &&
            (subscriptionStatus === "active" ||
              paymentStatus === "processing" ||
              paymentStatus === "success");
          return (
            <SwiperSlide key={plan.id}>
              <PricingCard
                title={plan.name}
                duration={`${plan.duration_days} Days`}
                price={plan.price === "0.00" ? "Free" : `${plan.price}`}
                features={transformRulesToFeatures(plan.rules)}
                isPopular={plan.name.toLowerCase().includes("prime")}
                isCurrentPlan={isCurrentPlan}
                onSubscribe={() => handlePayment(plan, userInfo, fetchPlans)}
                fetchPlans={fetchPlans}
                paymentStatus={paymentStatus}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default PricingCards;
