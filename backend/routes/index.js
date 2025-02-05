import { Router } from "express";
import AuthRoutes from "./routes/auth.route.js"
import TaskRoutes from "./routes/task.route.js"
const router = Router();
router.use("/auth", AuthRoutes);
router.use("/task", TaskRoutes);
export default router;