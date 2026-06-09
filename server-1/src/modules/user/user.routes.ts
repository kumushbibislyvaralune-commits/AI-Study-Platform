import { Router } from "express";
import { profile } from "./user.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.get("/profile", verifyToken, profile);

export default router;