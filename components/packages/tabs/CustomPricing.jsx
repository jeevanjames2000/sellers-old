import React from "react";
import { FaCheck, FaPhone, FaEnvelope, FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import config from "@/config";
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
const handlePayment = async (
  userInfo,
  customPackage,
  subscription,
  cityName
) => {
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
  const apiURL = config.api_url;
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
  const amount = Number(customPackage.price);
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
      description: `Payment for ${customPackage.name} Plan`,
      order_id: order.id,
      handler: async (response) => {
        const payload = {
          user_id: userInfo?.user_id,
          user_type: userInfo?.user_type,
          city: cityName || userInfo?.city,
          name: userInfo?.name,
          mobile: userInfo?.mobile || "N/A",
          email: userInfo?.email || "N/A",
          subscription_package: customPackage.name,
          payment_amount: customPackage.price,
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
            user_type: userInfo?.user_type,
            name: userInfo?.name,
            city: cityName || userInfo?.city,
            mobile: userInfo?.mobile || "N/A",
            email: userInfo?.email || "N/A",
            subscription_package: customPackage.name,
            payment_amount: customPackage.price,
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
        city: cityName || userInfo?.city,
        subscription_package: customPackage.name,
        payment_amount: customPackage.price,
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
const CustomPricing = ({ userInfo, customPackage, subscription, cityName }) => {
  const handleEmailClick = () => {
    const emailBody = `Dear Meetowner,%0A%0AI am ${encodeURIComponent(
      userInfo?.name
    )}, interested in custom quotation. My mobile number is ${encodeURIComponent(
      userInfo?.mobile
    )}. Please get in touch with me.%0A%0ARegards,`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=nagarajuk@meetowner.in&su=Interested%20in%20Custom%20Quotation&body=${emailBody}`;
    window.open(gmailUrl, "_blank");
  };

  if (!customPackage) {
    return (
      <div className="max-w-xl mx-auto px-6 py-6 text-center border border-black rounded-lg">
        <h2 className="text-xl font-semibold mb-4">No Custom Plan Found</h2>
        <p className="text-gray-500 text-sm mb-4">
          Contact our team to create a custom plan that fits your needs.
        </p>
        <div className="text-sm text-gray-700 mb-4 space-y-2">
          <div className="flex items-center">
            <FaPhone className="text-[#1D3A76] mr-2" />
            <a href="tel:+919703003098" className="hover:text-black">
              +91 9703003098
            </a>
          </div>
          <div
            onClick={handleEmailClick}
            className="flex items-center cursor-pointer hover:text-black"
          >
            <FaEnvelope className="text-[#1D3A76] mr-2" />
            nagarajuk@meetowner.in
          </div>
        </div>
        <button
          onClick={handleEmailClick}
          className="bg-[#1D3A76] text-white px-6 py-2 rounded-md"
        >
          Contact Our Team
        </button>
      </div>
    );
  }

  const {
    name,
    duration_days,
    price,
    actual_amount,
    gst,
    gst_percentage,
    rules,
    button_text,
  } = customPackage;

  const paymentStatus = subscription?.payment?.payment_status;

  const userSubscriptionStatus = subscription?.user?.subscription_status;

  let subscriptionState = "Upgrade Now";

  if (
    paymentStatus === "processing" ||
    userSubscriptionStatus === "processing"
  ) {
    subscriptionState = "Processing";
  } else if (
    paymentStatus === "success" &&
    userSubscriptionStatus === "active"
  ) {
    subscriptionState = "Current Plan";
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-6">
      <div
        className="relative border rounded-lg shadow-sm p-10 text-left flex flex-col border-[#1D3A76] bg-white"
        style={{ minHeight: "450px" }}
      >
        <span className="absolute top-3  bg-[#fff] text-[#1D3A76] text-sm font-semibold px-3 py-0.5 rounded-full">
          Custom Plan for {userInfo?.name}
        </span>

        <h2 className="text-xl font-semibold text-[#1D3A76] mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{duration_days} days</p>

        <p className="text-2xl font-bold text-[#1D3A76] mb-4">
          <FaRupeeSign className="inline mr-1 text-base" />
          {price} /-
        </p>

        <ul className="space-y-2 mb-4 flex-1">
          {rules?.map((rule) =>
            rule.included ? (
              <li
                key={rule.id}
                className="text-md flex items-center text-gray-700"
              >
                <FaCheck className="text-green-500 mr-2" />
                {rule.rule_name}
              </li>
            ) : null
          )}
        </ul>

        <button
          disabled={
            subscriptionState === "Processing" ||
            subscriptionState === "Current Plan"
          }
          className={`w-full py-3 rounded-md font-medium transition ${
            subscriptionState === "Processing" ||
            subscriptionState === "Current Plan"
              ? "bg-green-400 text-white cursor-not-allowed"
              : "bg-[#1D3A76] text-white hover:bg-[#162D5E]"
          }`}
          onClick={() =>
            handlePayment(userInfo, customPackage, subscription, cityName)
          }
        >
          {subscriptionState === "Processing"
            ? "Processing..."
            : subscriptionState === "Current Plan"
            ? "Current Active Plan"
            : "Upgrade Now"}
        </button>
      </div>
    </div>
  );
};

export default CustomPricing;
