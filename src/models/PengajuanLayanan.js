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
    tempat_lahir: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    jenis_kelamin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agama: {
      type: DataTypes.STRING(50),
      allowNull: true
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
