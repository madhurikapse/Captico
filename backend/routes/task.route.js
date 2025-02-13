import { Router } from "express";
import { checkIsUserValid } from "../middleware/allmiddlewear.js";
import { CreateTask, DeleteTask, GetAllTasks, UpdateTask, YourAddedTasks } from "../controller/task.controller.js";

const router = Router();
router.post("/CreateTask",checkIsUserValid,CreateTask);
router.get("/getalltask",checkIsUserValid,GetAllTasks);
router.put('/task/update/:id',checkIsUserValid, UpdateTask);
router.delete('/task/delete/:id',checkIsUserValid, DeleteTask);
router.post("/your-added-tasks",checkIsUserValid, YourAddedTasks);

export default router;