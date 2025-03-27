import { Router } from "express";
import {
  isLoginValid,
  isRegisterValid,
  isResetPasswordValid,
  isAuthorized
} from "../middleware/auth.middleware.js";
import {
  login,
  register,
  resetPassword,
  setOTP,
  verifyOTPController,
  passport,
  oauthCallback,
  getUser
} from "../controllers/user.controller.js";

const router = Router();

router.post("/login", isLoginValid, login);
router.post("/register", isRegisterValid, register);
router.post("/reset", isResetPasswordValid, resetPassword);
router.post("/send-otp", setOTP);
router.post("/verify-otp", verifyOTPController);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  oauthCallback
);
router.get("/auth/user", isAuthorized, getUser)

export default router;
