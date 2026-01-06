import { Router } from "express";
import {
  createEmailTemplate,
  createCVTemplate,
} from "../controllers/TemplateContoller";
import { mockAdmin } from "../models/Adminmodels/Adminmock";

const router = Router();

router.use(mockAdmin);

router.post("/email", createEmailTemplate);
router.post("/cv", createCVTemplate);

export default router;
