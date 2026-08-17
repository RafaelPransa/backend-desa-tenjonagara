const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { statusCode: 400, message: 'Email atau password salah.' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw { statusCode: 400, message: 'Email atau password salah.' };
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw { statusCode: 500, message: 'Konfigurasi keamanan server (JWT_SECRET) belum diatur.' };
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn }
  );

  return {
    user: {
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role
    },
    token
  };
};

module.exports = { login };
