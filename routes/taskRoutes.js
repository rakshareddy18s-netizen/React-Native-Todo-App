const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// GET ALL TASKS
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// CREATE TASK
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      dateTime,
      deadline,
      priority,
    } = req.body;

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      dateTime,
      deadline,
      priority,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// UPDATE TASK
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    Object.assign(task, req.body);

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

// DELETE TASK
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router;