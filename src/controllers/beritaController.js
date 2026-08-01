const beritaService = require('../services/beritaService');
const { sendSuccess } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const data = await beritaService.getAllBerita(status);
    return sendSuccess(res, data, 'Berhasil mendapatkan daftar berita.');
  } catch (error) {
    next(error);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const data = await beritaService.getBeritaBySlug(slug);
    return sendSuccess(res, data, 'Berhasil mendapatkan detail berita.');
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newBerita = await beritaService.createBerita(req.body, req.user ? req.user.id : 1);
    return sendSuccess(res, newBerita, 'Berita berhasil dibuat.', 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await beritaService.updateBerita(req.params.id, req.body);
    return sendSuccess(res, updated, 'Berita berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await beritaService.deleteBerita(req.params.id);
    return sendSuccess(res, null, 'Berita berhasil dihapus.');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getBySlug, create, update, remove };
