const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('name').isAlphanumeric('en-US', { ignore: ' ' }).withMessage('Nama hanya bisa huruf dan angka'),
  body('name').isLength({ min: 6, max: 255 }).withMessage('Nama min 6 max 255 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('email').isLength({ min: 7, max: 255 }).withMessage('Email min 7 max 255 karakter'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 karakter'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateRegister;
