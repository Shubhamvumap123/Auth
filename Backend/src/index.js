const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const allowedOrigins = [
  'http://localhost:5173',
  'https://auth-mocha-five.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

const PORT = 3000;
const authRoutes = require('./routes/authRoutes');

const pool = require('./config/db'); // ✅ This should import the correct pool using mysql2/promise
app.use(express.json());

app.use('/api', authRoutes);

try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Server crashed:", err);
}
