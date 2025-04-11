import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  tasksDue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model("Class", classSchema);
