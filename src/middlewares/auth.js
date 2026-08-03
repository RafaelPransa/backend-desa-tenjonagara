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

    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_tenjonagara_2026';
    const decoded = jwt.verify(token, secret);

    let user = null;
    try {
      user = await User.findByPk(decoded.id);
    } catch (e) {
      // Ignore DB query errors in fallback mode
    }

    req.user = user || {
      id: decoded.id || 1,
      email: decoded.email || 'admin@tenjonagara.desa.id',
      role: decoded.role || 'admin',
      nama: decoded.nama || 'Admin Desa'
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
