const express = require('express');
const router = express.Router();
const pegawaiController = require('../controllers/pegawaiController');

router.get('/pegawai', pegawaiController.getAllPegawai);
router.get('/pegawai/:id', pegawaiController.getPegawaiById);
router.post('/pegawai', pegawaiController.createPegawai);
router.put('/pegawai/:id', pegawaiController.updatePegawai);
router.patch('/pegawai/:id', pegawaiController.patchPegawai);
router.delete('/pegawai/:id', pegawaiController.deletePegawai);

module.exports = router;
