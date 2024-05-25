const db = require('../dbcons/dbcon_mysql2');
const { body, validationResult } = require('express-validator');


async function insertMahasiswa(req, res) {
  const errors = validationResult(req.body);
  res.status(400).json(req.body);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { nim, nama, prodi } = req.body;
    const result = await db('mahasiswa').insert({ nim, nama, prodi });
    console.log('Insert result:', result); 
    if (result.length > 0) {
      res.status(201).json({ message: 'Mahasiswa added successfully', data: result });
    } else {
      res.status(400).json({ message: 'Failed to add mahasiswa' });
    }
  } catch (error) {
    console.error('Error inserting mahasiswa:', error);
    throw error;
  }
}

async function getMahasiswa(req,res) {
  try {
    const rows = await db('mahasiswa').select('*');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching mahasiswa:', error);
    throw error;
  }
}

async function findMahasiswaByNim(nim) {
  try {
    const mahasiswa = await db('mahasiswa').where({ nim }).first();
    return mahasiswa;
  } catch (error) {
    console.error('Error finding mahasiswa by NIM:', error);
    throw error;
  }
};


async function updateMahasiswa(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
    const nim = req.params.nim;
    const { nama, prodi } = req.body;
    const mahasiswa = await findMahasiswaByNim(nim);
    if (!mahasiswa) {
      return { message: 'Data tidak ditemukan' };
    }

    const result = await db('mahasiswa')
      .where({ nim })
      .update({ nama, prodi });
    console.log('Update result:', result); // Log the result to debug
    if (result > 0) {
      res.status(200).json({ message: 'Mahasiswa updated successfully', data: result });
    } else {
      res.status(400).json({ message: 'Failed to update mahasiswa' });
    }
  } catch (error) {
    console.error('Error updating mahasiswa:', error);
    throw error;
  }
}

async function deleteMahasiswa(req, res) {
  try {
    const { nim } = req.params;
    const mahasiswa = await findMahasiswaByNim(nim);
    if (!mahasiswa) {
      return { message: 'Data tidak ditemukan' };
    }
    const result = await db('mahasiswa')
      .where({ nim })
      .del();
    console.log('Delete result:', result); 
    if (result > 0) {
      res.status(200).json({ message: 'Mahasiswa deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete mahasiswa' });
    }
  } catch (error) {
    console.error('Error deleting mahasiswa:', error);
    throw error;
  }
}

async function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Handle the file (e.g., store file information in the database)
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
}

module.exports = { insertMahasiswa, getMahasiswa, findMahasiswaByNim ,updateMahasiswa, deleteMahasiswa, uploadFile };
