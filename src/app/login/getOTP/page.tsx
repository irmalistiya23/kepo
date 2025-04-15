"use client";
import Layout from "@/components/layout/auth/authLayout";
import Timer from "@/components/ui/auth/Timer";
import auth from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GetOTP() {
  const [email, setEmail] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isCounterDone, setIsCounterDone] = useState<boolean>(true);
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmit(true);
      setIsCounterDone(false);
      const response = await auth.getOTP(email);
      if (!response.ok) {
        setIsSubmit(false);
        setIsCounterDone(true);
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to send OTP.");
      }
      setError("");
      sessionStorage.setItem("email", email);
      navigate("/login/sendOTP");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error:", err);
    }
  };

  return (
    <Layout type="login" title="Reset Password">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <label>
          {isSubmit && (
            <>
              Resend in <Timer time={300} callback={() => setIsCounterDone(true)} />
            </>
          )}
        </label>
        <label className="text-red-500 text-sm">{error}</label>

        <button
          type="submit"
          className={`w-full ${
            isCounterDone ? "bg-yellow-400 hover:bg-yellow-500" : "bg-yellow-600"
          } text-black font-semibold py-3 px-4 rounded-lg transition duration-300 mt-10`}
          disabled={!isCounterDone}
        >
          SEND
        </button>
      </form>
    </Layout>
  );
}
