const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const commentsCtrl = require('../controllers/comments');

router.get('',  commentsCtrl.getAll);
router.get('/:id',  commentsCtrl.getOne);
router.post('',  commentsCtrl.new);
router.put('/:id', commentsCtrl.modifOne);
router.delete('/:id', commentsCtrl.deleteOne);

module.exports = router;
// Define routes for each path. See methods in controllers/