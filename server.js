const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const errorHandler = require('./middlewares/errorHandler');

// Import Models
const Pegawai = require('./models/pegawai');

// Import Routes
const pegawaiRoutes = require('./routes/pegawaiRoutes');
const authRoutes = require('./routes/authRoutes');

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

// Routing
app.use('/api/v1', pegawaiRoutes);
app.use('/api/v1', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Console log untuk mengetahui bahwa server sudah berjalan
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});