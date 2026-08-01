const { BangunanDesa } = require('../models');

const mockBangunan = [
  {
    id: 1,
    nama: 'Kantor Desa Tenjonagara',
    slug: 'kantor-desa-tenjonagara',
    kategori: 'pemerintahan',
    deskripsi: 'Pusat pelayanan administrasi publik dan balai musyawarah warga Desa Tenjonagara, Kecamatan Cigalontang. Gedung ini dilengkapi dengan aula serbaguna, ruang pelayanan publik, dan kantor perangkat desa.',
    alamat: 'Jl. Raya Cigalontang No. 1, Dusun 1, Desa Tenjonagara, Kec. Cigalontang, Kab. Tasikmalaya, Jawa Barat 46463',
    maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.324912384917!2d108.064512345!3d-7.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f56789abcdef%3A0x123456789abcdef!2sCigalontang%2C%20Tasikmalaya%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
    gambar_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    nama: 'SDN UNARA (SDN Tenjonagara)',
    slug: 'sdn-unara-sdn-tenjonagara',
    kategori: 'pendidikan',
    deskripsi: 'SDN UNARA merupakan sekolah dasar negeri yang terletak di Kp. Unara, Desa Tenjonagara, Kecamatan Cigalontang, Kabupaten Tasikmalaya, Jawa Barat. Sekolah ini menjadi sarana pendidikan dasar utama generasi penerus desa.',
    alamat: 'Kp. Unara, RT 04 / RW 02, Desa Tenjonagara, Kec. Cigalontang, Kab. Tasikmalaya',
    maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.324912384917!2d108.064512345!3d-7.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f56789abcdef%3A0x123456789abcdef!2sCigalontang%2C%20Tasikmalaya%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
    gambar_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    nama: 'Poskesdes & Posyandu Utama Tenjonagara',
    slug: 'poskesdes-posyandu-utama-tenjonagara',
    kategori: 'kesehatan',
    deskripsi: 'Pusat Kesehatan Desa (Poskesdes) pelaksana pelayanan kesehatan tingkat dasar, imunisasi bayi, pemeriksaan ibu hamil, dan pemeriksaan kesehatan lansia gratis bagi warga desa.',
    alamat: 'Jl. Desa Tenjonagara No. 12, RT 02 / RW 01, Desa Tenjonagara, Kec. Cigalontang',
    maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.324912384917!2d108.064512345!3d-7.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f56789abcdef%3A0x123456789abcdef!2sCigalontang%2C%20Tasikmalaya%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
    gambar_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    nama: 'Masjid Jami At-Taqwa Tenjonagara',
    slug: 'masjid-jami-at-taqwa-tenjonagara',
    kategori: 'keagamaan',
    deskripsi: 'Masjid agung pusat peribadatan dan kegiatan keagamaan Islam warga Desa Tenjonagara. Menjadi sarana pengajian rutin, peringatan hari besar Islam, dan aktivitas sosial keagamaan.',
    alamat: 'Dusun 2, RT 08 / RW 03, Desa Tenjonagara, Kec. Cigalontang',
    maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.324912384917!2d108.064512345!3d-7.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f56789abcdef%3A0x123456789abcdef!2sCigalontang%2C%20Tasikmalaya%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
    gambar_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    nama: 'Gedung Koperasi & Pasar Desa Tenjonagara',
    slug: 'gedung-koperasi-pasar-desa-tenjonagara',
    kategori: 'ekonomi_sosial',
    deskripsi: 'Pusat transaksi ekonomi mikro warga desa, tempat pemasaran produk pertanian lokal, kopi olahan Cigalontang, dan kebutuhan sembako warga sehari-hari.',
    alamat: 'Jl. Pasar Desa Tenjonagara, Dusun 3, RT 12 / RW 04, Desa Tenjonagara',
    maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.324912384917!2d108.064512345!3d-7.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f56789abcdef%3A0x123456789abcdef!2sCigalontang%2C%20Tasikmalaya%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
    gambar_url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80'
  }
];

const getAllBangunan = async (kategori = null) => {
  try {
    const where = {};
    if (kategori) where.kategori = kategori;
    const list = await BangunanDesa.findAll({
      where,
      order: [['created_at', 'ASC']]
    });
    if (list.length > 0) return list;
    throw new Error('No DB data');
  } catch (error) {
    if (kategori) {
      return mockBangunan.filter((b) => b.kategori === kategori);
    }
    return mockBangunan;
  }
};

const getBangunanById = async (id) => {
  try {
    const bangunan = await BangunanDesa.findByPk(id);
    if (bangunan) return bangunan;
    throw new Error('Not found');
  } catch (error) {
    const found = mockBangunan.find((b) => b.id === parseInt(id));
    if (!found) throw { statusCode: 404, message: 'Bangunan desa tidak ditemukan.' };
    return found;
  }
};

const createBangunan = async (data) => {
  const slug = data.nama.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
  return await BangunanDesa.create({ ...data, slug });
};

const updateBangunan = async (id, data) => {
  const item = await BangunanDesa.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Bangunan desa tidak ditemukan.' };
  await item.update(data);
  return item;
};

const deleteBangunan = async (id) => {
  const item = await BangunanDesa.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Bangunan desa tidak ditemukan.' };
  await item.destroy();
  return true;
};

module.exports = {
  getAllBangunan,
  getBangunanById,
  createBangunan,
  updateBangunan,
  deleteBangunan
};
