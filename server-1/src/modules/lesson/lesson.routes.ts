import { Router } from "express";
import {
  create,
  getByCourse,
  getById,
} from "./lesson.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/courses/:courseId/lessons", verifyToken, create);
router.get("/courses/:courseId/lessons", getByCourse);
router.get("/lessons/:id", getById);

export default router;