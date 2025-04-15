"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/auth/authLayout";
import auth from "@/lib/api/auth";

const SendOTPPage = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const inputs = useRef<HTMLInputElement[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = "";
        return newOtp;
      });
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = value;
        return newOtp;
      });
      if (index < inputs.current.length - 1 && value) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData?.getData("text") || "";
    if (/^\d{6}$/.test(text)) {
      setOtp(text.split(""));
      inputs.current[5]?.focus();
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      router.push("/login/getOTP");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = sessionStorage.getItem("email");
    const otpData = otp.join("");
    if (otpData.length < 6) {
      setError("Please enter a valid OTP code.");
      return;
    }
    try {
      if (!email) {
        throw new Error("Email is missing from session storage.");
      }
      const data = await auth.sendOTP(email, otpData);
      router.push("/login/reset");
      sessionStorage.setItem("token", data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <Layout type="login" title="Reset Password">
      <p className="mb-5">OTP Code :</p>
      <form id="otp-form" className="mb-10" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <p className="text-red-500">{error}</p>
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition duration-300 mt-10"
        >
          SEND
        </button>
      </form>
    </Layout>
  );
};

export default SendOTPPage;
