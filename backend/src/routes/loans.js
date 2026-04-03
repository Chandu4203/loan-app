const router = require('express').Router();
const prisma = require('../lib/prisma');
const authMiddleware = require('../middleware/auth');

// All loan routes require authentication
router.use(authMiddleware);

// GET /api/loans  – list loans for current user (admin sees all)
router.get('/', async (req, res) => {
  const where = req.user.role === 'ADMIN' ? {} : { userId: req.user.sub };
  const loans = await prisma.loan.findMany({ where, orderBy: { createdAt: 'desc' } });
  res.json(loans);
});

// POST /api/loans  – apply for a loan
router.post('/', async (req, res) => {
  const { amount, purpose, termMonths } = req.body;
  if (!amount || !purpose || !termMonths) {
    return res.status(400).json({ message: 'amount, purpose and termMonths are required' });
  }
  const loan = await prisma.loan.create({
    data: {
      userId: req.user.sub,
      amount: parseFloat(amount),
      purpose,
      termMonths: parseInt(termMonths, 10),
      status: 'PENDING',
    },
  });
  res.status(201).json(loan);
});

// PATCH /api/loans/:id/status  – admin updates status
router.patch('/:id/status', async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin only' });
  }
  const { status } = req.body;
  const allowed = ['PENDING', 'APPROVED', 'REJECTED'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${allowed.join(', ')}` });
  }
  const existing = await prisma.loan.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: 'Loan not found' });
  }
  const loan = await prisma.loan.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(loan);
});

module.exports = router;
