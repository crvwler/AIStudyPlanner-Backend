import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Handle database disconnection properly
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected. Retrying...");
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB disconnected due to server shutdown");
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
