import { Router } from "express";
import {
  register,
  login,
  me,
} from "./auth.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, me);

export default router;