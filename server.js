const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');

// Data pegawai
const Pegawai = require('./models/pegawai');

app.use(express.json()); // Middleware buat baca JSON
app.use(cors()); // Middleware buat CORS

connectDB();

// Landing Page
app.get('/', (req, res) => {
  res.send('Selamat datang di Latihan Backend Agas!');
});


// GET semua pegawai
app.get('/pegawai', async (req, res) => {
  try {
    const pegawai = await Pegawai.find();
    res.json(pegawai);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET pegawai by ID
app.get('/pegawai/:id', async (req, res) => {
  try {
    const pegawai = await Pegawai.findById(req.params.id);
    if (!pegawai) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    res.json(pegawai);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST pegawai
app.post('/pegawai', async (req, res) => {
  try { 
    const { nama, email } = req.body;
      const newPegawai = new Pegawai({ nama, email });
      await newPegawai.save();
      res.status(201).json(newPegawai);
    } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// PUT pegawai
app.put('/pegawai/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const peg = await Pegawai.findById(id);
    
      if (!peg) return res.status(404).json({ message: "Pegawai tidak ditemukan" });
    
      peg.nama = req.body.nama;
      peg.email = req.body.email;
      res.json({ message: 'Pegawai berhasil diupdate', pegawai: peg });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// PATCH pegawai
app.patch('/pegawai/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const peg = await Pegawai.findById(id);
    
      if (!peg) return res.status(404).json({ message: "Pegawai tidak ditemukan" });
    
      peg.nama = req.body.nama || peg.nama;
      peg.email = req.body.email || peg.email;
      res.json({ message: 'Pegawai berhasil diupdate', pegawai: peg });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// DELETE pegawai
app.delete('/pegawai/:id', async (req, res) => {
  try {
    const peg = await Pegawai.findById(req.params.id);
    if (!peg) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });

    await peg.remove();

    res.json({ message: 'Pegawai berhasil dihapus', pegawai: peg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Console log untuk mengetahui bahwa server sudah berjalan
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});