const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const kontakController = require('../controllers/kontakController');
const { authenticateToken } = require('../middlewares/auth');

// Rate limiting for sending contact messages (max 5 messages per 15 minutes per IP)
const kontakLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Terlalu banyak pesan terkirim dari perangkat ini. Silakan coba kembali dalam 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

router.post('/', kontakLimiter, kontakController.kirimPesan); // Public submission
router.get('/', authenticateToken, kontakController.getAllPesan); // Admin protected
router.delete('/:id', authenticateToken, kontakController.deletePesan); // Admin protected

module.exports = router;
