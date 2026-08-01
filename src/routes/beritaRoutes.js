const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/beritaController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', beritaController.getAll);
router.get('/:slug', beritaController.getBySlug);

// Admin Protected
router.post('/', authenticateToken, beritaController.create);
router.put('/:id', authenticateToken, beritaController.update);
router.delete('/:id', authenticateToken, beritaController.remove);

module.exports = router;
