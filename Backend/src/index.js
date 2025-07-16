const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // React frontend URL (Vite default)
  credentials: true, // If you're using cookies or Authorization headers
}));
const PORT = 3000;
const authRoutes = require('./routes/authRoutes');

const pool = require('./config/db'); // ✅ This should import the correct pool using mysql2/promise
app.use(express.json());

app.use('/api', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
