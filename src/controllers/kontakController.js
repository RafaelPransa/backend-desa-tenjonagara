const kontakService = require('../services/kontakService');
const { sendSuccess } = require('../utils/response');

const kirimPesan = async (req, res, next) => {
  try {
    const result = await kontakService.kirimPesan(req.body);
    return sendSuccess(res, result, 'Pesan Anda berhasil dikirim. Terima kasih!', 201);
  } catch (error) {
    next(error);
  }
};

const getAllPesan = async (req, res, next) => {
  try {
    const list = await kontakService.getAllPesan();
    return sendSuccess(res, list, 'Berhasil mendapatkan daftar pesan kontak.');
  } catch (error) {
    next(error);
  }
};

const deletePesan = async (req, res, next) => {
  try {
    await kontakService.deletePesan(req.params.id);
    return sendSuccess(res, null, 'Pesan kontak berhasil dihapus.');
  } catch (error) {
    next(error);
  }
};

module.exports = { kirimPesan, getAllPesan, deletePesan };
