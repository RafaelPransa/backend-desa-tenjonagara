const { ProfilDesa } = require('../models');

const getProfil = async () => {
  let profil = await ProfilDesa.findOne();
  if (!profil) {
    // Return fallback profile data if database is not seeded yet
    profil = {
      id: 1,
      sejarah: 'Desa Tenjonagara merupakan salah satu desa di Kecamatan Cigalontang, Kabupaten Tasikmalaya, Jawa Barat.',
      visi: 'Terwujudnya Desa Tenjonagara yang Mandiri, Sejahtera, Agamis, dan Berbudaya Berbasis Potensi Pertanian dan Ekonomi Kerakyatan.',
      misi: '1. Meningkatkan kualitas pelayanan publik dan transparansi tata kelola pemerintahan desa.\n2. Mengembangkan sarana dan prasarana pertanian serta UMKM desa.',
      luas_wilayah: '14.52 km²',
      jumlah_dusun: 4,
      jumlah_rt: 22,
      jumlah_rw: 6
    };
  }
  return profil;
};

const updateProfil = async (data) => {
  let profil = await ProfilDesa.findOne();
  if (profil) {
    await profil.update(data);
  } else {
    profil = await ProfilDesa.create(data);
  }
  return profil;
};

module.exports = { getProfil, updateProfil };
