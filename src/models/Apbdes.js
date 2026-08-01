module.exports = (sequelize, DataTypes) => {
  const Apbdes = sequelize.define('Apbdes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bidang: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pagu_anggaran: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    realisasi: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    }
  }, {
    tableName: 'apbdes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Apbdes;
};
