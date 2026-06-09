import { Request, Response } from "express";
import {
  enrollStudent,
  getMyCourses,
} from "./enrollment.service";

export const enroll = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = (req as any).user.id;
    const { courseId } = req.body;

    const enrollment = await enrollStudent(
      studentId,
      courseId
    );

    res.status(201).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Enrollment failed",
    });
  }
};

export const myCourses = async (
  req: Request,
  res: Response
) => {
  const studentId = (req as any).user.id;

  const courses = await getMyCourses(studentId);

  res.status(200).json({
    success: true,
    data: courses,
  });
};