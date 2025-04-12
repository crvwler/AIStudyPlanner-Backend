import express from "express";
import Pomodoro from "../models/Pomodoro.js";

const router = express.Router();

// POST request to store Pomodoro session data
router.post("/update", async (req, res) => {
  try {
    const { userId, completedSessions, totalTime } = req.body;

    // Check if Pomodoro data exists for the user
    let pomodoro = await Pomodoro.findOne({ userId });

    if (!pomodoro) {
      // If not, create a new Pomodoro record
      pomodoro = new Pomodoro({ userId, completedSessions, totalTime });
    } else {
      // Update existing record
      pomodoro.completedSessions = completedSessions;
      pomodoro.totalTime = totalTime;
    }

    // Save the updated data to the database
    await pomodoro.save();
    res
      .status(200)
      .json({ message: "Pomodoro data updated successfully", pomodoro });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating Pomodoro data", error: err.message });
  }
});

// GET request to retrieve Pomodoro session data
router.get("/get/:userId", async (req, res) => {
  try {
    const pomodoro = await Pomodoro.findOne({ userId: req.params.userId });

    if (!pomodoro) {
      return res.status(404).json({ message: "Pomodoro data not found" });
    }

    res.status(200).json(pomodoro);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching Pomodoro data", error: err.message });
  }
});

export default router;
