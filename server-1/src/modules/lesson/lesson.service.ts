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
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return lesson;
};

export const updateLesson = async (
  lessonId: string,
  title: string,
  content?: string,
  videoUrl?: string,
  pdfUrl?: string,
  order?: number
) => {
  return prisma.lesson.update({
    where: {
      id: lessonId,
    },
    data: {
      title,
      content,
      videoUrl,
      pdfUrl,
      order,
    },
  });
};

export const deleteLesson = async (
  lessonId: string
) => {
  await prisma.lesson.delete({
    where: {
      id: lessonId,
    },
  });

  return {
    message: "Lesson deleted successfully",
  };
};