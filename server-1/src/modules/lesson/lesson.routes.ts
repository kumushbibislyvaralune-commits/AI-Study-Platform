import { Router } from "express";
import {
  create,
  getByCourse,
  getById,
  update,
  remove,
} from "./lesson.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/courses/:courseId/lessons",
  verifyToken,
  create
);

router.get(
  "/courses/:courseId/lessons",
  getByCourse
);

router.get(
  "/lessons/:id",
  getById
);

router.patch(
  "/lessons/:id",
  verifyToken,
  update
);

router.delete(
  "/lessons/:id",
  verifyToken,
  remove
);

export default router;