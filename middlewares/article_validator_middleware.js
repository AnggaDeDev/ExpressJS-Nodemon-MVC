const { body, validationResult } = require('express-validator');
const db = require('../resources/dbcons/dbcon_mysql2'); // Assuming db is your database connection setup

// Custom validation middleware
const validateArticle = [
  body('judul')
    .isLength({ min: 5, max: 100 })
    .withMessage('Judul harus memiliki panjang antara 5 hingga 100 karakter'),
    
  body('topik')
    .isLength({ min: 5, max: 50 })
    .withMessage('Topik harus memiliki panjang antara 5 hingga 50 karakter'),
  
  body('cuplikan')
    .isLength({ min: 5, max: 200 })
    .withMessage('Cuplikan harus memiliki panjang antara 5 hingga 200 karakter'),
  
  body('konten')
    .isLength({ min: 5 })
    .withMessage('Konten tidak boleh kosong'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => ({ field: err.param, message: err.msg })) });
    }
    next();
  }
];

module.exports = validateArticle;
