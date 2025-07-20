const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const taxDocRoutes = require('./routes/taxdocs');
const app = express();
app.use(cors());
// Allow larger payloads (default is 100kb, too small for base64 PDFs)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const auth = require('./JWT/authMiddleware');

app.get('/api/user/profile', auth, async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.json(user);
});




mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/taxdocs', taxDocRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
