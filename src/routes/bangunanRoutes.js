const express = require('express');
const router = express.Router();
const bangunanController = require('../controllers/bangunanController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', bangunanController.getAll);
router.get('/:id', bangunanController.getById);

// Admin Protected Routes
router.post('/', authenticateToken, bangunanController.create);
router.put('/:id', authenticateToken, bangunanController.update);
router.delete('/:id', authenticateToken, bangunanController.remove);

module.exports = router;
