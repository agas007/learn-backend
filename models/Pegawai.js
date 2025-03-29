const mongoose = require('mongoose');

const pegawaiSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Pegawai = mongoose.model('Pegawai', pegawaiSchema);
module.exports = Pegawai;
