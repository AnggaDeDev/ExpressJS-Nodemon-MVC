const express = require('express');
const router = express.Router();
const authController = require('../resources/controllers/auth_controller');
const upload = require('../middlewares/upload_middleware');
const authMiddleware = require('../middlewares/auth_middleware');
const validateRegister = require('../middlewares/register_validator_middleware');

router.post('/register', upload.none(), validateRegister, authController.register);
router.post('/login', upload.none(), authController.login);
router.get('/logout', authMiddleware, authController.logout);

module.exports = router;
