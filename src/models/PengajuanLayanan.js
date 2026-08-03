module.exports = (sequelize, DataTypes) => {
  const PengajuanLayanan = sequelize.define('PengajuanLayanan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    layanan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'layanan',
        key: 'id'
      }
    },
    nama_pemohon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nik: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dokumen_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'diproses', 'selesai'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'pengajuan_layanan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return PengajuanLayanan;
};
