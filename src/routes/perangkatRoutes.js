const express = require('express');
const router = express.Router();
const perangkatController = require('../controllers/perangkatController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', perangkatController.getAll);

// Admin Protected
router.post('/', authenticateToken, perangkatController.create);
router.put('/:id', authenticateToken, perangkatController.update);
router.delete('/:id', authenticateToken, perangkatController.remove);

module.exports = router;
