module.exports = (sequelize, DataTypes) => {
  const PesanKontak = sequelize.define('PesanKontak', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    subjek: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pesan: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'pesan_kontak',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return PesanKontak;
};
