import auth from "./auth.router.js";
import transactions from './transactions.router.js';
import { Router } from "express";
const router = Router();
router.use("/", auth);

router.use('/trans', transactions);

export default router; 
