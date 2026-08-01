module.exports = (sequelize, DataTypes) => {
  const StatistikPenduduk = sequelize.define('StatistikPenduduk', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jumlah_total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jumlah_laki: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jumlah_perempuan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jumlah_kk: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'statistik_penduduk',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return StatistikPenduduk;
};
