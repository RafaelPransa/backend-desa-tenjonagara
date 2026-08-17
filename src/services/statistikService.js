const { StatistikPenduduk, Apbdes } = require('../models');

let inMemoryStatistik = [
  {
    id: 1,
    tahun: 2026,
    jumlah_total: 7312,
    jumlah_laki: 3835,
    jumlah_perempuan: 3477,
    jumlah_kk: 2553,
    rata_anggota_keluarga: 2.86,
    pendidikan: [
      { tingkat: 'Tidak/Belum sekolah', jumlah: 1306, persentase: 17.86 },
      { tingkat: 'Belum Tamat SD/Sederajat', jumlah: 757, persentase: 10.35 },
      { tingkat: 'Tamat SD/Sederajat', jumlah: 2871, persentase: 39.26 },
      { tingkat: 'Tamat SMP/Sederajat', jumlah: 1141, persentase: 15.60 },
      { tingkat: 'Tamat SLTA/Sederajat', jumlah: 986, persentase: 13.48 },
      { tingkat: 'Tamat Diploma I-II', jumlah: 9, persentase: 0.12 },
      { tingkat: 'Tamat Diploma III', jumlah: 19, persentase: 0.26 },
      { tingkat: 'Tamat S1/D-IV', jumlah: 111, persentase: 1.52 },
      { tingkat: 'Tamat S2', jumlah: 10, persentase: 0.14 }
    ],
    pekerjaan: [
      { pekerjaan: 'Mengurus Rumah Tangga', jumlah: 1925, persentase: 26.33 },
      { pekerjaan: 'Belum/Tidak Bekerja', jumlah: 1466, persentase: 20.05 },
      { pekerjaan: 'Pelajar/Mahasiswa', jumlah: 1353, persentase: 18.50 },
      { pekerjaan: 'Buruh Harian Lepas', jumlah: 1281, persentase: 17.52 },
      { pekerjaan: 'Wiraswasta', jumlah: 600, persentase: 8.21 },
      { pekerjaan: 'Petani / Pekebun', jumlah: 210, persentase: 2.87 },
      { pekerjaan: 'Pedagang', jumlah: 147, persentase: 2.01 },
      { pekerjaan: 'Karyawan Swasta', jumlah: 64, persentase: 0.88 },
      { pekerjaan: 'Buruh Tani / Perkebunan', jumlah: 34, persentase: 0.46 },
      { pekerjaan: 'Karyawan Honorer', jumlah: 27, persentase: 0.37 },
      { pekerjaan: 'Pensiunan', jumlah: 26, persentase: 0.36 },
      { pekerjaan: 'PNS', jumlah: 21, persentase: 0.29 },
      { pekerjaan: 'Guru', jumlah: 19, persentase: 0.26 },
      { pekerjaan: 'Bidan', jumlah: 5, persentase: 0.07 },
      { pekerjaan: 'Tukang Cukur', jumlah: 5, persentase: 0.07 },
      { pekerjaan: 'Sopir', jumlah: 4, persentase: 0.05 },
      { pekerjaan: 'Perdagangan', jumlah: 4, persentase: 0.05 },
      { pekerjaan: 'Karyawan BUMN', jumlah: 3, persentase: 0.04 },
      { pekerjaan: 'Perangkat Desa', jumlah: 3, persentase: 0.04 },
      { pekerjaan: 'Dokter', jumlah: 2, persentase: 0.03 },
      { pekerjaan: 'Perawat', jumlah: 2, persentase: 0.03 },
      { pekerjaan: 'POLRI', jumlah: 2, persentase: 0.03 },
      { pekerjaan: 'Ustadz / Mubaligh', jumlah: 2, persentase: 0.03 },
      { pekerjaan: 'TNI', jumlah: 1, persentase: 0.01 },
      { pekerjaan: 'Kepala Desa', jumlah: 1, persentase: 0.01 },
      { pekerjaan: 'Penata Rias', jumlah: 1, persentase: 0.01 },
      { pekerjaan: 'Konstruksi', jumlah: 1, persentase: 0.01 },
      { pekerjaan: 'Pekerjaan Lainnya', jumlah: 1, persentase: 0.01 }
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
          pekerjaan: memory.pekerjaan || plain.pekerjaan,
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
