import { createSignal } from "solid-js";
import Layout from "@/components/layout/auth/authLayout.tsx";
import Timer from "@/components/ui/auth/Timer.tsx";
import auth from "@/lib/api/auth.ts";
export default function () {
  const [email, setEmail] = createSignal<string>("");
  const [isSubmit, setIsSubmit] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string>("");
  const [isCounterDone, setIsCounterDone] = createSignal<boolean>(true);
  const navigate = (url: string) => {
    window.open(url, "_self");
  };
  const handleSubmit = async (e: Event) => {
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
      sessionStorage.setItem("email", email());
      navigate("/login/sendOTP");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error:", err);
    } finally {
    }
  };
  return (
    <>
      <Layout type="login" title="Reset Password">
        <form on:submit={handleSubmit} class="mb-8">
          <div class="mb-2">
            <label for="email" class="block text-gray-700 mb-2 ">
              Email:
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                on:input={(e: Event) =>
                  setEmail((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>

          <label>
            {isSubmit() && (
              <>
                Resend in <Timer time={300} callback={() => setIsCounterDone(true)} />
              </>
            )}
          </label>
          <label class="text-red-500 text-sm">{error()}</label>

          <button
            type="submit"
            class={`w-full ${isCounterDone() ? "bg-yellow-400 hover:bg-yellow-500" : "bg-yellow-600"}  text-black font-semibold py-3 px-4 rounded-lg transition duration-300 mt-10`}
            disabled={!isCounterDone()}
          >
            SEND
          </button>
        </form>
      </Layout>
    </>
  );
}
