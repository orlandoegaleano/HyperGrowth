//mesocycleRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Mesocycle = mongoose.model('Mesocycle');

const router = express.Router();

router.use(requireAuth);

// POST endpoint to create a new mesocycle
router.post('/mesocycles', async (req, res) => {
  const mesocycle = new Mesocycle({ userId: req.user._id, ...req.body });
  try {
    await mesocycle.save();
    res.status(201).send(mesocycle);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET endpoint to retrieve all mesocycles for a user
router.get('/mesocycles', async (req, res) => {
  try {
    const mesocycles = await Mesocycle.find({ userId: req.user._id });
    res.send(mesocycles);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET endpoint to retrieve a specific mesocycle
router.get('/mesocycles/:mesocycleId', async (req, res) => {
  try {
    const mesocycle = await Mesocycle.findById(req.params.mesocycleId);
    if (!mesocycle) {
      return res.status(404).send('Mesocycle not found');
    }
    res.send(mesocycle);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// PUT endpoint to update a specific mesocycle
router.put('/mesocycles/:id', async (req, res) => {
  try {
    const mesocycle = await Mesocycle.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!mesocycle) {
      return res.status(404).send('No mesocycle found with given ID for the user.');
    }
    res.send(mesocycle);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE endpoint to delete a specific mesocycle
router.delete('/mesocycles/:id', async (req, res) => {
  try {
    const mesocycle = await Mesocycle.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!mesocycle) {
      return res.status(404).send('No mesocycle found with given ID for the user.');
    }
    res.send(mesocycle);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
