const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const commentsCtrl = require('../controllers/comments');

router.get('',  auth, commentsCtrl.getAll);
router.get('/:id',  auth, commentsCtrl.getOne);
router.post('',  auth, commentsCtrl.new);
router.put('/:id', auth, commentsCtrl.modifOne);
router.delete('/:id', auth, commentsCtrl.deleteOne);

module.exports = router;
// Define routes for each path. See methods in controllers/