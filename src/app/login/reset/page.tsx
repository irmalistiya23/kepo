"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/auth/authLayout";
import auth from "@/lib/api/auth";

export default function ResetPassword() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login/getOTP");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const email = sessionStorage.getItem("email");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      if (!email) {
        throw new Error("Email is missing from session storage");
      }
      await auth.reset(email, password, confirmPassword);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout type="login" title="Reset Password">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password:
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={togglePassword}
            >
              <svg
                id="eye-icon"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d={
                    showPassword
                      ? "M4.318 4.318a1 1 0 011.414 0L10 8.586l4.268-4.268a1 1 0 111.464 1.364l-4.268 4.268 4.268 4.268a1 1 0 01-1.464 1.364L10 11.414l-4.268 4.268a1 1 0 01-1.464-1.364l4.268-4.268-4.268-4.268a1 1 0 010-1.414z"
                      : "M10 3C5 3 1 10 1 10s4 7 9 7 9-7 9-7-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            Confirm Password:
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={togglePassword}
            >
              <svg
                id="eye-icon"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d={
                    showPassword
                      ? "M4.318 4.318a1 1 0 011.414 0L10 8.586l4.268-4.268a1 1 0 111.464 1.364l-4.268 4.268 4.268 4.268a1 1 0 01-1.464 1.364L10 11.414l-4.268 4.268a1 1 0 01-1.464-1.364l4.268-4.268-4.268-4.268a1 1 0 010-1.414z"
                      : "M10 3C5 3 1 10 1 10s4 7 9 7 9-7 9-7-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-red-600">{error}</p>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "RESET"}
        </button>
      </form>
    </Layout>
  );
}
