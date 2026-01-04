import { Router } from "express";
import { login, logout } from "./controllers/login.controller";
import { forgotPassword, resetPassword } from "./controllers/password.controller";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);

export default router;
