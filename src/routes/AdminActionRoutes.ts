import { Router } from "express";
import { getAuditLogs } from "../controllers/AdminActionController";
import { AdminMiddleware } from "../middlewares/AdminLogMiddleware";

const router = Router();

router.use(AdminMiddleware);
router.get("/", getAuditLogs);

export default router;
