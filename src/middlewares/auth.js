const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return sendError(res, 'Akses ditolak. Token otentikasi tidak ditemukan.', 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('CRITICAL: JWT_SECRET environment variable is not defined!');
      return sendError(res, 'Konfigurasi keamanan server belum lengkap.', 500);
    }

    const decoded = jwt.verify(token, secret);

    let user = null;
    try {
      user = await User.findByPk(decoded.id);
    } catch (e) {
      // Database might be in decoupled/fallback mode
    }

    req.user = user || {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      nama: decoded.nama || 'Pengguna'
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Sesi telah berakhir. Silakan login kembali.', 401);
    }
    return sendError(res, 'Token otentikasi tidak valid. Silakan login ulang.', 403);
  }
};

module.exports = { authenticateToken };
