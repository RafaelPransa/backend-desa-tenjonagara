const { Sequelize } = require('sequelize');
const config = require('./sequelize.config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Database connected successfully via Sequelize.');
  } catch (error) {
    console.error('⚠️ Database connection failure:', error.message);
    console.log('ℹ️ Server running in decoupled mode. Ensure PostgreSQL is active on credentials specified in .env.');
  }
};

module.exports = { sequelize, connectDB };
