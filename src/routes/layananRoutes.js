const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const layananController = require('../controllers/layananController');
const { authenticateToken } = require('../middlewares/auth');

// Rate limiter for public service request submissions
const pengajuanLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Terlalu banyak pengajuan dari perangkat ini. Silakan coba kembali dalam 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

router.get('/', layananController.getAllLayanan);
router.get('/:id', layananController.getLayananById);
router.post('/pengajuan', pengajuanLimiter, layananController.submitPengajuan); // Public submission

// Admin Protected
router.post('/', authenticateToken, layananController.createLayanan);
router.put('/:id', authenticateToken, layananController.updateLayanan);
router.delete('/:id', authenticateToken, layananController.deleteLayanan);
router.get('/pengajuan/all', authenticateToken, layananController.getAllPengajuan);
router.patch('/pengajuan/:id/status', authenticateToken, layananController.updateStatusPengajuan);

module.exports = router;
