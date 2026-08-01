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

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return sendError(res, 'Pengguna tidak valid atau telah dihapus.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Sesi telah berakhir. Silakan login kembali.', 401);
    }
    return sendError(res, 'Token otentikasi tidak valid.', 403);
  }
};

module.exports = { authenticateToken };
