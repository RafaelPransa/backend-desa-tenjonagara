module.exports = (sequelize, DataTypes) => {
  const ProfilDesa = sequelize.define('ProfilDesa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sejarah: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    visi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    misi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    luas_wilayah: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jumlah_dusun: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    jumlah_rt: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    jumlah_rw: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'profil_desa',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at'
  });

  return ProfilDesa;
};
