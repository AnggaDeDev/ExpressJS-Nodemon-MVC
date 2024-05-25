const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoute = require('../routes/auth_routes');
const dashboardRoute = require('../routes/dashboard_routes');

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
app.use(cookieParser());
// Routes 
app.use('/api/tyasdwiangga', authRoute,dashboardRoute);

app.get('/get',(req,res)=>{
  res.json({'msg': 'err'})
})
/*
app.get('/dashboard/admin', authMiddleware, authorizeMiddleware, (req, res) => {
  res.json({ message: `Welcome to the admin area, ${req.user.name}!` });
});
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
