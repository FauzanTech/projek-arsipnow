const express = require('express');
const router = express.Router();
const { uploadSurat, getSurat, getAll, updateSurat, deleteSurat } = require('../controllers/smController');
const upload = require('../middlewares/upload');

router.post('/', upload.single('file'), uploadSurat);

router.get('/', getAll);
router.get('/:id', getSurat);

router.put('/update/:id', upload.single('file'), updateSurat);

router.delete('/:id', deleteSurat);

module.exports = router;