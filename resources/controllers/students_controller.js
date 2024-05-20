const mahasiswaModel = require('../models/mahasiswa');

async function addMahasiswa(req, res) {
  const { nim, nama, prodi } = req.body;
  try {
    const success = await mahasiswaModel.insertMahasiswa(nim, nama, prodi);
    if (success) {
      res.status(201).json({ message: 'Mahasiswa added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add mahasiswa' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllMahasiswa(req, res) {
  try {
    const mahasiswa = await mahasiswaModel.getMahasiswa();
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function editMahasiswa(req, res) {
  const { nim, nama, prodi } = req.body;
  try {
    const success = await mahasiswaModel.updateMahasiswa(nim, nama, prodi);
    if (success) {
      res.status(200).json({ message: 'Mahasiswa updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update mahasiswa' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function removeMahasiswa(req, res) {
  const { nim } = req.params;
  try {
    const success = await mahasiswaModel.deleteMahasiswa(nim);
    if (success) {
      res.status(200).json({ message: 'Mahasiswa deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete mahasiswa' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Handle the file (e.g., store file information in the database)
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
}

module.exports = { addMahasiswa, getAllMahasiswa, editMahasiswa, removeMahasiswa, uploadFile };
