import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "./auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await registerUser(
      fullName,
      email,
      password
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};