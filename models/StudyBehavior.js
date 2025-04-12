import mongoose from "mongoose";

// Define the schema for StudyBehavior
const studyBehaviorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    performance: {
      type: Number,
      required: true,
    },
    availableTime: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    studyHours: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the StudyBehavior model
const StudyBehavior = mongoose.model("StudyBehavior", studyBehaviorSchema);

export default StudyBehavior;
