const express = require('express');
const router = express.Router();
const potensiController = require('../controllers/potensiController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', potensiController.getAll);

// Admin Protected
router.post('/', authenticateToken, potensiController.create);
router.put('/:id', authenticateToken, potensiController.update);
router.delete('/:id', authenticateToken, potensiController.remove);

module.exports = router;
