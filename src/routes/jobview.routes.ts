import { Router } from "express";
import { JobViewController } from "../modules/jobView/jobview.controller";

const router = Router();

router.post("/", JobViewController.create);
router.get("/job/:jobId", JobViewController.getByJob);
router.get("/job/:jobId/count", JobViewController.count);

export default router;
