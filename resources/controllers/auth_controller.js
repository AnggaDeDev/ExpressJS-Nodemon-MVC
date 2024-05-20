
async function register(app,pool){
app.post('/register', upload.none(), async (req, res) => {
      try {
        const { username, password } = req.body;
        console.log('Request Body:', req.body); 
        if (!username || !password) {
          return res.status(400).send('Username and password are required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        pool.query(query, [username, hashedPassword], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error registering user');
          }
          res.status(201).send('User registered');
        });
      } catch (error) {
        console.error('Register Error:', error);
        res.status(500).send('Server error');
      }
    });
}

// Login route
async function login(app,bcrypt,pool){

// Handle login with multipart form data
app.post('/login', upload.none(), async (req, res) => {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          console.log('Missing username or password');
          return res.status(400).send('Username and password are required');
        }
        return res.status(400).send('Temporary debug message'); // Temporary debug message
    
        const query = 'SELECT * FROM users WHERE username = ?';
        pool.query(query, [username], async (err, results) => {
          console.log('Query executed');
          if (err) {
            console.error(err);
            return res.status(500).send('Error logging in');
          }
          if (results.length === 0) {
            return res.status(400).send('User not found');
          }
    
          const user = results[0];
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
          }
    
          const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
          res.status(200).json({ token });
        });
      } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('Server error');
      }
    });
      
}
module.exports = { register,login }