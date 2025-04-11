import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  hasTask: { type: Boolean, required: true },
  tasksDue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model("Class", classSchema);
