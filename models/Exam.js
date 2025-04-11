import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("Exam", examSchema);
