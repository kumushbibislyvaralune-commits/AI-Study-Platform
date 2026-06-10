import prisma from "../../services/prisma.service";

export const createChat = async () => {
  return prisma.chat.create({
    data: {},
  });
};

export const sendMessage = async (
  chatId: string,
  senderId: string,
  content: string
) => {
  return prisma.message.create({
    data: {
      chatId,
      senderId,
      content,
    },
    include: {
      sender: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};

export const getMessages = async (
  chatId: string
) => {
  return prisma.message.findMany({
    where: {
      chatId,
    },
    include: {
      sender: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};