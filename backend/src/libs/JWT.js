import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

export const createToken = (userId, expires = "1h") => {
  console.log("JWT_SECRET (signing):", JWT_SECRET); // Debugging
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: expires }); 
};

export const verifyToken = (token) => {
  try {
    console.log("JWT_SECRET (verifying):", JWT_SECRET); // Debugging
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT Verification Error:", error.message); 
    return null;
  }
};

