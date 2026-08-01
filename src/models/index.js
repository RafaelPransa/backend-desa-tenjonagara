const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const ProfilDesa = require('./ProfilDesa')(sequelize, DataTypes);
const Berita = require('./Berita')(sequelize, DataTypes);
const PotensiDesa = require('./PotensiDesa')(sequelize, DataTypes);
const Layanan = require('./Layanan')(sequelize, DataTypes);
const PengajuanLayanan = require('./PengajuanLayanan')(sequelize, DataTypes);
const StatistikPenduduk = require('./StatistikPenduduk')(sequelize, DataTypes);
const Apbdes = require('./Apbdes')(sequelize, DataTypes);
const PesanKontak = require('./PesanKontak')(sequelize, DataTypes);
const PerangkatDesa = require('./PerangkatDesa')(sequelize, DataTypes);

// Relationships / Associations
User.hasMany(Berita, { foreignKey: 'penulis_id', as: 'berita' });
Berita.belongsTo(User, { foreignKey: 'penulis_id', as: 'penulis' });

Layanan.hasMany(PengajuanLayanan, { foreignKey: 'layanan_id', as: 'pengajuan' });
PengajuanLayanan.belongsTo(Layanan, { foreignKey: 'layanan_id', as: 'layanan' });

const db = {
  sequelize,
  User,
  ProfilDesa,
  Berita,
  PotensiDesa,
  Layanan,
  PengajuanLayanan,
  StatistikPenduduk,
  Apbdes,
  PesanKontak,
  PerangkatDesa
};

module.exports = db;
