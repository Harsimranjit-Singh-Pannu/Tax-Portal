const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const Profile = require('../models/Profile');
const authMiddleware = require('../JWT/authMiddleware');
const Token = require('../models/Token');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


//Handle user registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });//checks email from Db and if it already exist
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ HASH the password

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    await new Profile({ userId: user._id, name, email }).save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





//Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    // Calculate expiry date from expiresIn
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day (adjust if needed)

    // Save token to DB
    await Token.create({ userId: user._id, token, expiresAt });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/logout', authMiddleware, async (req, res) => {
  const authHeader = req.header('Authorization');
  const token = authHeader.split(' ')[1];

  try {
    await Token.deleteOne({ token });
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
