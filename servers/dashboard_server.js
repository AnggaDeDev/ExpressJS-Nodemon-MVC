const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mahasiswaController = require('../resources/controllers/students_controller.js');

const app = express();
// supports all of content-types :
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/*+json' }));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../../public/uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// students-route
app.post('/mahasiswa', upload.none(), mahasiswaController.addMahasiswa);
app.post('/mahasiswa/upload', upload.single('file'), mahasiswaController.uploadFile);
app.get('/mahasiswa', mahasiswaController.getAllMahasiswa);
app.put('/mahasiswa', upload.none(), mahasiswaController.editMahasiswa);
app.delete('/mahasiswa/:nim', mahasiswaController.removeMahasiswa);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
