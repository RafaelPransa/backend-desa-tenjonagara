module.exports = (sequelize, DataTypes) => {
  const Layanan = sequelize.define('Layanan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_layanan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    syarat: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'layanan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Layanan;
};
