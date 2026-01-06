import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "../controllers/JobCategoryController";
import { mockAdmin } from "../models/Adminmodels/Adminmock";

const router = Router();

router.use(mockAdmin);

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);

export default router;
