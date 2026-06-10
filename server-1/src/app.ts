import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import courseRoutes from "./modules/course/course.routes";
import enrollmentRoutes from "./modules/enrollment/enrollment.routes";
import lessonRoutes from "./modules/lesson/lesson.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api", lessonRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "AI Study Platform Server 1 Running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "server-1",
  });
});

export default app;