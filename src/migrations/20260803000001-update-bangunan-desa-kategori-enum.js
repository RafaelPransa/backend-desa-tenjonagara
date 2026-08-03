'use strict';

/**
 * Migration: Update enum_bangunan_desa_kategori
 *
 * OLD values: pemerintahan | pendidikan | kesehatan | keagamaan | ekonomi_sosial
 * NEW values: fasilitas_pendidikan | fasilitas_kesehatan | fasilitas_umum | fasilitas_ibadah | fasilitas_olahraga
 *
 * Strategy (PostgreSQL-safe):
 *  1. Add a temporary TEXT column
 *  2. Copy old values mapped to new values
 *  3. Drop old enum column
 *  4. Drop old enum type
 *  5. Create new enum type with new values
 *  6. Re-add column with new enum type
 *  7. Copy data back from temp column
 *  8. Drop temp column
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // 1. Add temp TEXT column
      await queryInterface.addColumn('bangunan_desa', 'kategori_temp', {
        type: Sequelize.TEXT,
        allowNull: true
      }, { transaction });

      // 2. Copy old -> new values into temp column
      await queryInterface.sequelize.query(`
        UPDATE bangunan_desa SET kategori_temp = CASE
          WHEN kategori = 'pendidikan'    THEN 'fasilitas_pendidikan'
          WHEN kategori = 'kesehatan'     THEN 'fasilitas_kesehatan'
          WHEN kategori = 'pemerintahan'  THEN 'fasilitas_umum'
          WHEN kategori = 'keagamaan'     THEN 'fasilitas_ibadah'
          WHEN kategori = 'ekonomi_sosial' THEN 'fasilitas_olahraga'
          ELSE 'fasilitas_umum'
        END
      `, { transaction });

      // 3. Drop old enum column
      await queryInterface.removeColumn('bangunan_desa', 'kategori', { transaction });

      // 4. Drop old enum type (PostgreSQL specific)
      await queryInterface.sequelize.query(
        `DROP TYPE IF EXISTS "enum_bangunan_desa_kategori";`,
        { transaction }
      );

      // 5. Create new enum type with new values
      await queryInterface.sequelize.query(`
        CREATE TYPE "enum_bangunan_desa_kategori" AS ENUM (
          'fasilitas_pendidikan',
          'fasilitas_kesehatan',
          'fasilitas_umum',
          'fasilitas_ibadah',
          'fasilitas_olahraga'
        );
      `, { transaction });

      // 6. Add the column back with the new enum type
      await queryInterface.sequelize.query(`
        ALTER TABLE "bangunan_desa"
        ADD COLUMN "kategori" "enum_bangunan_desa_kategori" NOT NULL DEFAULT 'fasilitas_umum';
      `, { transaction });

      // 7. Copy data back from temp to new column
      await queryInterface.sequelize.query(`
        UPDATE bangunan_desa SET kategori = kategori_temp::"enum_bangunan_desa_kategori"
        WHERE kategori_temp IS NOT NULL;
      `, { transaction });

      // 8. Drop temp column
      await queryInterface.removeColumn('bangunan_desa', 'kategori_temp', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Reverse: revert to old enum values
      await queryInterface.addColumn('bangunan_desa', 'kategori_temp', {
        type: Sequelize.TEXT,
        allowNull: true
      }, { transaction });

      await queryInterface.sequelize.query(`
        UPDATE bangunan_desa SET kategori_temp = CASE
          WHEN kategori = 'fasilitas_pendidikan' THEN 'pendidikan'
          WHEN kategori = 'fasilitas_kesehatan'  THEN 'kesehatan'
          WHEN kategori = 'fasilitas_umum'       THEN 'pemerintahan'
          WHEN kategori = 'fasilitas_ibadah'     THEN 'keagamaan'
          WHEN kategori = 'fasilitas_olahraga'   THEN 'ekonomi_sosial'
          ELSE 'pemerintahan'
        END
      `, { transaction });

      await queryInterface.removeColumn('bangunan_desa', 'kategori', { transaction });

      await queryInterface.sequelize.query(
        `DROP TYPE IF EXISTS "enum_bangunan_desa_kategori";`,
        { transaction }
      );

      await queryInterface.sequelize.query(`
        CREATE TYPE "enum_bangunan_desa_kategori" AS ENUM (
          'pemerintahan',
          'pendidikan',
          'kesehatan',
          'keagamaan',
          'ekonomi_sosial'
        );
      `, { transaction });

      await queryInterface.sequelize.query(`
        ALTER TABLE "bangunan_desa"
        ADD COLUMN "kategori" "enum_bangunan_desa_kategori" NOT NULL DEFAULT 'pemerintahan';
      `, { transaction });

      await queryInterface.sequelize.query(`
        UPDATE bangunan_desa SET kategori = kategori_temp::"enum_bangunan_desa_kategori"
        WHERE kategori_temp IS NOT NULL;
      `, { transaction });

      await queryInterface.removeColumn('bangunan_desa', 'kategori_temp', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
