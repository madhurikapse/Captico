import { Router } from "express";
import { getCurrentUser, Login, Register } from "../controller/auth.controoler.js";

const router = Router();

// router.use()
router.post("/register",Register);
router.post("/login", Login);
router.get('/get-current-user', getCurrentUser)

export default router;