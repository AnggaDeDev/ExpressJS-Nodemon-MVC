const express = require('express');
const router = express.Router();
const articleController = require('../resources/controllers/article_controller');
const studentsController = require('../resources/controllers/student_controller');
const articleValidator = require('../middlewares/article_validator_middleware');
const authMiddleware = require('../middlewares/auth_middleware');
const authorizeMiddleware = require('../middlewares/authorize_middleware');
const upload = require('../middlewares/upload_middleware');

router.get('/artikel', articleController.getAllArticles);
router.get('/artikel/:id', articleController.getArticleById);
router.post('/artikel',       upload.none(), authMiddleware, articleValidator, articleController.createArticle);
router.put('/artikel/:id',    upload.none(), authMiddleware, articleValidator, articleController.updateArticle);
router.delete('/artikel/:id', authMiddleware, articleController.deleteArticle);
articleValidator, 
router.get('/mahasiswa',         authMiddleware, authorizeMiddleware, studentsController.getMahasiswa);
router.post('/mahasiswa/upload', authMiddleware, authorizeMiddleware, upload.single('file'), studentsController.uploadFile);
router.post('/mahasiswa',        authMiddleware, authorizeMiddleware, upload.none(), studentsController.insertMahasiswa);
router.put('/mahasiswa/:id',     authMiddleware, authorizeMiddleware, upload.none(), studentsController.updateMahasiswa);
router.delete('/mahasiswa/:id',  authMiddleware, authorizeMiddleware, studentsController.deleteMahasiswa);


module.exports = router;
