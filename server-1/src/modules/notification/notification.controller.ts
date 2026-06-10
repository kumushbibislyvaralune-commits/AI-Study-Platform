import { Request, Response } from "express";
import {
  createNotification,
  getMyNotifications,
  markAsRead,
} from "./notification.service";

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, title, message } = req.body;

    const notification =
      await createNotification(
        userId,
        title,
        message
      );

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Notification creation failed",
    });
  }
};

export const myNotifications = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;

  const notifications =
    await getMyNotifications(userId);

  res.status(200).json({
    success: true,
    data: notifications,
  });
};

export const read = async (
  req: Request,
  res: Response
) => {
  const notificationId = req.params.id as string;

  const notification =
    await markAsRead(notificationId);

  res.status(200).json({
    success: true,
    data: notification,
  });
};