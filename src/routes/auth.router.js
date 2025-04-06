import { Router } from "express";
import { isLoginValid, isRegisterValid } from "../middleware/auth.middleware.js";
import { login, register } from "../controllers/user.controller.js";

const router = Router();

router.post("/login", isLoginValid, login);
router.post("/register", isRegisterValid, register);

export default router;