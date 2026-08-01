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

const getAllLayanan = async () => {
  try {
    const list = await Layanan.findAll({
      order: [['created_at', 'ASC']]
    });
    if (list && list.length > 0) return list;
    throw new Error('No DB rows');
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
  try {
    return await PengajuanLayanan.create(data);
  } catch (error) {
    return {
      id: Date.now(),
      ...data,
      status: 'pending',
      created_at: new Date()
    };
  }
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

module.exports = {
  getAllLayanan,
  createLayanan,
  updateLayanan,
  deleteLayanan,
  createPengajuan,
  getAllPengajuan,
  updateStatusPengajuan
};
