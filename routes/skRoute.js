const express = require('express');
const router = express.Router();
const { uploadSurat, getSurat, getAll, updateSurat, deleteSurat, cariSurat } = require('../controllers/skController');
const upload = require('../middlewares/upload');

router.post('/', upload.single('file'), uploadSurat);

router.get('/', getAll);
router.get('/:id', getSurat);
router.get('/search/surat', cariSurat);

router.put('/:id', upload.single('file'), updateSurat);

router.delete('/:id', deleteSurat);

module.exports = router;