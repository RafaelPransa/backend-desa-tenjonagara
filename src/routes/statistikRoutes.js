const express = require('express');
const router = express.Router();
const statistikController = require('../controllers/statistikController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/penduduk', statistikController.getStatistik);
router.get('/apbdes', statistikController.getApbdes);

// Admin Protected
router.post('/penduduk', authenticateToken, statistikController.createStatistik);
router.put('/penduduk', authenticateToken, statistikController.updateStatistik);
router.put('/penduduk/:id', authenticateToken, statistikController.updateStatistik);
router.post('/apbdes', authenticateToken, statistikController.createApbdes);

module.exports = router;
