
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbcons/dbcon_mysql2');

const JWT_SECRET = 'undira';

async function register (req, res){
 const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db('users').insert({
      name,
      email,
      password: hashedPassword,
    });

    const user = await db('users').where({ name }).first();
    const token = jwt.sign({ id: user.id, name: user.name, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: false }); // Set 'secure: true' in production
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

async function login(req, res){
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const user = await db('users').where({ name }).first();
      if (!user) {
        return res.status(401).json({ error: 'Nama tidak ditemukan' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: 'Password salah' });
      }
  
      const token = jwt.sign({ id: user.id, name: user.name, roles: user.role }, JWT_SECRET, { expiresIn: '1h' });
  
      res.cookie('token', token, { httpOnly: true, secure: false }); // Set 'secure: true' in production
      res.json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in user' });
    }
}

async function logout(req,res){
    try {
        /*
        const token = req.cookies.token;
        await db('tokens').where({ token }).del();
        */
       console.log(req.cookies.token);
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
      } catch (error) {
        res.status(500).json({ error: 'Error logging out' });
      }
}

module.exports = {register, login, logout};