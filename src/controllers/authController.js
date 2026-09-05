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

const changePassword = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;
    const result = await authService.changePassword(
      req.user.id,
      current_password,
      new_password
    );
    return sendSuccess(res, result, 'Password berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const result = await authService.updateProfile(req.user.id, req.body);
    return sendSuccess(res, result, 'Profil pengguna berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, changePassword, updateProfile };
