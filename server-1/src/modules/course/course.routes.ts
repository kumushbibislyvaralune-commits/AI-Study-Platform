import { Router } from "express";
import {
  create,
  findAll,
  findOne,
} from "./course.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, create);
router.get("/", findAll);
router.get("/:id", findOne);

export default router;