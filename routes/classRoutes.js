import express from "express";
import Class from "../models/Class.js";

const router = express.Router();

// Get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find().populate("tasksDue");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new class
router.post("/", async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const saved = await newClass.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
