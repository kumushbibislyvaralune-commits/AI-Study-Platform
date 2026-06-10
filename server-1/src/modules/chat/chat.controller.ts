import { Request, Response } from "express";
import {
  createChat,
  sendMessage,
  getMessages,
} from "./chat.service";

export const create = async (
  req: Request,
  res: Response
) => {
  const chat = await createChat();

  res.status(201).json({
    success: true,
    data: chat,
  });
};

export const send = async (
  req: Request,
  res: Response
) => {
  try {
    const chatId = req.params.chatId as string;

    const senderId = (req as any).user.id;

    const { content } = req.body;

    const message = await sendMessage(
      chatId,
      senderId,
      content
    );

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Message sending failed",
    });
  }
};

export const messages = async (
  req: Request,
  res: Response
) => {
  const chatId = req.params.chatId as string;

  const data = await getMessages(chatId);

  res.status(200).json({
    success: true,
    data,
  });
};