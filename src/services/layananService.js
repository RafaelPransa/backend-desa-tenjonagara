const { Layanan, PengajuanLayanan } = require('../models');

const mockLayanan = [
  {
    id: 1,
    nama_layanan: 'Surat Keterangan Usaha (SKU)',
    deskripsi: 'Pelayanan penerbitan surat keterangan bagi warga yang memiliki usaha mikro/kecil untuk keperluan perbankan atau legalitas.',
    syarat: '1. Fotokopi KTP Pemohon\n2. Fotokopi Kartu Keluarga\n3. Surat Pengantar dari RT/RW setempat\n4. Foto lokasi tempat usaha'
  },
  {
    id: 2,
    nama_layanan: 'Surat Keterangan Domisili',
    deskripsi: 'Surat bukti tempat tinggal resmi warga di wilayah Desa Tenjonagara.',
    syarat: '1. Fotokopi KTP\n2. Fotokopi KK\n3. Pengantar RT/RW'
  },
  {
    id: 3,
    nama_layanan: 'Surat Keterangan Tidak Mampu (SKTM)',
    deskripsi: 'Surat keterangan bantuan pendidikan/kesehatan untuk keluarga pra-sejahtera.',
    syarat: '1. Fotokopi KTP & KK Pemohon\n2. Surat Pengantar RT/RW dengan stempel\n3. Kartu KIS/BPJS jika ada'
  }
];

const ensureDefaultLayanan = async () => {
  try {
    const count = await Layanan.count();
    if (count === 0) {
      await Layanan.bulkCreate(mockLayanan);
    }
  } catch (e) {
    // console.error('Failed to auto seed layanan', e);
  }
};

const getAllLayanan = async () => {
  try {
    await ensureDefaultLayanan();
    const list = await Layanan.findAll({
      order: [['created_at', 'ASC']]
    });
    if (list && list.length > 0) return list;
    return mockLayanan;
  } catch (error) {
    return mockLayanan;
  }
};

const createLayanan = async (data) => {
  return await Layanan.create(data);
};

const updateLayanan = async (id, data) => {
  const item = await Layanan.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Layanan tidak ditemukan.' };
  await item.update(data);
  return item;
};

const deleteLayanan = async (id) => {
  const item = await Layanan.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Layanan tidak ditemukan.' };
  await item.destroy();
  return true;
};

const createPengajuan = async (data) => {
  if (!data.layanan_id || !data.nama_pemohon || !data.nik) {
    throw { statusCode: 400, message: 'Layanan, nama pemohon, dan NIK wajib diisi.' };
  }
  if (data.nik.length !== 16) {
    throw { statusCode: 400, message: 'NIK harus terdiri dari 16 digit angka.' };
  }

  await ensureDefaultLayanan();

  // Pastikan layanan_id bertipe integer
  const payload = {
    ...data,
    layanan_id: parseInt(data.layanan_id, 10)
  };

  return await PengajuanLayanan.create(payload);
};


const getAllPengajuan = async () => {
  try {
    return await PengajuanLayanan.findAll({
      include: [{ model: Layanan, as: 'layanan', attributes: ['id', 'nama_layanan'] }],
      order: [['created_at', 'DESC']]
    });
  } catch (error) {
    return [];
  }
};

const updateStatusPengajuan = async (id, status) => {
  const pengajuan = await PengajuanLayanan.findByPk(id);
  if (!pengajuan) throw { statusCode: 404, message: 'Pengajuan layanan tidak ditemukan.' };
  await pengajuan.update({ status });
  return pengajuan;
};

const getLayananById = async (id) => {
  try {
    await ensureDefaultLayanan();
    const item = await Layanan.findByPk(id);
    if (item) return item;
    throw new Error('Not found');
  } catch (error) {
    const found = mockLayanan.find((l) => l.id == id);
    if (!found) throw { statusCode: 404, message: 'Layanan tidak ditemukan.' };
    return found;
  }
};

module.exports = {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  deleteLayanan,
  createPengajuan,
  getAllPengajuan,
  updateStatusPengajuan
};
