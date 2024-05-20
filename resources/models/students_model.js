const db = require('../db');

async function insertMahasiswa(nim, nama, prodi) {
  try {
    const result = await db('mahasiswa').insert({ nim, nama, prodi });
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error inserting mahasiswa:', error);
    throw error;
  }
}

async function getMahasiswa() {
  try {
    const rows = await db('mahasiswa').select('*');
    return rows;
  } catch (error) {
    console.error('Error fetching mahasiswa:', error);
    throw error;
  }
}

async function updateMahasiswa(nim, nama, prodi) {
  try {
    const result = await db('mahasiswa')
      .where({ nim })
      .update({ nama, prodi });
    return result > 0;
  } catch (error) {
    console.error('Error updating mahasiswa:', error);
    throw error;
  }
}

async function deleteMahasiswa(nim) {
  try {
    const result = await db('mahasiswa')
      .where({ nim })
      .del();
    return result > 0;
  } catch (error) {
    console.error('Error deleting mahasiswa:', error);
    throw error;
  }
}

module.exports = { insertMahasiswa, getMahasiswa, updateMahasiswa, deleteMahasiswa };
