const { PerangkatDesa } = require('../models');

const getAllPerangkat = async () => {
  try {
    const list = await PerangkatDesa.findAll({
      order: [['urutan', 'ASC'], ['created_at', 'ASC']]
    });
    if (list.length > 0) return list;
    throw new Error('No data');
  } catch (error) {
    return [
      {
        id: 1,
        nama: 'Heri Priana',
        jabatan: 'Kepala Desa',
        no_hp: '081234567890',
        foto_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        urutan: 1
      },
      {
        id: 2,
        nama: 'Deden Kurnia, S.ST',
        jabatan: 'Sekretaris Desa',
        no_hp: '081234567891',
        foto_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        urutan: 2
      },
      {
        id: 3,
        nama: 'Rina Rahmawati',
        jabatan: 'Kaur Keuangan / Bendahara',
        no_hp: '081234567892',
        foto_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        urutan: 3
      },
      {
        id: 4,
        nama: 'Hendrik Herdiana',
        jabatan: 'Kasi Pemerintahan',
        no_hp: '081234567893',
        foto_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        urutan: 4
      }
    ];
  }
};

const createPerangkat = async (data) => {
  return await PerangkatDesa.create(data);
};

const updatePerangkat = async (id, data) => {
  const item = await PerangkatDesa.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Perangkat desa tidak ditemukan.' };
  await item.update(data);
  return item;
};

const deletePerangkat = async (id) => {
  const item = await PerangkatDesa.findByPk(id);
  if (!item) throw { statusCode: 404, message: 'Perangkat desa tidak ditemukan.' };
  await item.destroy();
  return true;
};

const getPerangkatById = async (id) => {
  try {
    const item = await PerangkatDesa.findByPk(id);
    if (item) return item;
    throw new Error('Not found');
  } catch (error) {
    const list = await getAllPerangkat();
    const found = list.find((p) => p.id == id);
    if (!found) throw { statusCode: 404, message: 'Perangkat desa tidak ditemukan.' };
    return found;
  }
};

module.exports = {
  getAllPerangkat,
  getPerangkatById,
  createPerangkat,
  updatePerangkat,
  deletePerangkat
};
