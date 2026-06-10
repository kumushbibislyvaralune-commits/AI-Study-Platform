import { Router } from "express";
import {
  create,
  findAll,
  findOne,
  update,
  remove,
} from "./course.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, create);

router.get("/", findAll);
router.get("/:id", findOne);

router.patch(
  "/:id",
  verifyToken,
  update
);

router.delete(
  "/:id",
  verifyToken,
  remove
);

export default router;