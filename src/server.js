import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import session from "express-session";
import passport from "passport";
import "./libs/OTPCleaner.js";
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json()); 
app.use(cookieParser());

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.use("/api", router);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})