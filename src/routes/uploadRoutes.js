const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const { authenticateToken } = require('../middlewares/auth');
const { sendSuccess, sendError } = require('../utils/response');

// ─────────────────────────────────────────────────────────
// Cloudinary Setup
// ─────────────────────────────────────────────────────────
const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey    = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();

const isCloudinaryConfigured = !!((cloudName && apiKey && apiSecret) || cloudinaryUrl);

let cloudinary = null;
if (isCloudinaryConfigured) {
  cloudinary = require('cloudinary').v2;
  if (cloudinaryUrl) {
    // Otomatis konfigurasi dari CLOUDINARY_URL
    cloudinary.config();
  } else {
    cloudinary.config({
      cloud_name: cloudName,
      api_key:    apiKey,
      api_secret: apiSecret,
      secure:     true
    });
  }
  console.log('☁️  Upload mode: Cloudinary active');
} else {
  console.log('💾 Upload mode: Disk lokal (fallback)');
}

// ─────────────────────────────────────────────────────────
// Rate Limiter
// ─────────────────────────────────────────────────────────
const publicUploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan unggah file. Silakan coba kembali dalam 15 menit.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// ─────────────────────────────────────────────────────────
// Local Disk Storage (Fallback)
// ─────────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `img-${uniqueSuffix}${ext}`);
  }
});

const memoryStorage = multer.memoryStorage();

// ─────────────────────────────────────────────────────────
// File Filters
// ─────────────────────────────────────────────────────────
const fileFilterImage = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowedTypes.test(file.mimetype);
  if (extValid && mimeValid) return cb(null, true);
  cb(new Error('Format file tidak didukung. Hanya file gambar (.jpg, .jpeg, .png, .webp, .gif) yang diperbolehkan!'));
};

const fileFilterPublic = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|pdf/;
  const extName = path.extname(file.originalname).toLowerCase();
  const extValid = allowedTypes.test(extName);
  const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  const mimeValid = mimeTypes.includes(file.mimetype);
  if (extValid && mimeValid) return cb(null, true);
  cb(new Error('Format tidak didukung. Hanya .jpg, .png, .webp, atau .pdf yang diperbolehkan.'));
};

const uploadImage = multer({
  storage: isCloudinaryConfigured ? memoryStorage : diskStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilterImage
});

const uploadPublic = multer({
  storage: isCloudinaryConfigured ? memoryStorage : diskStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilterPublic
});

// Helper: Upload buffer stream ke Cloudinary
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

// ─────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────

// POST /api/upload — Upload gambar (Admin only)
router.post('/', authenticateToken, (req, res, next) => {
  uploadImage.single('image')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return sendError(res, 'Ukuran gambar terlalu besar! Maksimal 5MB.', 400);
        }
        return sendError(res, `Upload error: ${err.message}`, 400);
      }
      return sendError(res, err.message, 400);
    }

    if (!req.file) {
      return sendError(res, 'Silakan pilih file gambar untuk diunggah.', 400);
    }

    try {
      if (isCloudinaryConfigured) {
        const result = await uploadBufferToCloudinary(req.file.buffer, {
          folder: 'desa-tenjonagara/images',
          resource_type: 'auto'
        });

        return sendSuccess(res, {
          url: result.secure_url,
          public_id: result.public_id,
          filename: result.public_id,
          size: result.bytes
        }, 'Gambar berhasil diunggah ke Cloudinary.', 201);
      }

      // Mode Disk Lokal
      const host = req.get('host');
      const protocol = req.protocol;
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      return sendSuccess(res, {
        url: fileUrl,
        filename: req.file.filename,
        size: req.file.size
      }, 'Gambar berhasil diunggah.', 201);

    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return sendError(res, 'Gagal mengunggah gambar ke cloud storage. Silakan coba lagi.', 500);
    }
  });
});

// POST /api/upload/public — Upload dokumen publik
router.post('/public', publicUploadLimiter, (req, res, next) => {
  uploadPublic.single('dokumen')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return sendError(res, 'Ukuran file terlalu besar! Maksimal 5MB.', 400);
        }
        return sendError(res, `Upload error: ${err.message}`, 400);
      }
      return sendError(res, err.message, 400);
    }

    if (!req.file) {
      return sendError(res, 'Silakan pilih file untuk diunggah.', 400);
    }

    try {
      if (isCloudinaryConfigured) {
        const isPdf = req.file.mimetype === 'application/pdf';
        const result = await uploadBufferToCloudinary(req.file.buffer, {
          folder: 'desa-tenjonagara/dokumen',
          resource_type: isPdf ? 'raw' : 'auto'
        });

        return sendSuccess(res, {
          url: result.secure_url,
          public_id: result.public_id,
          filename: result.public_id,
          originalname: req.file.originalname,
          size: result.bytes,
          mimetype: req.file.mimetype
        }, 'Dokumen berhasil diunggah ke Cloudinary.', 201);
      }

      // Mode Disk Lokal
      const host = req.get('host');
      const protocol = req.protocol;
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      return sendSuccess(res, {
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }, 'Dokumen berhasil diunggah.', 201);

    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return sendError(res, 'Gagal mengunggah dokumen ke cloud storage. Silakan coba lagi.', 500);
    }
  });
});

module.exports = router;
