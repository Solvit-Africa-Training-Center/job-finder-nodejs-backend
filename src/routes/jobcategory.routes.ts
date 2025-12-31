import express, { Router } from "express";
import { JobCategoryController } from "../controllers";
import { validate } from "../middlewares/validate";
import {
  createJobCategorySchema,
  updateJobCategorySchema,
} from "../schemas/jobCategory.schema";

const router: Router = express.Router();
const controller = new JobCategoryController();

router.post("/", validate(createJobCategorySchema), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", validate(updateJobCategorySchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
