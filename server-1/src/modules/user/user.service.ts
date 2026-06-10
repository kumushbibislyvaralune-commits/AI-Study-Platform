import prisma from "../../services/prisma.service";
import bcrypt from "bcryptjs";

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      profileImage: true,
      createdAt: true,
      role: { select: { name: true } },
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const updateProfile = async (
  userId: string,
  fullName: string
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { fullName },
    select: {
      id: true,
      fullName: true,
      email: true,
      profileImage: true,
    },
  });
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  );

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedPassword },
  });

  return {
    message: "Password changed successfully",
  };
};

export const updateAvatar = async (
  userId: string,
  profileImage: string
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { profileImage },
    select: {
      id: true,
      fullName: true,
      email: true,
      profileImage: true,
    },
  });
};