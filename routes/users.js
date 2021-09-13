const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('', usersCtrl.getAll);
router.get('/:id', usersCtrl.getOne);

module.exports = router;
// Define routes for each path. See methods in controllers/