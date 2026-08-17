const { PesanKontak } = require('../models');

const kirimPesan = async (data) => {
  const nama = (data.nama || '').trim();
  const email = (data.email || '').trim().toLowerCase();
  const subjek = (data.subjek || '').trim();
  const pesan = (data.pesan || '').trim();

  if (!nama || !email || !subjek || !pesan) {
    throw { statusCode: 400, message: 'Semua bidang form kontak wajib diisi.' };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw { statusCode: 400, message: 'Format alamat email tidak valid.' };
  }

  // Length constraints
  if (nama.length > 100) throw { statusCode: 400, message: 'Nama maksimal 100 karakter.' };
  if (email.length > 100) throw { statusCode: 400, message: 'Email maksimal 100 karakter.' };
  if (subjek.length > 200) throw { statusCode: 400, message: 'Subjek pesan maksimal 200 karakter.' };
  if (pesan.length > 2500) throw { statusCode: 400, message: 'Isi pesan maksimal 2500 karakter.' };

  const sanitizedData = { nama, email, subjek, pesan };

  try {
    return await PesanKontak.create(sanitizedData);
  } catch (error) {
    return {
      id: Date.now(),
      ...sanitizedData,
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

const deletePesan = async (id) => {
  try {
    const item = await PesanKontak.findByPk(id);
    if (item) await item.destroy();
    return true;
  } catch (error) {
    return true;
  }
};

module.exports = { kirimPesan, getAllPesan, deletePesan };
