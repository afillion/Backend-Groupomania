const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer-config');
const postsCtrl = require('../controllers/posts');

router.get('', auth, postsCtrl.getAll);
router.get('/:id', postsCtrl.getOne);
router.post('', auth, upload.single("images"), postsCtrl.new);
router.put('/:id', postsCtrl.modifOne);
router.delete('/:id', postsCtrl.deleteOne);
router.post('/:id/like', postsCtrl.like);

module.exports = router;
// Define routes for each path. See methods in controllers/