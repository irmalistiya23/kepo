import prisma from "../utils/prisma.client.js";
import { request, response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../libs/JWT.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { saveOTP, verifyOTP } from "../libs/redis.js";

export const login = async (req = request, res = response)=>{
  const {email, password} = req.body;

const user = await prisma.user.findUnique({
  where:{
    email:email
  }
});

if(!user){
  return res.status(404).json({
    message: "user not found"
  });
}

const isPasswordValid = await compare(password, user.password);
if (!isPasswordValid) {
  return res.status(401).json({
    message: "Invalid password",
  });
}

const token = createToken({ id: user.id, email: user.email, name: user.name});
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 1000,
})


res.status(200).json({
  message: "success",
  data: {
    id: user.id,
    email: user.email,
    name: user.name,
    token: token
  }
});

}

export const register = async (req = request, res = response)=>{
const {name, password, email} = req.body;

// hash password
const hashedPassword = await hash(password, 12);

// menambahkan user
try{
  const user = await prisma.user.create({
    data: {
      email:email,
      name:name,
      password:hashedPassword
    }
  });
  res.status(201).json({
    message: "success",
    data: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
}catch(error){
  console.log(error)
}
}

export const resetPassword = async (req = request, res = response)=>{
  const {email, newPassword} = req.body;
  const newHashedPassword = await hash(newPassword, 12);
  try{
    const updatedUser = await prisma.user.update({
      where:{
        email:email
      },
      data:{
        password: newHashedPassword
      }
    });
    if(!updatedUser){
      return res.status(404).json({
        message: "User not found"
      });
    }
    return res.status(200).json({
      message: "success"
    });
  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error",
      error: err
    })
  }
}



export const setOTP = async (req = request, res = response) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  saveOTP(email, otp);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Ubah ke 587 kalau 465 error
    secure: true, // false kalau pakai 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from:  process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error });
  }
}

export const verifyOTPController = async (req = request, res = response) => {
  const { email, otp } = req.body;

  verifyOTP(email, otp, (err, isValid)=>{
    if (err) {
      console.error("Error saat verifikasi OTP:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server!" });
    }

    if (!isValid) {
      return res.status(400).json({ message: "OTP salah atau sudah kadaluarsa!" });
    }

    return res.status(200).json({ message: "OTP valid, verifikasi sukses!" });
  })
  
}
