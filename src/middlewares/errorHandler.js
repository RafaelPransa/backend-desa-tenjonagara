const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('🔥 Global Server Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan internal pada server.';

  return sendError(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};

module.exports = errorHandler;
