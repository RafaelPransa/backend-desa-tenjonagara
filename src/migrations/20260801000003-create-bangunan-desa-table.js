'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bangunan_desa', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      kategori: {
        type: Sequelize.ENUM('pemerintahan', 'pendidikan', 'kesehatan', 'keagamaan', 'ekonomi_sosial'),
        allowNull: false,
        defaultValue: 'pemerintahan'
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maps_embed_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gambar_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('bangunan_desa');
  }
};
