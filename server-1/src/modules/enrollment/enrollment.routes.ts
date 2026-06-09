import { Router } from "express";
import {
  enroll,
  myCourses,
} from "./enrollment.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, enroll);
router.get("/my-courses", verifyToken, myCourses);

export default router;