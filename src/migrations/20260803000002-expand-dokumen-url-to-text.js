'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ubah dokumen_url dari VARCHAR(255) menjadi TEXT
    // supaya bisa menampung JSON array URL dokumen persyaratan yang panjang
    await queryInterface.changeColumn('pengajuan_layanan', 'dokumen_url', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback kembali ke VARCHAR(255) (jika perlu)
    await queryInterface.changeColumn('pengajuan_layanan', 'dokumen_url', {
      type: Sequelize.STRING(255),
      allowNull: true
    });
  }
};
