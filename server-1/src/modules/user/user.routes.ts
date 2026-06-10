import { Router } from "express";
import { uploadAvatar } from "../../middleware/upload.middleware";
import { allowRoles } from "../../middleware/role.middleware";
import {
  profile,
  update,
  password,
  avatar,
  teacherProfile,
  adminProfile
} from "./user.controller";


import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.get(
  "/profile",
  verifyToken,
  profile
);

router.patch(
  "/profile",
  verifyToken,
  update
);

router.patch(
  "/change-password",
  verifyToken,
  password
);

export default router;

router.patch(
  "/avatar",
  verifyToken,
  uploadAvatar.single("avatar"),
  avatar
);

router.get(
  "/teacher-profile",
  verifyToken,
  allowRoles("Teacher", "Admin"),
  teacherProfile
);

router.get(
  "/admin-profile",
  verifyToken,
  allowRoles("Admin"),
  adminProfile
);