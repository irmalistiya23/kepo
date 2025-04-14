import auth from "./auth.router.js";
import transactions from './transactions.router.js';
import goal from './goals.router.js';
import { Router } from "express";
const router = Router();
router.use("/", auth);

router.use('/trans', transactions);
router.use('/goal', goal)

export default router; 
