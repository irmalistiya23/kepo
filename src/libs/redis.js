import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await client.connect();
})();

export const saveOTP = async (key, otp, time = 5 * 60) => {
  await client.setEx(`${key}`, time, otp);
};

export const verifyOTP = async (key, inputOtp, callback) => {
  try {
    const storedOtp = await client.get(`${key}`);
    if (!storedOtp) return callback(null, false); // OTP tidak ditemukan atau expired
    if (storedOtp === inputOtp) {
      await client.del(`${key}`); // Hapus OTP setelah digunakan
      return callback(null, true);
    }
    return callback(null, false);
  } catch (err) {
    return callback(err, false);
  }
};

export default client;
