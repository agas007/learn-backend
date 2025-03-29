const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

// Data pegawai
const Pegawai = require('./models/pegawai');

// Routes Pegawai
const pegawaiRoutes = require('./routes/pegawaiRoutes');

app.use(express.json()); // Middleware buat baca JSON
app.use(cors()); // Middleware buat CORS
app.use(logger);

// Custom token untuk timestamp dengan timezone WIB
morgan.token('timestamp', () => moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss Z'));

// Logging to file
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('[:timestamp] :method :url :status :res[content-length] - :response-time ms', { stream: logStream }));

// Connect to MongoDB
connectDB();

// Landing Page
app.get('/', (req, res) => {
  res.send('Selamat datang di Latihan Backend Agas!');
});

// Pake routing pegawai
app.use('/api/v1', pegawaiRoutes);

// Console log untuk mengetahui bahwa server sudah berjalan
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});