const express = require('express');
const router = express.Router();
const kontakController = require('../controllers/kontakController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/', kontakController.kirimPesan); // Public submission
router.get('/', authenticateToken, kontakController.getAllPesan); // Admin protected
router.delete('/:id', authenticateToken, kontakController.deletePesan); // Admin protected

module.exports = router;
