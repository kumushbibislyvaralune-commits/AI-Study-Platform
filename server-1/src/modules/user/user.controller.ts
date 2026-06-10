import { Request, Response } from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
  updateAvatar,
} from "./user.service";


export const profile = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const user = await getProfile(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Profile not found",
    });
  }
};

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const { fullName } = req.body;

    const user = await updateProfile(
      userId,
      fullName
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Profile update failed",
    });
  }
};

export const password = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const result = await changePassword(
      userId,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Password change failed",
    });
  }
};

export const avatar = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await updateAvatar(
      userId,
      req.file.path
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Avatar upload failed",
    });
  }
};


export const teacherProfile = async (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    data: {
      message: "Teacher profile access granted",
      user: (req as any).user,
    },
  });
};

export const adminProfile = async (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    data: {
      message: "Admin profile access granted",
      user: (req as any).user,
    },
  });
};