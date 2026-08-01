'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);

    // 1. Seed admin user
    await queryInterface.bulkInsert('users', [{
      id: 1,
      nama: 'Administrator Desa Tenjonagara',
      email: 'admin@tenjonagara.desa.id',
      password_hash: adminPassword,
      role: 'super_admin',
      created_at: new Date(),
      updated_at: new Date()
    }]);

    // 2. Seed profil_desa
    await queryInterface.bulkInsert('profil_desa', [{
      id: 1,
      sejarah: 'Desa Tenjonagara merupakan salah satu desa di Kecamatan Cigalontang, Kabupaten Tasikmalaya, Jawa Barat. Berada di kawasan perbukitan yang asri dengan mata pencaharian utama masyarakat di bidang pertanian dan perkebunan. Desa ini berdiri sejak puluhan tahun lalu dengan kearifan lokal yang terjaga erat.',
      visi: 'Terwujudnya Desa Tenjonagara yang Mandiri, Sejahtera, Agamis, dan Berbudaya Berbasis Potensi Pertanian dan Ekonomi Kerakyatan.',
      misi: '1. Meningkatkan kualitas pelayanan publik dan transparansi tata kelola pemerintahan desa.\n2. Mengembangkan sarana dan prasarana pertanian serta UMKM desa.\n3. Meningkatkan derajat kesehatan dan pendidikan masyarakat desa.\n4. Memelihara kelestarian lingkungan hidup dan nilai kearifan lokal Sunda.',
      luas_wilayah: '14.52 km²',
      jumlah_dusun: 4,
      jumlah_rt: 22,
      jumlah_rw: 6,
      updated_at: new Date()
    }]);

    // 3. Seed perangkat_desa
    await queryInterface.bulkInsert('perangkat_desa', [
      {
        nama: 'Asep Saepulloh, S.IP',
        jabatan: 'Kepala Desa',
        no_hp: '081234567890',
        foto_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        urutan: 1,
        created_at: new Date()
      },
      {
        nama: 'Deden Kurnia, S.ST',
        jabatan: 'Sekretaris Desa',
        no_hp: '081234567891',
        foto_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        urutan: 2,
        created_at: new Date()
      },
      {
        nama: 'Rina Rahmawati',
        jabatan: 'Kaur Keuangan / Bendahara',
        no_hp: '081234567892',
        foto_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        urutan: 3,
        created_at: new Date()
      },
      {
        nama: 'Hendrik Herdiana',
        jabatan: 'Kasi Pemerintahan',
        no_hp: '081234567893',
        foto_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        urutan: 4,
        created_at: new Date()
      }
    ]);

    // 4. Seed statistik_penduduk
    await queryInterface.bulkInsert('statistik_penduduk', [
      {
        tahun: 2026,
        jumlah_total: 6146,
        jumlah_laki: 3120,
        jumlah_perempuan: 3026,
        jumlah_kk: 2262,
        created_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('statistik_penduduk', null, {});
    await queryInterface.bulkDelete('perangkat_desa', null, {});
    await queryInterface.bulkDelete('profil_desa', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
