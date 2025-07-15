const express = require('express');
const app = express();
const PORT = 3000;
const authRoutes = require('./routes/authRoutes');

const pool = require('./config/db'); // ✅ This should import the correct pool using mysql2/promise
app.use(express.json());

app.use('/api', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
