import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ["Low", "Normal", "High"], default: "Normal" },
});

export default mongoose.model("Task", taskSchema);
