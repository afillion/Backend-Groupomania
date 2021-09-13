const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postsCtrl = require('../controllers/posts');

router.get('', auth, postsCtrl.getAll);
router.get('/:id', auth, postsCtrl.getOne);
router.post('', auth, postsCtrl.new);
router.put('/:id', postsCtrl.modifOne);
router.delete('/:id', postsCtrl.deleteOne);
router.post('/:id/like', postsCtrl.like);

module.exports = router;
// Define routes for each path. See methods in controllers/