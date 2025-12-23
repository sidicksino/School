
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Académie Royale API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
