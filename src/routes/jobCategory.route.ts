import{ Router} from "express";
import {JobCategoryController} from "../controllers/job-category.controller"
import {validateCreateJobCategory} from "../middlewares/validate-job-category.middleware"



const router = Router()

router.post("/", validateCreateJobCategory, JobCategoryController.createJobCategory);
router.get("/", JobCategoryController.getJobCategories);
router.get("/:id", JobCategoryController.getJobCategoryById);
router.put("/:id", validateCreateJobCategory, JobCategoryController.updateJobCategory);
router.delete("/:id", JobCategoryController.deleteJobCategory);


export default router;