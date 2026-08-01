module.exports = (sequelize, DataTypes) => {
  const PerangkatDesa = sequelize.define('PerangkatDesa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    foto_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    urutan: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'perangkat_desa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return PerangkatDesa;
};
