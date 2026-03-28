const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireHR } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/jobs - list all active job postings (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/jobs/all - list all job postings including inactive (HR only)
router.get('/all', authenticateToken, requireHR, async (req, res) => {
  try {
    const jobs = await prisma.jobPosting.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { applications: true } } },
    });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/jobs - create job posting (HR only)
router.post('/', authenticateToken, requireHR, async (req, res) => {
  try {
    const { title, description, department, location, salaryRange } = req.body;
    if (!title || !description || !department || !location) {
      return res.status(400).json({ error: 'Title, description, department, and location are required' });
    }
    const job = await prisma.jobPosting.create({
      data: { title, description, department, location, salaryRange },
    });
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/jobs/:id - update job posting (HR only)
router.put('/:id', authenticateToken, requireHR, async (req, res) => {
  try {
    const { title, description, department, location, salaryRange, isActive } = req.body;
    const job = await prisma.jobPosting.update({
      where: { id: parseInt(req.params.id) },
      data: { title, description, department, location, salaryRange, isActive },
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/jobs/:id - delete job posting (HR only)
router.delete('/:id', authenticateToken, requireHR, async (req, res) => {
  try {
    await prisma.jobPosting.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Job posting deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
