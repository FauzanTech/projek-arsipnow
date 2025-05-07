const express = require('express');
const router = express.Router();
const { updateUser, addUser, deleteUser, getAll, getUser } = require('../controllers/userController');

router.patch('/update/:id', updateUser);

router.post('/add/', addUser);

router.delete('/delete/:id', deleteUser);

router.get('/', getAll);
router.get('/:id', getUser);

module.exports = router;