const db = require('../dbcons/dbcon_mysql2');
const { body, validationResult } = require('express-validator');

const createArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { judul, topik, cuplikan, konten } = req.body;
    await db('artikel').insert({ judul, topik, cuplikan, konten });
    res.status(201).json({ message: 'Artikel berhasil dibuat' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat membuat artikel', error });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await db('artikel').select('*');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil artikel', error });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await db('artikel').where({ id }).first();
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil artikel', error });
  }
};

const updateArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  // const { judul, topik, cuplikan, konten } = req.body;
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const result = await db('artikel').where({ id }).update(updatedFields);
    if (result) {
      res.status(200).json({ message: 'Artikel berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui artikel', error });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db('artikel').where({ id }).del();
    if (result) {
      res.status(200).json({ message: 'Artikel berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus artikel', error });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
