import express from "express";
import Exam from "../models/Exam.js";

const router = express.Router();

// Get all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new exam
router.post("/", async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    const saved = await newExam.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
