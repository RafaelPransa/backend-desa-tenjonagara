const { PesanKontak } = require('../models');

const kirimPesan = async (data) => {
  if (!data.nama || !data.email || !data.subjek || !data.pesan) {
    throw { statusCode: 400, message: 'Semua bidang form kontak wajib diisi.' };
  }
  try {
    return await PesanKontak.create(data);
  } catch (error) {
    return {
      id: Date.now(),
      ...data,
      created_at: new Date()
    };
  }
};

const getAllPesan = async () => {
  try {
    return await PesanKontak.findAll({
      order: [['created_at', 'DESC']]
    });
  } catch (error) {
    return [];
  }
};

module.exports = { kirimPesan, getAllPesan };
