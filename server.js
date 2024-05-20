const express = require('express');
const app = express();
const port = 7500;
const path = require('path');

app.use(express.static(path.join(__dirname, './public')));

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hey, folks!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
