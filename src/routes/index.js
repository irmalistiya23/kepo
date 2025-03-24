import auth from "./auth.router.js";
import { Router } from "express";
const router = Router();
router.use("/", auth);

export default router; 
