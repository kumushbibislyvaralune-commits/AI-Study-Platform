import { Router } from "express";
import {
  create,
  myNotifications,
  read,
} from "./notification.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, create);
router.get("/my", verifyToken, myNotifications);
router.patch("/:id/read", verifyToken, read);

export default router;