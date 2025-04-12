import express from "express";
import Task from "../models/Task.js";
import Class from "../models/Class.js";
import Exam from "../models/Exam.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    // Fetch tasks, classes, and exams
    const tasks = await Task.find();
    const classes = await Class.find().populate("tasksDue");
    const exams = await Exam.find();

    // Construct stats object
    const stats = {
      today: {
        classes: classes.filter(
          (cls) => new Date(cls.date).toDateString() === today.toDateString()
        ).length,
        exams: exams.filter(
          (ex) => new Date(ex.date).toDateString() === today.toDateString()
        ).length,
      },
      tasks: {
        dueToday: tasks.filter(
          (task) =>
            new Date(task.dueDate).toDateString() === today.toDateString()
        ).length,
        dueTomorrow: tasks.filter(
          (task) =>
            new Date(task.dueDate).toDateString() === tomorrow.toDateString()
        ).length,
        overdue: tasks.filter((task) => new Date(task.dueDate) < today).length,
      },
      classes: {
        tomorrow: classes.filter(
          (cls) => new Date(cls.date).toDateString() === tomorrow.toDateString()
        ).length,
        withTasksDue: classes.filter((cls) => cls.tasksDue.length > 0).length,
      },
      exams: {
        inNext7Days: exams.filter(
          (ex) => new Date(ex.date) > today && new Date(ex.date) <= next7Days
        ).length,
      },
    };

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
