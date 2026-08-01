const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', profilController.getProfil);
router.put('/', authenticateToken, profilController.updateProfil);

module.exports = router;
