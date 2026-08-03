const perangkatService = require('../services/perangkatService');
const { sendSuccess } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const list = await perangkatService.getAllPerangkat();
    return sendSuccess(res, list, 'Berhasil mendapatkan daftar perangkat desa.');
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newItem = await perangkatService.createPerangkat(req.body);
    return sendSuccess(res, newItem, 'Perangkat desa berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await perangkatService.updatePerangkat(req.params.id, req.body);
    return sendSuccess(res, updated, 'Perangkat desa berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await perangkatService.deletePerangkat(req.params.id);
    return sendSuccess(res, null, 'Perangkat desa berhasil dihapus.');
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await perangkatService.getPerangkatById(req.params.id);
    return sendSuccess(res, data, 'Berhasil mendapatkan detail perangkat desa.');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
