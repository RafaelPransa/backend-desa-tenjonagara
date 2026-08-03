const statistikService = require('../services/statistikService');
const { sendSuccess } = require('../utils/response');

const getStatistik = async (req, res, next) => {
  try {
    const data = await statistikService.getStatistikPenduduk();
    return sendSuccess(res, data, 'Berhasil mendapatkan data statistik penduduk.');
  } catch (error) {
    next(error);
  }
};

const getApbdes = async (req, res, next) => {
  try {
    const data = await statistikService.getApbdes();
    return sendSuccess(res, data, 'Berhasil mendapatkan data APBDES.');
  } catch (error) {
    next(error);
  }
};

const createStatistik = async (req, res, next) => {
  try {
    const newStat = await statistikService.createStatistik(req.body);
    return sendSuccess(res, newStat, 'Data statistik penduduk berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
};

const createApbdes = async (req, res, next) => {
  try {
    const newApbdes = await statistikService.createApbdes(req.body);
    return sendSuccess(res, newApbdes, 'Data APBDES berhasil ditambahkan.', 201);
  } catch (error) {
    next(error);
  }
};

const updateStatistik = async (req, res, next) => {
  try {
    const updated = await statistikService.updateStatistik(req.params.id || 1, req.body);
    return sendSuccess(res, updated, 'Data statistik penduduk berhasil diperbarui.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStatistik,
  getApbdes,
  createStatistik,
  createApbdes,
  updateStatistik
};
