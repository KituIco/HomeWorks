var express = require('express');
var router = express.Router();
var upload = require('multer')();

var {uploadFile, uploadFiles} = require('../controllers/upload-controller.js');

const errorHandler = require('../middlewares/error-handler.js');

router.post('', upload.single('image'), [uploadFile, errorHandler]);
router.post('/multiple', upload.array('images', 4), [uploadFiles, errorHandler]);

module.exports = router;