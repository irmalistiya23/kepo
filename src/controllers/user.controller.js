import prisma from "../utils/prisma.client.js";
import { request, response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../libs/JWT.js";

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
    message: "User berhasil ditambahkan",
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
