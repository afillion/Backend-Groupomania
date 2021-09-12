const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postsCtrl = require('../controllers/posts');

router.get('', postsCtrl.getAll);
router.post('', postsCtrl.new);
// router.get('/:id', auth, sauceCtrl.getOne);
// router.post('', auth, multer, sauceCtrl.new);
// router.put('/:id', auth, multer, sauceCtrl.modifOne);
// router.delete('/:id', auth, sauceCtrl.delOne);
// router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;
// Define routes for each path. See methods in controllers/