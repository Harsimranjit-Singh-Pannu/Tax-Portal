const express = require('express');
const router = express.Router();
const TaxDoc = require('../models/TaxDoc');
const authMiddleware = require('../JWT/authMiddleware');

// Save/upload a tax document
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user;  // from auth middleware
  const { fileName, fileUrl } = req.body;

  try {
    const doc = new TaxDoc({ userId, fileName, fileUrl });
    await doc.save();
    res.status(201).json({ message: 'Tax document saved', doc });
  } catch (err) {
    console.error('Error saving tax doc:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tax documents for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user;

  try {
    const docs = await TaxDoc.find({ userId });
    res.status(200).json(docs);
  } catch (err) {
    console.error('Error fetching tax docs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete tax document by id (only admin or owner can do this - add checks if needed)
router.delete('/:docId', authMiddleware, async (req, res) => {
  try {
    await TaxDoc.findByIdAndDelete(req.params.docId);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
