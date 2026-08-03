module.exports = (sequelize, DataTypes) => {
  const BangunanDesa = sequelize.define('BangunanDesa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    kategori: {
      type: DataTypes.ENUM('fasilitas_pendidikan', 'fasilitas_kesehatan', 'fasilitas_umum', 'fasilitas_ibadah', 'fasilitas_olahraga'),
      allowNull: false,
      defaultValue: 'fasilitas_umum'
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maps_embed_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gambar_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'bangunan_desa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return BangunanDesa;
};
