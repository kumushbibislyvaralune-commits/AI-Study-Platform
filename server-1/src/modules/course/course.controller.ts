import { Request, Response } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
} from "./course.service";

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description } = req.body;
    const creatorId = (req as any).user.id;

    const course = await createCourse(
      title,
      description,
      creatorId
    );

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Course creation failed",
    });
  }
};

export const findAll = async (
  req: Request,
  res: Response
) => {
  const courses = await getCourses();

  res.status(200).json({
    success: true,
    data: courses,
  });
};

export const findOne = async (
  req: Request,
  res: Response
) => {
  try {
    const courseId = req.params.id as string;

    const course = await getCourseById(courseId);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Course not found",
    });
  }
};