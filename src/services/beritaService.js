const { Berita, User } = require('../models');

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const mockBerita = [
  {
    id: 1,
    judul: 'Pelatihan Kewirausahaan UMKM Pemuda Desa Tenjonagara',
    slug: 'pelatihan-kewirausahaan-umkm-pemuda-desa-tenjonagara',
    konten: 'Pemerintah Desa Tenjonagara menggelar pelatihan digital marketing dan pengemasan produk UMKM lokal bagi generasi muda. Kegiatan ini diikuti oleh 40 peserta dari perwakilan karang taruna setiap dusun.',
    gambar_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    created_at: new Date(),
    penulis: { nama: 'Admin Desa Tenjonagara' }
  },
  {
    id: 2,
    judul: 'Kerja Bakti Masal Pembersihan Saluran Irigasi Sawah Dusun 1',
    slug: 'kerja-bakti-masal-pembersihan-saluran-irigasi-sawah-dusun-1',
    konten: 'Antusiasme warga dalam memperlancar pasokan air menjelang musim tanam padi tercermin dari tingginya partisipasi dalam kerja bakti pembersihan gorong-gorong sawah.',
    gambar_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    created_at: new Date(),
    penulis: { nama: 'Admin Desa Tenjonagara' }
  }
];

const getAllBerita = async (status = null) => {
  try {
    const where = {};
    if (status) where.status = status;

    const list = await Berita.findAll({
      where,
      order: [['created_at', 'DESC']],
      include: [{ model: User, as: 'penulis', attributes: ['id', 'nama', 'email'] }]
    });
    if (list && list.length > 0) return list;
    throw new Error('No DB rows');
  } catch (error) {
    if (status) {
      return mockBerita.filter((b) => b.status === status);
    }
    return mockBerita;
  }
};

const getBeritaBySlug = async (slug) => {
  try {
    const isNum = !isNaN(slug) && !isNaN(parseFloat(slug));
    const where = isNum ? { id: parseInt(slug, 10) } : { slug };

    const berita = await Berita.findOne({
      where,
      include: [{ model: User, as: 'penulis', attributes: ['id', 'nama', 'email'] }]
    });
    if (berita) return berita;
    throw new Error('Not found');
  } catch (error) {
    const found = mockBerita.find((b) => b.slug === slug || b.id == slug);
    if (!found) throw { statusCode: 404, message: 'Berita tidak ditemukan.' };
    return found;
  }
};

const createBerita = async (data, penulis_id) => {
  const slug = generateSlug(data.judul) + '-' + Date.now().toString().slice(-4);
  const newBerita = await Berita.create({
    ...data,
    slug,
    penulis_id
  });
  return newBerita;
};

const updateBerita = async (id, data) => {
  const berita = await Berita.findByPk(id);
  if (!berita) throw { statusCode: 404, message: 'Berita tidak ditemukan.' };

  if (data.judul && data.judul !== berita.judul) {
    data.slug = generateSlug(data.judul) + '-' + Date.now().toString().slice(-4);
  }

  await berita.update(data);
  return berita;
};

const deleteBerita = async (id) => {
  const berita = await Berita.findByPk(id);
  if (!berita) throw { statusCode: 404, message: 'Berita tidak ditemukan.' };
  await berita.destroy();
  return true;
};

module.exports = {
  getAllBerita,
  getBeritaBySlug,
  createBerita,
  updateBerita,
  deleteBerita
};
