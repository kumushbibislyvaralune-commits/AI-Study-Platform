import { Request, Response } from "express";
import { getProfile } from "./user.service";

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