const express = require('express');
const router = express.Router();
const layananController = require('../controllers/layananController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', layananController.getAllLayanan);
router.post('/pengajuan', layananController.submitPengajuan); // Public submission

// Admin Protected
router.post('/', authenticateToken, layananController.createLayanan);
router.put('/:id', authenticateToken, layananController.updateLayanan);
router.delete('/:id', authenticateToken, layananController.deleteLayanan);
router.get('/pengajuan/all', authenticateToken, layananController.getAllPengajuan);
router.patch('/pengajuan/:id/status', authenticateToken, layananController.updateStatusPengajuan);

module.exports = router;
