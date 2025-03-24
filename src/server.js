import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json()); 
app.use(cookieParser());
app.use("/api", router);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})