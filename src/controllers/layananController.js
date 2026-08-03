const layananService = require('../services/layananService');
const { sendSuccess } = require('../utils/response');

const getAllLayanan = async (req, res, next) => {
  try {
    const data = await layananService.getAllLayanan();
    return sendSuccess(res, data, 'Berhasil mendapatkan daftar layanan.');
  } catch (error) {
    next(error);
  }
};

const createLayanan = async (req, res, next) => {
  try {
    const newItem = await layananService.createLayanan(req.body);
    return sendSuccess(res, newItem, 'Layanan berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
};

const updateLayanan = async (req, res, next) => {
  try {
    const updated = await layananService.updateLayanan(req.params.id, req.body);
    return sendSuccess(res, updated, 'Layanan berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

const deleteLayanan = async (req, res, next) => {
  try {
    await layananService.deleteLayanan(req.params.id);
    return sendSuccess(res, null, 'Layanan berhasil dihapus.');
  } catch (error) {
    next(error);
  }
};

const submitPengajuan = async (req, res, next) => {
  try {
    const pengajuan = await layananService.createPengajuan(req.body);
    return sendSuccess(res, pengajuan, 'Pengajuan layanan berhasil dikirim.', 201);
  } catch (error) {
    next(error);
  }
};

const getAllPengajuan = async (req, res, next) => {
  try {
    const list = await layananService.getAllPengajuan();
    return sendSuccess(res, list, 'Berhasil mendapatkan daftar pengajuan layanan.');
  } catch (error) {
    next(error);
  }
};

const updateStatusPengajuan = async (req, res, next) => {
  try {
    const updated = await layananService.updateStatusPengajuan(req.params.id, req.body.status);
    return sendSuccess(res, updated, 'Status pengajuan layanan berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

const getLayananById = async (req, res, next) => {
  try {
    const data = await layananService.getLayananById(req.params.id);
    return sendSuccess(res, data, 'Berhasil mendapatkan detail layanan.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  deleteLayanan,
  submitPengajuan,
  getAllPengajuan,
  updateStatusPengajuan
};
