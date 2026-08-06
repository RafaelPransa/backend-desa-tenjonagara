const { ProfilDesa } = require('../models');

const getProfil = async () => {
  let profil = await ProfilDesa.findOne();
  if (!profil) {
    // Return fallback profile data if database is not seeded yet
    profil = {
      id: 1,
      sejarah: `Desa Tenjonagara berdiri sekitar tahun 2002 sebagai hasil pemekaran dari desa induk untuk meningkatkan efektivitas pemerintahan dan pelayanan kepada masyarakat. Nama "Tenjonagara" berasal dari bahasa Sunda, yaitu "Tenjo" (melihat) dan "Nagara" (negara), yang melambangkan harapan agar desa ini dikenal dan diperhatikan karena potensi yang dimilikinya.

Sebagai desa dengan wilayah terluas di Kecamatan Cigalontang, Tenjonagara memiliki potensi besar di sektor pertanian dan perkebunan yang menjadi tulang punggung perekonomian masyarakat. Seiring perkembangannya, berbagai program pembangunan dan pemberdayaan masyarakat terus dilakukan, mulai dari peningkatan infrastruktur, pengembangan pertanian, peternakan, hingga ekonomi kreatif berbasis desa.

Kini, Desa Tenjonagara dikenal sebagai desa yang mandiri, aktif, dan progresif, dengan masyarakat yang menjunjung tinggi semangat gotong royong, melestarikan nilai-nilai budaya, serta terbuka terhadap inovasi demi mewujudkan kemajuan yang berkelanjutan.`,
      visi: 'Mewujudkan Desa Tenjonagara yang lebih maju berprestasi, berbudaya dan kreatif melalui peningkatan sumber daya manusia, kemampuan ekonomi dan kepedulian sosial masyarakat dan pemantapan pembangunan di berbagai bidang berlandaskan religius, kultural dan budaya daerah.',
      misi: '1. Meningkatkan profesionalisme pelayanan publik. \n2. Meningkatkan kualitas sumber daya manusia bagi aparatur pemerintah desa. \n3. Meningkatkan pembangunan fisik dan nonfisik di berbagai bidang. \n4. Meningkatkan ketersediaan dan kualitas insfrastruktur pemerintahan desa. \n5. Meningkatkan partisipasi swadaya masyarakat dan sektor swasta dalam kegiatan pembangunan dan kegiatan kemsyarakatan desa. \n6. Menggali potensi potensi desa dalam rangka peningkatan pendapatan asli daerah.',
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
