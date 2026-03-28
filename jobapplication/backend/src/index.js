require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const hrRoutes = require('./routes/hr');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/hr', hrRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', company: 'Prisma Company' });
});

app.listen(PORT, () => {
  console.log(`Prisma Company Portal API running on http://localhost:${PORT}`);
});
