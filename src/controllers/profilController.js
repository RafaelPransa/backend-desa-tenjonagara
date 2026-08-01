const profilService = require('../services/profilService');
const { sendSuccess } = require('../utils/response');

const getProfil = async (req, res, next) => {
  try {
    const data = await profilService.getProfil();
    return sendSuccess(res, data, 'Berhasil mendapatkan data profil desa.');
  } catch (error) {
    next(error);
  }
};

const updateProfil = async (req, res, next) => {
  try {
    const data = await profilService.updateProfil(req.body);
    return sendSuccess(res, data, 'Berhasil memperbarui profil desa.');
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfil, updateProfil };
