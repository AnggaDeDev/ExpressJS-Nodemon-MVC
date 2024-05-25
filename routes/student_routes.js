const express = require('express');
const router = express.Router();
const articleController = require('../resources/controllers/article_controller');
// students-route 
app.post('/mahasiswa', upload.none(), studentsController.insertMahasiswa);
app.post('/mahasiswa/upload', upload.single('file'), studentsController.uploadFile);
app.get('/mahasiswa', studentsController.getMahasiswa);
app.put('/mahasiswa/:nim', upload.none(), studentsController.updateMahasiswa);
app.delete('/mahasiswa/:nim', studentsController.deleteMahasiswa);
