import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
});

export default mongoose.model("Exam", examSchema);
