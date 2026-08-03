const { StatistikPenduduk, Apbdes } = require('../models');

let inMemoryStatistik = [
  {
    id: 1,
    tahun: 2026,
    jumlah_total: 6146,
    jumlah_laki: 3120,
    jumlah_perempuan: 3026,
    jumlah_kk: 2262,
    rata_anggota_keluarga: 2.7,
    pendidikan: [
      { tingkat: 'SD / Sederajat', jumlah: 2317, persentase: 70.5 },
      { tingkat: 'SMP / Sederajat', jumlah: 587, persentase: 17.9 },
      { tingkat: 'SMA / Sederajat', jumlah: 332, persentase: 10.1 },
      { tingkat: 'Diploma I (D1)', jumlah: 47, persentase: 1.4 },
      { tingkat: 'Sarjana (S1)', jumlah: 5, persentase: 0.15 }
    ]
  }
];

const getStatistikPenduduk = async () => {
  try {
    const data = await StatistikPenduduk.findAll({
      order: [['tahun', 'DESC']]
    });
    if (data.length > 0) {
      return data.map((item) => {
        const plain = item.get ? item.get({ plain: true }) : item;
        const memory = inMemoryStatistik.find((m) => m.id == plain.id) || inMemoryStatistik[0];
        return {
          ...memory,
          ...plain,
          pendidikan: memory.pendidikan || plain.pendidikan,
          rata_anggota_keluarga: memory.rata_anggota_keluarga || plain.rata_anggota_keluarga
        };
      });
    }
    return inMemoryStatistik;
  } catch (error) {
    return inMemoryStatistik;
  }
};

const getApbdes = async () => {
  try {
    const data = await Apbdes.findAll({
      order: [['tahun', 'DESC']]
    });
    if (data.length > 0) return data;
    throw new Error('No data');
  } catch (error) {
    return [
      {
        id: 1,
        tahun: 2026,
        bidang: 'Penyelenggaraan Pemerintahan Desa',
        pagu_anggaran: '450000000.00',
        realisasi: '380000000.00'
      },
      {
        id: 2,
        tahun: 2026,
        bidang: 'Pelaksanaan Pembangunan Desa',
        pagu_anggaran: '680000000.00',
        realisasi: '520000000.00'
      },
      {
        id: 3,
        tahun: 2026,
        bidang: 'Pembinaan & Pemberdayaan Masyarakat',
        pagu_anggaran: '210000000.00',
        realisasi: '175000000.00'
      }
    ];
  }
};

const createStatistik = async (data) => {
  return await StatistikPenduduk.create(data);
};

const createApbdes = async (data) => {
  return await Apbdes.create(data);
};

const updateStatistik = async (id, data) => {
  const targetId = id || 1;
  const index = inMemoryStatistik.findIndex((m) => m.id == targetId);
  const updatedItem = {
    ...(index !== -1 ? inMemoryStatistik[index] : inMemoryStatistik[0]),
    ...data,
    id: targetId
  };

  if (index !== -1) {
    inMemoryStatistik[index] = updatedItem;
  } else {
    inMemoryStatistik[0] = updatedItem;
  }

  try {
    const item = await StatistikPenduduk.findByPk(targetId);
    if (item) {
      await item.update(data);
    }
  } catch (error) {
    // handled by inMemory fallback
  }

  return updatedItem;
};

module.exports = {
  getStatistikPenduduk,
  getApbdes,
  createStatistik,
  createApbdes,
  updateStatistik
};
