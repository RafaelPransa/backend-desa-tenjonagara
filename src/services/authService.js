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

const changePassword = async (userId, currentPassword, newPassword) => {
  if (!currentPassword || !newPassword) {
    throw { statusCode: 400, message: 'Password saat ini dan password baru wajib diisi.' };
  }

  if (newPassword.length < 6) {
    throw { statusCode: 400, message: 'Password baru minimal harus terdiri dari 6 karakter.' };
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw { statusCode: 404, message: 'Akun pengguna tidak ditemukan.' };
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isPasswordValid) {
    throw { statusCode: 400, message: 'Password saat ini yang Anda masukkan salah.' };
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password_hash);
  if (isSamePassword) {
    throw { statusCode: 400, message: 'Password baru tidak boleh sama dengan password lama.' };
  }

  const salt = await bcrypt.genSalt(10);
  const newHash = await bcrypt.hash(newPassword, salt);

  await user.update({ password_hash: newHash });

  return { message: 'Password berhasil diperbarui.' };
};

const updateProfile = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { statusCode: 404, message: 'Akun pengguna tidak ditemukan.' };
  }

  const updates = {};
  if (data.nama && data.nama.trim()) {
    updates.nama = data.nama.trim();
  }
  if (data.email && data.email.trim()) {
    const trimmedEmail = data.email.trim().toLowerCase();
    const existing = await User.findOne({ where: { email: trimmedEmail } });
    if (existing && existing.id !== user.id) {
      throw { statusCode: 400, message: 'Email tersebut sudah digunakan oleh akun lain.' };
    }
    updates.email = trimmedEmail;
  }

  await user.update(updates);

  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role
  };
};

module.exports = { login, changePassword, updateProfile };
