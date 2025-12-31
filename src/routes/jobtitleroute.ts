import express, { Router } from "express";
import { JobTitleController } from "../controllers";
import { validate } from "../middlewares/validate";
import {
  createJobTitleSchema,
  updateJobTitleSchema,
} from "../schemas/jobTitle.schema";

const router: Router = express.Router();
const controller = new JobTitleController();

router.post("/", validate(createJobTitleSchema), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", validate(updateJobTitleSchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
