const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');


// Import routes
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const profilRoutes = require('./routes/profilRoutes');
const beritaRoutes = require('./routes/beritaRoutes');
const potensiRoutes = require('./routes/potensiRoutes');
const layananRoutes = require('./routes/layananRoutes');
const statistikRoutes = require('./routes/statistikRoutes');
const kontakRoutes = require('./routes/kontakRoutes');
const perangkatRoutes = require('./routes/perangkatRoutes');
const bangunanRoutes = require('./routes/bangunanRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const sitemapRoutes = require('./routes/sitemapRoutes');

const app = express();

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// CORS configuration
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: [allowedOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Route Mounting
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profil-desa', profilRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/potensi-desa', potensiRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/statistik', statistikRoutes);
app.use('/api/kontak', kontakRoutes);
app.use('/api/perangkat-desa', perangkatRoutes);
app.use('/api/bangunan-desa', bangunanRoutes);
app.use('/api/upload', uploadRoutes);

// Sitemap
app.use('/', sitemapRoutes);
app.use('/api', sitemapRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} tidak ditemukan.`
  });
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
