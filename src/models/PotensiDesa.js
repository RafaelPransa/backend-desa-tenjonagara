module.exports = (sequelize, DataTypes) => {
  const PotensiDesa = sequelize.define('PotensiDesa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    kategori: {
      type: DataTypes.ENUM('pertanian', 'umkm', 'wisata'),
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gambar_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'potensi_desa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return PotensiDesa;
};
