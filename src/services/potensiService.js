const { PotensiDesa } = require('../models');

const mockPotensi = [
  {
    id: 1,
    kategori: 'pertanian',
    nama: 'Perkebunan Teh & Padi Sawah Organik',
    deskripsi: 'Komoditas utama Desa Tenjonagara dengan hasil panen padi berkualitas tinggi serta perkebunan teh produktif di lereng Cigalontang.',
    gambar_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    kategori: 'umkm',
    nama: 'Kerajinan Olahan Kopi & Makanan Olahan Singkong',
    deskripsi: 'Kelompok tani dan warga memproduksi kopi olahan asli Cigalontang dan aneka olahan singkong bernilai jual tinggi.',
    gambar_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    kategori: 'wisata',
    nama: 'Wisata Alam & Camping Ground Curug Tenjonagara',
    deskripsi: 'Destinasi wisata panorama alam pegunungan, udara sejuk, dan aliran sungai jernih yang alami.',
    gambar_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  }
];

const getAllPotensi = async (kategori = null) => {
  try {
    const where = {};
    if (kategori) where.kategori = kategori;

    const list = await PotensiDesa.findAll({
      where,
      order: [['created_at', 'DESC']]
    });
    if (list && list.length > 0) return list;
    throw new Error('No DB rows');
  } catch (error) {
    if (kategori) {
      return mockPotensi.filter((item) => item.kategori === kategori);
    }
    return mockPotensi;
  }
};

const createPotensi = async (data) => {
  return await PotensiDesa.create(data);
};

const updatePotensi = async (id, data) => {
  const item = await PotensiDesa.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Potensi desa tidak ditemukan.' };
  await item.update(data);
  return item;
};

const deletePotensi = async (id) => {
  const item = await PotensiDesa.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Potensi desa tidak ditemukan.' };
  await item.destroy();
  return true;
};

module.exports = {
  getAllPotensi,
  createPotensi,
  updatePotensi,
  deletePotensi
};
