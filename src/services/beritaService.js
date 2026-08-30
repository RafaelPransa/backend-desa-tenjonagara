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

    const list = await Berita.findAll({
      where,
      order: [['created_at', 'DESC']],
      include: [{ model: User, as: 'penulis', attributes: ['id', 'nama', 'email'] }]
    });
    return list || [];
  } catch (error) {
    console.error('Error fetching berita from database:', error);
    return [];
  }
};

const getBeritaBySlug = async (slug) => {
  const isNum = !isNaN(slug) && !isNaN(parseFloat(slug));
  const where = isNum ? { id: parseInt(slug, 10) } : { slug };

  const berita = await Berita.findOne({
    where,
    include: [{ model: User, as: 'penulis', attributes: ['id', 'nama', 'email'] }]
  });
  if (!berita) throw { statusCode: 404, message: 'Berita tidak ditemukan.' };
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
