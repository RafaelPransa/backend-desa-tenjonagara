const express = require('express');
const router = express.Router();
const { sendSuccess } = require('../utils/response');

router.get('/health', (req, res) => {
  return sendSuccess(res, {
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Backend API Desa Tenjonagara'
  }, 'API Backend Desa Tenjonagara berjalan dengan normal.');
});

module.exports = router;
