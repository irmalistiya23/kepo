import Layout from "@/components/auth/authLayout.tsx";
import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default () => {
  const [otp, setOtp] = createSignal<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = createSignal<string>("");
  const navigate = useNavigate();
  let inputs: HTMLInputElement[] = [];

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      setOtp(prev => {
        const newOtp = [...prev];
        newOtp[index] = "";
        return newOtp;
      });
      if (index > 0) {
        inputs[index - 1]?.focus();
      }
    }
  };

  const handleInput = (e: InputEvent, index: number) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (/^[0-9]$/.test(value)) {
      setOtp(prev => {
        const newOtp = [...prev];
        newOtp[index] = value;
        return newOtp;
      });
      if (index < inputs.length - 1 && value) {
        inputs[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData?.getData("text") || "";
    if (/^\d{6}$/.test(text)) {
      setOtp(text.split(""));
      inputs[5]?.focus();
    }
  };

  onMount(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      navigate("/login/getOTP");
    }
  })

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const email = sessionStorage.getItem("email");
    const otpData: string = otp().join("");
    if (otpData.length < 6) {
      setError("Please enter a valid OTP code.");
      return;
    }
    try{
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpData }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to verify OTP.");
      }
      const data = await response.json();
      navigate("/login/reset");
      sessionStorage.setItem("token", data);
    }catch(err){
      if (err instanceof Error) {
        setError(err.message);
      }
    }

  };

  return (
    <Layout type="login" title="Reset Password">
      <p class="mb-5">OTP Code :</p>
      <form id="otp-form" class="mb-10" onSubmit={handleSubmit}>
        <div class="flex items-center justify-center gap-3">
          {otp().map((digit, index) => (
            <input
              ref={el => inputs[index] = el!}
              type="number"
              inputMode="numeric"
              class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
              value={digit}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <p class="text-red-500">{error()}</p>
        <button
          type="submit"
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition duration-300 mt-10"
        >
          SEND
        </button>
      </form>
    </Layout>
  );
};
