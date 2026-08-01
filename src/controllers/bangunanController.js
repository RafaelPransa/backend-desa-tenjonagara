const bangunanService = require('../services/bangunanService');
const { sendSuccess } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const { kategori } = req.query;
    const list = await bangunanService.getAllBangunan(kategori);
    return sendSuccess(res, list, 'Berhasil mendapatkan daftar bangunan desa.');
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await bangunanService.getBangunanById(req.params.id);
    return sendSuccess(res, data, 'Berhasil mendapatkan detail bangunan desa.');
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newItem = await bangunanService.createBangunan(req.body);
    return sendSuccess(res, newItem, 'Bangunan desa berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await bangunanService.updateBangunan(req.params.id, req.body);
    return sendSuccess(res, updated, 'Data bangunan desa berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await bangunanService.deleteBangunan(req.params.id);
    return sendSuccess(res, null, 'Bangunan desa berhasil dihapus.');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
