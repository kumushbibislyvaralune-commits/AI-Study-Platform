import { Router } from "express";
import {
  create,
  send,
  messages,
} from "./chat.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, create);

router.post(
  "/:chatId/messages",
  verifyToken,
  send
);

router.get(
  "/:chatId/messages",
  verifyToken,
  messages
);

export default router;