import mongoose from "mongoose";

const pomodoroSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  completedSessions: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 }, // Time in seconds
});

const Pomodoro = mongoose.model("Pomodoro", pomodoroSchema);

export default Pomodoro;
