module.exports = (sequelize, DataTypes) => {
  const Berita = sequelize.define('Berita', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    konten: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gambar_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    penulis_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      defaultValue: 'published'
    }
  }, {
    tableName: 'berita',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Berita;
};
