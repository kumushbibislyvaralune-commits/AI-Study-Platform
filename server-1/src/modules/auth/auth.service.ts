import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../services/prisma.service";

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let studentRole = await prisma.role.findUnique({
    where: {
      name: "Student",
    },
  });

  if (!studentRole) {
    studentRole = await prisma.role.create({
      data: {
        name: "Student",
      },
    });
  }

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash: hashedPassword,
      roleId: studentRole.id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.name,
    },
    "secret_key",
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role.name,
    },
  };
};