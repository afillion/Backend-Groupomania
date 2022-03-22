const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('', auth, usersCtrl.getAll);
router.get('/:id', auth, usersCtrl.getOne);
router.post('/test', auth);
router.delete('/:id', auth, usersCtrl.deleteOne);

module.exports = router;
// Define routes for each path. See methods in controllers/