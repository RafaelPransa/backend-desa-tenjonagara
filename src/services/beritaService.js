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

const getAllBerita = async (status = null) => {
  try {
    const where = {};
    if (status) where.status = status;

    return await Berita.findAll({
      where,
      order: [['created_at', 'DESC']],
      include: [{ model: User, as: 'penulis', attributes: ['id', 'nama', 'email'] }]
    });
  } catch (error) {
    // Return fallback sample news if DB is uninitialized
    return [
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
  }
};

const getBeritaBySlug = async (slug) => {
  const berita = await Berita.findOne({
    where: { slug },
    include: [{ model: User, as: 'penulis', attributes: ['id', 'nama', 'email'] }]
  });
  if (!berita) {
    throw { statusCode: 404, message: 'Berita tidak ditemukan.' };
  }
  return berita;
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
