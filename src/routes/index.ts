import { Router } from "express";

import jobCategoryRoutes from "./JobCategoryRoutes";
import staticContentRoutes from "./StaticContentRoutes";
import templateRoutes from "./TemplateRoutes";
import adminAuditRoutes from "./AdminActionRoutes";

const router = Router();

router.use("/admin/categories", jobCategoryRoutes);
router.use("/admin/content", staticContentRoutes);
router.use("/admin/templates", templateRoutes);
router.use("/admin/audit-logs", adminAuditRoutes);

export default router;
