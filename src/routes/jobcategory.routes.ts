import express, { Router } from "express";
import { JobCategoryController } from "../controllers";

const router: Router = express.Router();
const controller = new JobCategoryController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
