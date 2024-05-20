const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const mahasiswaController = require('../resources/controllers/students_controller.js');

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


app.use(express.static(path.join(__dirname, '../public')));


// students-route
app.post('/mahasiswa', upload.none(), mahasiswaController.addMahasiswa);
app.post('/mahasiswa/upload', upload.single('file'), mahasiswaController.uploadFile);
app.get('/mahasiswa', mahasiswaController.getAllMahasiswa);
app.put('/mahasiswa', upload.none(), mahasiswaController.editMahasiswa);
app.delete('/mahasiswa/:nim', mahasiswaController.removeMahasiswa);


fs.watch("servers", (event_type, file_name) => {
  console.log("Deleting Require cache for " + file_name);
  delete require.cache[require.resolve("servers/" + file_name)];
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
