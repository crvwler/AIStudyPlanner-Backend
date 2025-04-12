// In routes/studyBehaviorRoutes.js
import express from "express";
import StudyBehavior from "../models/StudyBehavior.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const record = new StudyBehavior(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: "Failed to save study behavior" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const data = await StudyBehavior.find({ userId: req.params.userId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch study behavior" });
  }
});

export default router;
