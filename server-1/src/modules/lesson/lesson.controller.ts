import { Request, Response } from "express";
import {
  createLesson,
  getCourseLessons,
  getLessonById,
} from "./lesson.service";

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const courseId = req.params.courseId as string;

    const {
      title,
      content,
      videoUrl,
      pdfUrl,
    } = req.body;

    const lesson = await createLesson(
      courseId,
      title,
      content,
      videoUrl,
      pdfUrl
    );

    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Lesson creation failed",
    });
  }
};

export const getByCourse = async (
  req: Request,
  res: Response
) => {
  const courseId = req.params.courseId as string;

  const lessons =
    await getCourseLessons(courseId);

  res.status(200).json({
    success: true,
    data: lessons,
  });
};

export const getById = async (
  req: Request,
  res: Response
) => {
  const lessonId = req.params.id as string;

  const lesson =
    await getLessonById(lessonId);

  res.status(200).json({
    success: true,
    data: lesson,
  });
};