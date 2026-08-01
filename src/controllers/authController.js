const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, 'Email dan password wajib diisi.', 400);
    }
    const result = await authService.login(email, password);
    return sendSuccess(res, result, 'Login berhasil.');
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, {
      id: req.user.id,
      nama: req.user.nama,
      email: req.user.email,
      role: req.user.role
    }, 'Data profil pengguna.');
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe };
