// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
},
filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
}
});

const upload = multer({storage: storage});

module.exports = upload;