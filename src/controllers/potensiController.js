const potensiService = require('../services/potensiService');
const { sendSuccess } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const { kategori } = req.query;
    const data = await potensiService.getAllPotensi(kategori);
    return sendSuccess(res, data, 'Berhasil mendapatkan daftar potensi desa.');
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newItem = await potensiService.createPotensi(req.body);
    return sendSuccess(res, newItem, 'Potensi desa berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await potensiService.updatePotensi(req.params.id, req.body);
    return sendSuccess(res, updated, 'Potensi desa berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await potensiService.deletePotensi(req.params.id);
    return sendSuccess(res, null, 'Potensi desa berhasil dihapus.');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, create, update, remove };
