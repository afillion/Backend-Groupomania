const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const { route } = require('./posts');

// router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('', usersCtrl.getAll);

module.exports = router;
// Define routes for each path. See methods in controllers/