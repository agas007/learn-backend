const express = require('express');
const router = express.Router();
const pegawaiController = require('../controllers/pegawaiController');
const authMiddleware = require('../middlewares/auth');

router.get('/pegawai', authMiddleware, pegawaiController.getAllPegawai);
router.get('/pegawai/:id', pegawaiController.getPegawaiById);
router.post('/pegawai', pegawaiController.createPegawai);
router.put('/pegawai/:id', pegawaiController.updatePegawai);
router.patch('/pegawai/:id', pegawaiController.patchPegawai);
router.delete('/pegawai/:id', pegawaiController.deletePegawai);

module.exports = router;
