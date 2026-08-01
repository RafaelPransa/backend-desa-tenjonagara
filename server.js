require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server Backend Desa Tenjonagara running on http://localhost:${PORT}`);
    console.log(`📡 Health check URL: http://localhost:${PORT}/api/health`);
  });
};

startServer();
