import prisma from "../../services/prisma.service";

export const enrollStudent = async (
  studentId: string,
  courseId: string
) => {
  const existingEnrollment =
    await prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId,
      },
    });

  if (existingEnrollment) {
    throw new Error(
      "Already enrolled in this course"
    );
  }

  return prisma.enrollment.create({
    data: {
      studentId,
      courseId,
    },
  });
};

export const getMyCourses = async (
  studentId: string
) => {
  return prisma.enrollment.findMany({
    where: {
      studentId,
    },
    include: {
      course: true,
    },
  });
};