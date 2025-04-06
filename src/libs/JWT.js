import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

export const createToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" }); 
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); 
  } catch (error) {
    return null; 
  }
};