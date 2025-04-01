import { request, response } from "express";
import { loginSchema, registerSchema,resetSchema } from "../validation/auth.validate.js";
import { verifyToken } from "../libs/JWT.js";
import prisma from "../utils/prisma.client.js";

export const isLoginValid = async (req = request, res = response, next) => {
  const {email, password} = req.body;
  // cek data yang masuk
  if(!email || !password) {
    return res.status(400).json({
      message:"data incomplete"
    });
  }
  // validasi data
  const isValid = await loginSchema.safeParseAsync({
    email:email,
    password:password
  });
  if(!isValid.success){
    return res.status(400).json({
      message: isValid.error.errors[0].message
    });
  }
  next();
}


export const isRegisterValid = async (req = request, res = response, next)=>{
  const {name, password, email} = req.body;
  
    // cek data yang dikirimkan
    if(!name || !password || !email ) {
      return res.status(400).json({
        message:"data incomplete"
      });
    }
  
    // validasi data
    const isDataValid = await registerSchema.safeParseAsync({
      name:name, 
      password:password, 
      email:email
    });
    if(!isDataValid.success){
      return res.status(400).json({
        message: isDataValid.error.errors[0].message
      });
    }
  
    // cek apakah email sudah ada
    const userUnavailable = await prisma.user.findUnique({
      where:{
        email:email
      }
    });
    if(userUnavailable){
      return res.status(400).json({
        message: "email sudah digunakan"
      });
    }
    next();
}

export const isResetPasswordValid = async (req= request, res = response, next)=>{
  const {email, newPassword, confirmPassword} = req.body;
  if(!email || !newPassword || !confirmPassword){
    return res.status(400).json({
      message: "data incomplete",
      data: {
        email,
        newPassword,
        confirmPassword
      }
    });
  }


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

  const isDataValid = await resetSchema.safeParseAsync({
    email,
    newPassword:newPassword,
    confirmPassword:confirmPassword
  })

  if(!isDataValid.success){
    return res.status(400).json({
      message: isDataValid.error.errors[0].message
    });
  }

  next();
}

export const isAuthorized = async (req = request, res = response, next) => {
  const token = req.cookies.token;
  if(!token) return res.status(401).json({message:"Unauthorized, token not found"});
  try{
    const result = await verifyToken(token);
	console.log(result);
  }catch(err){
    return res.status(401).json({message:"Unauthorized, token not valid"});
  }
  next();
}