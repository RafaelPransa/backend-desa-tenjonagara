'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. users
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('admin', 'super_admin'), defaultValue: 'admin' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 2. profil_desa
    await queryInterface.createTable('profil_desa', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      sejarah: { type: Sequelize.TEXT },
      visi: { type: Sequelize.TEXT },
      misi: { type: Sequelize.TEXT },
      luas_wilayah: { type: Sequelize.STRING },
      jumlah_dusun: { type: Sequelize.INTEGER, defaultValue: 0 },
      jumlah_rt: { type: Sequelize.INTEGER, defaultValue: 0 },
      jumlah_rw: { type: Sequelize.INTEGER, defaultValue: 0 },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 3. berita
    await queryInterface.createTable('berita', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      judul: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      konten: { type: Sequelize.TEXT, allowNull: false },
      gambar_url: { type: Sequelize.STRING },
      penulis_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      status: { type: Sequelize.ENUM('draft', 'published'), defaultValue: 'published' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 4. potensi_desa
    await queryInterface.createTable('potensi_desa', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      kategori: { type: Sequelize.ENUM('pertanian', 'umkm', 'wisata'), allowNull: false },
      nama: { type: Sequelize.STRING, allowNull: false },
      deskripsi: { type: Sequelize.TEXT, allowNull: false },
      gambar_url: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 5. layanan
    await queryInterface.createTable('layanan', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nama_layanan: { type: Sequelize.STRING, allowNull: false },
      deskripsi: { type: Sequelize.TEXT, allowNull: false },
      syarat: { type: Sequelize.TEXT, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 6. pengajuan_layanan
    await queryInterface.createTable('pengajuan_layanan', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      layanan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'layanan', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nama_pemohon: { type: Sequelize.STRING, allowNull: false },
      nik: { type: Sequelize.STRING(16), allowNull: false },
      keterangan: { type: Sequelize.TEXT },
      dokumen_url: { type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('pending', 'diproses', 'selesai'), defaultValue: 'pending' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 7. statistik_penduduk
    await queryInterface.createTable('statistik_penduduk', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      tahun: { type: Sequelize.INTEGER, allowNull: false },
      jumlah_total: { type: Sequelize.INTEGER, allowNull: false },
      jumlah_laki: { type: Sequelize.INTEGER, allowNull: false },
      jumlah_perempuan: { type: Sequelize.INTEGER, allowNull: false },
      jumlah_kk: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 8. apbdes
    await queryInterface.createTable('apbdes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      tahun: { type: Sequelize.INTEGER, allowNull: false },
      bidang: { type: Sequelize.STRING, allowNull: false },
      pagu_anggaran: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
      realisasi: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 9. pesan_kontak
    await queryInterface.createTable('pesan_kontak', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nama: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      subjek: { type: Sequelize.STRING, allowNull: false },
      pesan: { type: Sequelize.TEXT, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    // 10. perangkat_desa
    await queryInterface.createTable('perangkat_desa', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nama: { type: Sequelize.STRING, allowNull: false },
      jabatan: { type: Sequelize.STRING, allowNull: false },
      no_hp: { type: Sequelize.STRING },
      foto_url: { type: Sequelize.STRING },
      urutan: { type: Sequelize.INTEGER, defaultValue: 1 },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('perangkat_desa');
    await queryInterface.dropTable('pesan_kontak');
    await queryInterface.dropTable('apbdes');
    await queryInterface.dropTable('statistik_penduduk');
    await queryInterface.dropTable('pengajuan_layanan');
    await queryInterface.dropTable('layanan');
    await queryInterface.dropTable('potensi_desa');
    await queryInterface.dropTable('berita');
    await queryInterface.dropTable('profil_desa');
    await queryInterface.dropTable('users');
  }
};
