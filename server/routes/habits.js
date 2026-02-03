const express = require('express');
const auth = require('../middleware/auth');
const Habit = require('../models/Habit');
const Completion = require('../models/Completion');
const Routine = require('../models/Routine');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/habits
// @desc    Get all habits for user
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits' });
  }
});

// @route   POST /api/habits
// @desc    Create a new habit
router.post('/', async (req, res) => {
  try {
    const { name, emoji, routineId } = req.body;
    const habit = await Habit.create({
      user: req.user._id,
      name,
      emoji: emoji || '✨',
      routineId: routineId || 'anytime'
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating habit' });
  }
});

// @route   DELETE /api/habits/:id
// @desc    Delete a habit
router.delete('/:id', async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    // Also delete completions for this habit
    await Completion.deleteMany({ habitId: req.params.id });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit' });
  }
});

// @route   GET /api/habits/completions
// @desc    Get all completions for user
router.get('/completions', async (req, res) => {
  try {
    const completions = await Completion.find({ user: req.user._id });
    res.json(completions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completions' });
  }
});

// @route   POST /api/habits/completions
// @desc    Toggle habit completion
router.post('/completions', async (req, res) => {
  try {
    const { habitId, date } = req.body;
    
    // Check if completion exists
    const existing = await Completion.findOne({
      user: req.user._id,
      habitId,
      date
    });

    if (existing) {
      // Toggle completion
      existing.completed = !existing.completed;
      await existing.save();
      res.json(existing);
    } else {
      // Create new completion
      const completion = await Completion.create({
        user: req.user._id,
        habitId,
        date,
        completed: true
      });
      res.status(201).json(completion);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error toggling completion' });
  }
});

// @route   GET /api/habits/routines
// @desc    Get all routines for user
router.get('/routines', async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.user._id });
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching routines' });
  }
});

// @route   POST /api/habits/routines
// @desc    Create a routine
router.post('/routines', async (req, res) => {
  try {
    const { id, name, color } = req.body;
    const routine = await Routine.create({
      user: req.user._id,
      id,
      name,
      color: color || '#C5CDD5',
      enabled: true
    });
    res.status(201).json(routine);
  } catch (error) {
    res.status(500).json({ message: 'Error creating routine' });
  }
});

module.exports = router;
