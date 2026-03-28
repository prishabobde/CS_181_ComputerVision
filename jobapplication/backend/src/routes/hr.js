const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireHR } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/hr/applications - get all applications (HR only)
router.get('/applications', authenticateToken, requireHR, async (req, res) => {
  try {
    const { jobId, status } = req.query;
    const where = {};
    if (jobId) where.jobPostingId = parseInt(jobId);
    if (status) where.status = status;

    const applications = await prisma.application.findMany({
      where,
      include: {
        applicant: { select: { id: true, name: true, email: true } },
        jobPosting: true,
        reviewer: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/hr/applications/:id/status - update application status
router.patch('/applications/:id/status', authenticateToken, requireHR, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const application = await prisma.application.update({
      where: { id: parseInt(req.params.id) },
      data: { status, reviewerId: req.user.id },
      include: {
        applicant: { select: { id: true, name: true, email: true } },
        jobPosting: true,
      },
    });
    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/hr/stats - dashboard stats
router.get('/stats', authenticateToken, requireHR, async (req, res) => {
  try {
    const [
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      reviewingApplications,
      acceptedApplications,
      rejectedApplications,
    ] = await Promise.all([
      prisma.jobPosting.count(),
      prisma.jobPosting.count({ where: { isActive: true } }),
      prisma.application.count(),
      prisma.application.count({ where: { status: 'PENDING' } }),
      prisma.application.count({ where: { status: 'REVIEWING' } }),
      prisma.application.count({ where: { status: 'ACCEPTED' } }),
      prisma.application.count({ where: { status: 'REJECTED' } }),
    ]);

    res.json({
      jobs: { total: totalJobs, active: activeJobs },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        reviewing: reviewingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
