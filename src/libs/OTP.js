import prisma from "../utils/prisma.client.js";

export default class OTP {
  static saveOTP = async (key, otp, time = new Date(Date.now() + 5 * 60 * 1000).toISOString()) => {
    try {
      const result = await prisma.oTP.create({
        data: { key, otp, time }
      });
      console.log("OTP berhasil disimpan:", result);
      return true;
    } catch (err) {
      console.error("Gagal menyimpan OTP:", err);
      return false;
    }
  };
  

  static verifyOTP = async (key, inputOtp, callback) => {
    try {
      const storedOTP = await prisma.oTP.findUnique({
        where: { key:key,
          otp: inputOtp }
      });
  
      if (!storedOTP) return callback(null, false);
  
      // Convert storedOTP.time dari string ke Date
      const storedTime = new Date(storedOTP.time);
  
      if (storedTime < new Date()) return callback(null, false);
  
      if (storedOTP.otp === inputOtp) {
        await prisma.oTP.delete({
          where: { otp: inputOtp } // Hapus berdasarkan key, bukan otp untuk lebih aman
        });
        return callback(null, true);
      }
  
      return callback(null, false);
    } catch (err) {
      return callback(err, false);
    }
  };
  
}