import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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