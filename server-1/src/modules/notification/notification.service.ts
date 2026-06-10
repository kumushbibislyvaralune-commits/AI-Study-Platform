import prisma from "../../services/prisma.service";

export const createNotification = async (
  userId: string,
  title: string,
  message: string
) => {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  });
};

export const getMyNotifications = async (
  userId: string
) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markAsRead = async (
  notificationId: string
) => {
  return prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isRead: true,
    },
  });
};