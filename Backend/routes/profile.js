const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');
const authMiddleware = require('../JWT/authMiddleware');

// Get authenticated user's profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update authenticated user's profile
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user;  // from authMiddleware
    const updatedFields = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      updatedFields,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
