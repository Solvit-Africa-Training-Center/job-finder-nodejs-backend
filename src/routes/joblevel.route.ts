import express, { Router } from "express";
import { JobLevelController } from "../controllers";
import { validate } from "../middlewares/validate";
import {
  createJobLevelSchema,
  updateJobLevelSchema,
} from "../schemas/jobLevel.schema";

const router: Router = express.Router();
const controller = new JobLevelController();

router.post("/", validate(createJobLevelSchema), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", validate(updateJobLevelSchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
