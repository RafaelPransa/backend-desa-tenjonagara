'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pengajuan_layanan', 'tempat_lahir', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('pengajuan_layanan', 'tanggal_lahir', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
    await queryInterface.addColumn('pengajuan_layanan', 'jenis_kelamin', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
    await queryInterface.addColumn('pengajuan_layanan', 'alamat', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('pengajuan_layanan', 'agama', {
      type: Sequelize.STRING(50),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pengajuan_layanan', 'tempat_lahir');
    await queryInterface.removeColumn('pengajuan_layanan', 'tanggal_lahir');
    await queryInterface.removeColumn('pengajuan_layanan', 'jenis_kelamin');
    await queryInterface.removeColumn('pengajuan_layanan', 'alamat');
    await queryInterface.removeColumn('pengajuan_layanan', 'agama');
  }
};
