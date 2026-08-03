const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middlewares/auth');
const { sendSuccess, sendError } = require('../utils/response');

// Ensure destination folder exists
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `img-${uniqueSuffix}${ext}`);
  }
});

// File Filter for Images Only (admin upload)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowedTypes.test(file.mimetype);

  if (extValid && mimeValid) {
    return cb(null, true);
  }
  cb(new Error('Format file tidak didukung. Hanya file gambar (.jpg, .jpeg, .png, .webp, .gif) yang diperbolehkan!'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter
});

// File Filter for Public Documents (images + PDF) - for layanan pengajuan
const fileFilterPublic = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|pdf/;
  const extName = path.extname(file.originalname).toLowerCase();
  const extValid = allowedTypes.test(extName);
  const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  const mimeValid = mimeTypes.includes(file.mimetype);

  if (extValid && mimeValid) {
    return cb(null, true);
  }
  cb(new Error('Format tidak didukung. Hanya .jpg, .png, .webp, atau .pdf yang diperbolehkan.'));
};

const uploadPublic = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: fileFilterPublic
});

// Upload Single Image Endpoint
router.post('/', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
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

    const host = req.get('host');
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return sendSuccess(
      res,
      {
        url: fileUrl,
        filename: req.file.filename,
        size: req.file.size
      },
      'Gambar berhasil diunggah.',
      201
    );
  });
});

// Upload Public Document (no auth required) – for layanan pengajuan
router.post('/public', (req, res, next) => {
  uploadPublic.single('dokumen')(req, res, (err) => {
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

    const host = req.get('host');
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return sendSuccess(
      res,
      {
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      },
      'Dokumen berhasil diunggah.',
      201
    );
  });
});

module.exports = router;
