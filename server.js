const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');

app.use(express.json()); // Middleware buat baca JSON
app.use(cors()); // Middleware buat CORS

connectDB();

// Landing Page
app.get('/', (req, res) => {
  res.send('Selamat datang di Latihan Backend Agas!');
});

// Data pegawai
const pegawai = [
    { id: 1, nama: 'Agas', email: 'agas@example.com' },
    { id: 2, nama: 'Budi', email: 'budi@example.com' },
];

// GET semua pegawai
app.get('/pegawai', (req, res) => {
  res.json(pegawai);
});

// GET pegawai by ID
app.get('/pegawai/:id', (req, res) => {
  const peg = pegawai.find(p => p.id === parseInt(req.params.id));
  if (!peg) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });
  res.json(peg);
});

// POST pegawai
app.post('/pegawai', (req, res) => {
    const { nama, email } = req.body;
    const newPegawai = { id: pegawai.length + 1, nama, email };
  
    // ✅ Cek apakah nama dan email ada
    if (!nama || !email) {
        return res.status(400).json({ error: "Nama dan email wajib diisi!" });
    }

    pegawai.push(newPegawai);
    res.status(201).json(newPegawai);
  });

// PUT pegawai
app.put('/pegawai/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const peg = pegawai.find(p => p.id === id);
  
    if (!peg) return res.status(404).json({ message: "Pegawai tidak ditemukan" });

    // ✅ Cek apakah nama dan email ada
    if (!nama || !email) {
        return res.status(400).json({ error: "Nama dan email wajib diisi!" });
    }
  
    peg.nama = req.body.nama;
    peg.email = req.body.email;
    res.json({ message: 'Pegawai berhasil diupdate', pegawai: peg });
  });

// PATCH pegawai
app.patch('/pegawai/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const peg = pegawai.find(p => p.id === id);
  
    if (!peg) return res.status(404).json({ message: "Pegawai tidak ditemukan" });

    // ✅ Cek apakah nama dan email ada
    if (!nama || !email) {
        return res.status(400).json({ error: "Nama dan email wajib diisi!" });
    }
  
    peg.nama = req.body.nama || peg.nama;
    peg.email = req.body.email || peg.email;
    res.json({ message: 'Pegawai berhasil diupdate', pegawai: peg });
  });

// DELETE pegawai
app.delete('/pegawai/:id', (req, res) => {
  const peg = pegawai.find(p => p.id === parseInt(req.params.id));
  if (!peg) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });

  const index = pegawai.indexOf(peg);
  pegawai.splice(index, 1);

  res.json({ message: 'Pegawai berhasil dihapus', pegawai: peg });
});

// Console log untuk mengetahui bahwa server sudah berjalan
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
