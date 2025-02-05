import { Router } from "express";
import { CreateTask, DeleteTask, GetAllTasks, GetAllUsers, getCurrentUser, Login, Logout, Register, UpdateTask, YourAddedTasks } from "../controller/task.controller.js";
import { checkIsUserValid } from "../middleware/allmiddlewear.js";


const router = Router();
router.post("/register",Register);
router.post("/login",Login);
router.post("/CreateTask",checkIsUserValid,CreateTask);
router.get("/getalltask",checkIsUserValid,GetAllTasks);
router.put('/task/update/:id',checkIsUserValid, UpdateTask);
router.delete('/task/delete/:id',checkIsUserValid, DeleteTask);
router.post("/your-added-tasks",checkIsUserValid, YourAddedTasks);
router.get('/get-current-user', getCurrentUser)
router.get("/getall", GetAllUsers);
router.post("/logout", Logout);

export default router;