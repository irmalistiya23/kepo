import { Router } from "express";
import { isLoginValid, isRegisterValid, isResetPasswordValid } from "../middleware/auth.middleware.js";
import { login, register, resetPassword, setOTP, verifyOTPController } from "../controllers/user.controller.js";

const router = Router();

router.post("/login", isLoginValid, login);
router.post("/register", isRegisterValid, register);
router.post("/rspw", isResetPasswordValid, resetPassword);
router.post("/send-otp", setOTP);
router.post("/verify-otp", verifyOTPController);

export default router;