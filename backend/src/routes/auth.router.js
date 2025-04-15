import { Router } from "express";
import {
  isLoginValid,
  isRegisterValid,
  isResetPasswordValid,
  isAuthorized,
  isSetOTPValid
} from "../middleware/auth.middleware.js";
import {
  login,
  register,
  resetPassword,
  setOTP,
  verifyOTPController,
  passport,
  oauthCallback,
  getUser,
  logout,
  githubCallback
} from "../controllers/user.controller.js";

const router = Router();

router.post("/login", isLoginValid, login);
router.post("/logout", logout);
router.post("/register", isRegisterValid, register);
router.post("/reset", isResetPasswordValid, resetPassword);
router.post("/send-otp",isSetOTPValid, setOTP);
router.post("/verify-otp", verifyOTPController);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["profile", "user:email"] })
);
router.get(
  "/auth/github/callback",
  passport.authenticate('github', {
    failureRedirect: "/login",
  }),
  githubCallback
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  oauthCallback
);
router.get("/auth/user", isAuthorized, getUser);
router.get("/auth/status", (req, res) => {
  if (req.cookies.token) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});


export default router;
