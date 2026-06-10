import prisma from "../../services/prisma.service";

export const createCourse = async (
  title: string,
  description: string,
  creatorId: string
) => {
  return prisma.course.create({
    data: {
      title,
      description,
      creatorId,
    },
  });
};

export const getCourses = async () => {
  return prisma.course.findMany({
    include: {
      creator: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};

export const getCourseById = async (
  courseId: string
) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      creator: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

export const updateCourse = async (
  courseId: string,
  title: string,
  description: string,
  thumbnail?: string
) => {
  return prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      title,
      description,
      thumbnail,
    },
  });
};

export const deleteCourse = async (
  courseId: string
) => {
  await prisma.course.delete({
    where: {
      id: courseId,
    },
  });

  return {
    message: "Course deleted successfully",
  };
};