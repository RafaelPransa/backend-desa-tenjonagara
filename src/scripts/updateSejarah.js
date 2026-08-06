const { ProfilDesa } = require('../models');

async function main() {
  try {
    let p = await ProfilDesa.findOne();
    const newSejarah = `Desa Tenjonagara berdiri sekitar tahun 2002 sebagai hasil pemekaran dari desa induk untuk meningkatkan efektivitas pemerintahan dan pelayanan kepada masyarakat. Nama "Tenjonagara" berasal dari bahasa Sunda, yaitu "Tenjo" (melihat) dan "Nagara" (negara), yang melambangkan harapan agar desa ini dikenal dan diperhatikan karena potensi yang dimilikinya.

Sebagai desa dengan wilayah terluas di Kecamatan Cigalontang, Tenjonagara memiliki potensi besar di sektor pertanian dan perkebunan yang menjadi tulang punggung perekonomian masyarakat. Seiring perkembangannya, berbagai program pembangunan dan pemberdayaan masyarakat terus dilakukan, mulai dari peningkatan infrastruktur, pengembangan pertanian, peternakan, hingga ekonomi kreatif berbasis desa.

Kini, Desa Tenjonagara dikenal sebagai desa yang mandiri, aktif, dan progresif, dengan masyarakat yang menjunjung tinggi semangat gotong royong, melestarikan nilai-nilai budaya, serta terbuka terhadap inovasi demi mewujudkan kemajuan yang berkelanjutan.`;

    if (p) {
      await p.update({ sejarah: newSejarah });
      console.log('Successfully updated sejarah in MySQL database!');
    } else {
      await ProfilDesa.create({ sejarah: newSejarah });
      console.log('Created new profil record with updated sejarah!');
    }
  } catch (e) {
    console.error('Error updating sejarah:', e);
  } finally {
    process.exit(0);
  }
}

main();
