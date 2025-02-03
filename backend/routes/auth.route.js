import Router from "express";
import { loginUser, registerUser } from "../controller/authController.js";

const router = Router();

// it is endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;