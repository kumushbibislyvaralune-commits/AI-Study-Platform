import prisma from "../../services/prisma.service";

export const createLesson = async (
  courseId: string,
  title: string,
  content?: string,
  videoUrl?: string,
  pdfUrl?: string
) => {
  return prisma.lesson.create({
    data: {
      courseId,
      title,
      content,
      videoUrl,
      pdfUrl,
    },
  });
};

export const getCourseLessons = async (
  courseId: string
) => {
  return prisma.lesson.findMany({
    where: {
      courseId,
    },
    orderBy: {
      order: "asc",
    },
  });
};

export const getLessonById = async (
  lessonId: string
) => {
  return prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
  });
};