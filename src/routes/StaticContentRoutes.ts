import { Router } from "express";
import { createContent, getContents } from "../controllers/StaticContentController";
import { mockAdmin } from "../models/Adminmodels/Adminmock";

const router = Router();

router.use(mockAdmin);
router.post("/", createContent);
router.get("/", getContents);

export default router;
