const express = require('express');
const router = express.Router();
const { uploadSurat, getSurat, getAll, updateSurat, deleteSurat, cariSurat } = require('../controllers/skController');
const upload = require('../middlewares/upload');
const verifyToken = require('../middlewares/jwt_auth');

router.post('/', verifyToken, upload.single('file'), uploadSurat);

router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getSurat);
router.get('/search/surat', verifyToken, cariSurat);

router.put('/:id', verifyToken, upload.single('file'), updateSurat);

router.delete('/:id', verifyToken, deleteSurat);

module.exports = router;