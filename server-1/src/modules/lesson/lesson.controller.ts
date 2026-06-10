import { Request, Response } from "express";
import {
  createLesson,
  getCourseLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
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
  try {
    const lessonId = req.params.id as string;

    const lesson =
      await getLessonById(lessonId);

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Lesson not found",
    });
  }
};

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const lessonId = req.params.id as string;

    const {
      title,
      content,
      videoUrl,
      pdfUrl,
      order,
    } = req.body;

    const lesson = await updateLesson(
      lessonId,
      title,
      content,
      videoUrl,
      pdfUrl,
      order
    );

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Lesson update failed",
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    const lessonId = req.params.id as string;

    const result =
      await deleteLesson(lessonId);

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
          : "Lesson delete failed",
    });
  }
};