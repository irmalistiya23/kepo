import {UserResponse} from "@/lib/types/auth"
import {API_URL} from "@/lib/config/api"

export default {
  user: async (): Promise<UserResponse> => {
    const result = await fetch(`${API_URL}/api/auth/user`, {
      method: "GET",
      credentials: "include",
    });
    const raw: UserResponse = await result.json();
    return raw;
  },
  login: async (email: string, password: string): Promise<Response> => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    });

    if (!response.ok) {
      const errorData: { message: string } = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    return response;
  },
  reset: async(email:string, Password : string, ConfirmPassword:string)=>{
    const response = await fetch(`${API_URL}/api/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email:email ,newPassword: Password, confirmPassword: ConfirmPassword }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Reset failed");
    }
    return response;
  },
  getOTP: async(email:string)=>{
    const response = await fetch(`${API_URL}/api/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    return response;
  },
  sendOTP: async(email:string, otpData:string)=>{
    const response = await fetch(`${API_URL}/api/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email:email, otp: otpData }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify OTP.");
    }
    const data = await response.json();
    return data;
  }
}