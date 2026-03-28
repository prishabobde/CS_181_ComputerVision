const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireApplicant } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/applications/my - get current applicant's applications
router.get('/my', authenticateToken, requireApplicant, async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { applicantId: req.user.id },
      include: {
        jobPosting: true,
        reviewer: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/applications - submit an application
router.post('/', authenticateToken, requireApplicant, async (req, res) => {
  try {
    const { jobPostingId, coverLetter, resumeUrl } = req.body;

    if (!jobPostingId) {
      return res.status(400).json({ error: 'Job posting ID is required' });
    }

    const job = await prisma.jobPosting.findUnique({
      where: { id: parseInt(jobPostingId) },
    });
    if (!job || !job.isActive) {
      return res.status(404).json({ error: 'Job posting not found or inactive' });
    }

    const existing = await prisma.application.findUnique({
      where: {
        applicantId_jobPostingId: {
          applicantId: req.user.id,
          jobPostingId: parseInt(jobPostingId),
        },
      },
    });
    if (existing) {
      return res.status(409).json({ error: 'You have already applied for this position' });
    }

    const application = await prisma.application.create({
      data: {
        applicantId: req.user.id,
        jobPostingId: parseInt(jobPostingId),
        coverLetter,
        resumeUrl,
      },
      include: { jobPosting: true },
    });
    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/applications/:id - withdraw application
router.delete('/:id', authenticateToken, requireApplicant, async (req, res) => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!application || application.applicantId !== req.user.id) {
      return res.status(404).json({ error: 'Application not found' });
    }
    await prisma.application.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Application withdrawn' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
