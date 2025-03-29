const Pegawai = require('../models/pegawai');

// GET semua pegawai
exports.getAllPegawai = async (req, res) => {
  try {
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const pegawai = await Pegawai.find().sort({ nama: sortOrder });
    res.json(pegawai);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET pegawai by ID
exports.getPegawaiById = async (req, res) => {
  try {
    const pegawai = await Pegawai.findById(req.params.id);
    if (!pegawai) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });
    res.json(pegawai);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST pegawai
exports.createPegawai = async (req, res) => {
  try {
    const { nama, email } = req.body;
    const newPegawai = new Pegawai({ nama, email });
    await newPegawai.save();
    res.status(201).json(newPegawai);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT pegawai
exports.updatePegawai = async (req, res) => {
  try {
    const peg = await Pegawai.findById(req.params.id);
    if (!peg) return res.status(404).json({ message: "Pegawai tidak ditemukan" });

    peg.nama = req.body.nama;
    peg.email = req.body.email;
    await peg.save();

    res.json({ message: 'Pegawai berhasil diupdate', pegawai: peg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH pegawai
exports.patchPegawai = async (req, res) => {
  try {
    const peg = await Pegawai.findById(req.params.id);
    if (!peg) return res.status(404).json({ message: "Pegawai tidak ditemukan" });

    peg.nama = req.body.nama || peg.nama;
    peg.email = req.body.email || peg.email;
    await peg.save();

    res.json({ message: 'Pegawai berhasil diupdate', pegawai: peg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE pegawai
exports.deletePegawai = async (req, res) => {
  try {
    const peg = await Pegawai.findById(req.params.id);
    if (!peg) return res.status(404).json({ message: 'Pegawai tidak ditemukan' });

    await peg.deleteOne();

    res.json({ message: 'Pegawai berhasil dihapus', pegawai: peg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
