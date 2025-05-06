import { Pininput } from "@nayeshdaggula/tailify";
import React from "react";

function OtpModal({
  otpNumber,
  updateOtpNumber,
  handleVerifyOtp,
  genratedOtp,
  otpError,
}) {
  return (
    <>
      <form onSubmit={handleVerifyOtp} className="space-y-3 py-1 m-1">
        {/* <p className=''>Temparay Otp: {genratedOtp}</p> */}
        <Pininput
          numberOfInputs={6}
          value={otpNumber}
          onChange={updateOtpNumber}
          label="OTP Pin"
          description="Please enter your pin"
          placeholder="*"
          error={otpError}
        />
        <button
          onClick={handleVerifyOtp}
          className=" text-sm rounded-md px-4 py-2 bg-[#ffd119] w-full"
        >
          Verify OTP
        </button>
      </form>
    </>
  );
}

export default OtpModal;
